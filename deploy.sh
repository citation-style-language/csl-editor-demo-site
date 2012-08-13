#!/bin/bash

# Use the requirejs optimizer r.js to optimise js files

# By default it will create a sibling build directory called 'csl'
# or it uses a command line argument if present

# TODO: check that configure.sh has been run

if [ "$1" == "" ]
then
	BUILD_DIR="../csl"
else
	BUILD_DIR="$1"
fi

echo "deploying to build dir $BUILD_DIR"

rm -rf "$BUILD_DIR"
node csledit/external/r.js -o build.js dir=$BUILD_DIR

GIT_COMMIT=$(git rev-parse HEAD)

echo "git commit is $GIT_COMMIT"

# Replace $GIT_COMMIT with the git commit hash in all php files
cd $BUILD_DIR

find */index.php | while read FILENAME;
do
echo "converting $FILENAME"
sed s/\$GIT_COMMIT/$GIT_COMMIT/g <$FILENAME >temp.php
mv temp.php $FILENAME
done

# Create error.log file
echo "CSL edit error log" > error.log
echo "------------------" >> error.log
echo "" >> error.log
chmod o+w error.log
