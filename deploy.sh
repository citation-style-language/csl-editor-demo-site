#!/bin/bash
set -e  # Exit on any error

echo ""
echo "=== Deploying to ./docs directory ==="
echo ""

# Get git commit hash for cache busting
GIT_COMMIT=$(git rev-parse HEAD)
echo "Git commit: $GIT_COMMIT"

# Run Jekyll to build site
echo "Running Jekyll build..."
jekyll build

# Replace $GIT_COMMIT in the BUILT files (in _site), not the source
echo "Replacing \$GIT_COMMIT with actual commit hash in built files..."
find _site -name "*.html" -type f | while read file; do
  sed -i.bak "s/\$GIT_COMMIT/$GIT_COMMIT/g" "$file" && rm "$file.bak"
done

# Clean docs directory
echo "Cleaning docs directory..."
rm -rf ./docs/*
mkdir -p ./docs

# Copy only the necessary directories/files from _site to docs
echo "Copying built site to docs..."
# Add .nojekyll to prevent GitHub Pages from running Jekyll processing
touch ./docs/.nojekyll
cp -r _site/cslEditorLib ./docs/

# Copy directories excluded from Jekyll (too many files for Jekyll to process)
echo "Copying style/locale data (excluded from Jekyll for speed)..."
mkdir -p ./docs/cslEditorLib/external
cp -r cslEditorLib/external/csl-styles ./docs/cslEditorLib/external/
cp -r cslEditorLib/external/locales ./docs/cslEditorLib/external/
cp -r cslEditorLib/external/csl-schema ./docs/cslEditorLib/external/
cp -r cslEditorLib/external/jstree ./docs/cslEditorLib/external/
cp -r _site/about ./docs/
cp -r _site/codeEditor ./docs/
cp -r _site/cslDataExporter ./docs/
cp -r _site/external ./docs/
cp -r _site/home ./docs/
cp -r _site/html ./docs/
cp -r _site/images ./docs/
cp -r _site/searchByExample ./docs/
cp -r _site/searchByName ./docs/
cp -r _site/settings ./docs/
cp -r _site/src ./docs/
cp -r _site/styleInfo ./docs/
cp -r _site/visualEditor ./docs/
cp _site/index.html ./docs/
cp _site/CNAME ./docs/ 2>/dev/null || true
cp _site/MIT-LICENCE.txt ./docs/ 2>/dev/null || true
cp _site/*.html ./docs/ 2>/dev/null || true

# Remove node_modules if accidentally copied
rm -rf ./docs/cslEditorLib/node_modules 2>/dev/null

echo ""
echo "=== Build complete! ==="
echo ""
echo "Review changes with: git status"
echo "To commit and push: git add --all && git commit -m 'deploy' && git push"
echo ""
