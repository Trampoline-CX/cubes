#!/bin/bash
set -o pipefail

MATERIAL_ICONS_VERSION="3.0.1"
OUTPUT_DIR="./src/assets/icons"
INDEX_FILE="$OUTPUT_DIR/index.ts"

# Clean icons directory
rm -rf $OUTPUT_DIR

# Unzip all Material Icons ending with "_24px.svg" to temp directory
unzip -jo assets/icons/material-design-icons-$MATERIAL_ICONS_VERSION.zip "material-design-icons-$MATERIAL_ICONS_VERSION/**/svg/production/*_24px.svg" -d $OUTPUT_DIR

# Remove "ic_" prefix and "_24px" suffix from file names.
for f in $(find $OUTPUT_DIR -name '*.svg'); do
    : $(basename $f) # Keep filename in temporary variable $_
    : ${_%_24px.svg} # Remove suffix
    : "${_#ic_}.svg" # Remove prefix
    : "${_//_/-}" # Replace dashes with hyphens
    mv -- "$f" "$OUTPUT_DIR/$_" 
done

# Create SVG map
echo "export const iconsMap = {" >> $INDEX_FILE
for f in $(find $OUTPUT_DIR -name '*.svg'); do
    : $(basename $f) # Create temporary variable "$_" with file name only
    echo "  '${_%.svg}': require('./$_')," >> $INDEX_FILE
done
echo "}" >> $INDEX_FILE

# Prettify
yarn prettier --write "$OUTPUT_DIR/*.ts"
