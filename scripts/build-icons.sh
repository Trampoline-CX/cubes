#!/bin/bash
set -o pipefail

MATERIAL_ICONS_VERSION="3.0.1"
TEMP_DIR="assets/icons/temp"
RN_OUTPUT_DIR="./src/components/images-and-icons/__generated__"

# Clean icons directory
rm -rf $TEMP_DIR
rm -rf $RN_OUTPUT_DIR

# Unzip all Material Icons ending with "_24px.svg" to temp directory
unzip -jo assets/icons/material-design-icons-$MATERIAL_ICONS_VERSION.zip "material-design-icons-$MATERIAL_ICONS_VERSION/**/svg/production/*_24px.svg" -d $TEMP_DIR

# Remove "ic_" prefix and "_24px" suffix from file names.
for f in $(find $TEMP_DIR -name '*.svg'); do
    : ${f%_24px.svg} # Create temporary variable "$_" with removed suffix
    mv -- "$f" "${_/\/ic_/\/}.svg" # Remove prefix
done

# Convert SVG files to React Native SVG
yarn svgr --out-dir $RN_OUTPUT_DIR $TEMP_DIR --ext tsx

# Clean icons directory
rm -rf $TEMP_DIR
