#!/bin/bash

# Use the requirejs optimizer r.js to optimise js files

# By default it will create a sibling build directory called 'csl'
# or it uses a command line argument if present

if [ "$1" == "" ]
then
	BUILD_DIR="../csl-build"
else
	BUILD_DIR="$1"
fi

echo "deploying to build dir $BUILD_DIR"

rm -rf "$BUILD_DIR"
node cslEditorLib/external/r.js -o build.js dir=$BUILD_DIR

# doing this becuase the cjsTranslate r.js option breaks citeproc.js
ORIGINAL_CITEPROC=$(find cslEditorLib/external/citeproc/citeproc*.js)
BUILD_CITEPROC=$(find $BUILD_DIR/cslEditorLib/external/citeproc/citeproc*.js)
echo "copying $ORIGINAL_CITEPROC to $BUILD_CITEPROC"
cp $ORIGINAL_CITEPROC $BUILD_CITEPROC

# Replace $GIT_COMMIT with the git commit hash in all php files
GIT_COMMIT=$(git rev-parse HEAD)

echo "git commit is $GIT_COMMIT"

cd $BUILD_DIR

find cslEditorLib/pages/*.html >> find */index.html > filesToConvert

while read FILENAME;
do
echo "converting $FILENAME"
sed s/\$GIT_COMMIT/$GIT_COMMIT/g <$FILENAME >tempFile
mv tempFile $FILENAME
done < filesToConvert
rm filesToConvert

# Remove any *.php files in external libraries
find external -name "*.php" -type f -print0 | xargs -0 rm -f
find cslEditorLib/external -name "*.php" -type f -print0 | xargs -0 rm -f

# Run Jekyll
jekyll

