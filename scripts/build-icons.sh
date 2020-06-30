#!/bin/bash
set -o pipefail

# -----
# Script extracting all Production SVG icons from a Material Design Icons zip 
# and renaming them correctly for usage in Cubes.
#
# Renaming consists of:
# - Removing "ic_" prefix
# - Removing "_24px" suffix
# - Replacing snake_case with kebab-case
#
# This script also emits an `index.ts` file with an `iconsMap`, mapping 
# Icon names with their `require()` path.
# -----

MATERIAL_ICONS_VERSION="3.0.1"
OUTPUT_DIR="./src/assets/icons"
INDEX_FILE="$OUTPUT_DIR/index.ts"
OUTPUT_DIST_DIR="./dist/assets/icons"

# Clean icons directory
rm -rf $OUTPUT_DIR
rm -rf $OUTPUT_DIST_DIR

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

# Copy to dist/
mkdir -p $OUTPUT_DIST_DIR
cp $OUTPUT_DIR/*.svg $OUTPUT_DIST_DIR
