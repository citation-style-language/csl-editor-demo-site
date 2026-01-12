# Deployment Guide

This document describes how to build and deploy the CSL Editor demo site.

## Architecture

The demo site consists of two main components:

1. **csl-editor** - Core library (git submodule at `cslEditorLib/`)
2. **csl-editor-demo-site** - Demo web application (Jekyll static site)

## Prerequisites

### Required
- **Node.js** 18+ (for building csl-editor library)
- **Ruby** & **Jekyll** (for building demo site)
- **Git** (for cloning and managing repos)
- **Bash** (for deployment scripts - Git Bash on Windows)

### Optional
- **Java** (for converting CSL schema with Trang)

## Development Workflow

### 1. Initial Setup

```bash
# Clone the demo site repo with submodules
git clone --recursive https://github.com/citation-style-editor/csl-editor-demo-site.git
cd csl-editor-demo-site

# Install csl-editor library dependencies
cd cslEditorLib
npm install
cd ..
```

### 2. Development Server

For local development, you only need Jekyll:

```bash
# Start Jekyll development server
jekyll serve --watch

# Site will be available at:
# http://localhost:5001
```

The `--watch` flag automatically rebuilds when files change.

**Note:** During development, you can edit files in `cslEditorLib/` directly. The site uses the source files, not built bundles.

### 3. Working on the Core Library

If you're making changes to the core library:

```bash
cd cslEditorLib

# Make your changes...

# Build the library (optional during development)
npm run build

# Run unit tests
# Visit http://localhost:5001/cslEditorLib/pages/unitTests.html
```

## Production Deployment

### Overview

Production deployment involves:
1. Building the csl-editor library with optimizations
2. Generating style index and citation examples
3. Building the Jekyll site
4. Deploying to GitHub Pages (docs/ directory)

### Manual Deployment Steps

#### 1. Prepare csl-editor Library

```bash
cd cslEditorLib

# Update CSL styles repository
git submodule update --recursive --remote

# Generate style index
npm run build:styles

# Generate example citations (for Search by Example)
npm run build:citations

# Optional: Generate legacy citations for older browsers
npm run build:legacy-citations

# Build optimized library
npm run build

cd ..
```

#### 2. Build and Deploy Site

```bash
# Use the deployment script
./deploy.sh
```

This script:
- Runs RequireJS optimizer to bundle JavaScript (legacy compatibility)
- Copies citeproc.js separately (r.js breaks it otherwise)
- Replaces `$GIT_COMMIT` with actual commit hash in HTML
- Runs Jekyll build
- Copies output to `docs/` directory
- Commits and pushes changes

### Automated Deployment Script (Coming Soon)

We're working on a modernized deployment script that:
- Uses Vite for bundling (instead of RequireJS)
- Streamlines the build process
- Adds validation steps
- Provides better error reporting

## Cache Busting

When updating styles or changing code, increment the cache version:

```javascript
// In cslEditorLib/src/options.js
CSLEDIT_options.setDefaults({
    cacheVersion: "X.Y.Z"  // Increment this
});
```

This forces browsers to download fresh data instead of using cached versions.

## GitHub Pages Deployment

The site is deployed to GitHub Pages using the `docs/` directory method:

1. Repository Settings → Pages → Source: `main` branch, `/docs` folder
2. Custom domain: `editor.citationstyles.org` (configured in CNAME file)
3. HTTPS is enforced

After running `deploy.sh`, the changes are automatically live at:
- **Production:** https://editor.citationstyles.org
- **Unit Tests:** https://editor.citationstyles.org/cslEditorLib/pages/unitTests.html

## Staging/Beta Testing

For testing major changes before production deployment:

1. **Fork the repository**
   ```bash
   # On GitHub: fork citation-style-editor/csl-editor-demo-site
   git clone https://github.com/YOUR-USERNAME/csl-editor-demo-site.git
   ```

2. **Enable GitHub Pages on your fork**
   - Settings → Pages → Enable from `main` branch `/docs` folder

3. **Deploy to staging**
   ```bash
   # Make your changes...
   ./deploy.sh
   ```

4. **Test at staging URL**
   - Your fork will be at: `https://YOUR-USERNAME.github.io/csl-editor-demo-site/`

5. **Submit pull request when ready**

## Troubleshooting

### "Cannot find module" errors
```bash
cd cslEditorLib
npm install
```

### Styles not updating
```bash
cd cslEditorLib
git submodule update --recursive --remote
npm run build:styles
```
Then increment cache version in `options.js`.

### Jekyll build fails
```bash
# Check Ruby/Jekyll versions
ruby --version
jekyll --version

# Reinstall Jekyll dependencies
bundle install
```

### Citeproc errors
```bash
# Update to latest citeproc
cd cslEditorLib
npm run update:citeproc
```

## Quick Reference

| Task | Command |
|------|---------|
| Local development | `jekyll serve --watch` |
| Build library | `cd cslEditorLib && npm run build` |
| Update styles | `cd cslEditorLib && git submodule update --remote && npm run build:styles` |
| Generate citations | `cd cslEditorLib && npm run build:citations` |
| Deploy to production | `./deploy.sh` |
| Run unit tests | Visit `/cslEditorLib/pages/unitTests.html` |

## Known Issues

See [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for current limitations and workarounds.

## Performance Considerations

- **Large Chicago styles** (>150KB) may cause Visual Editor to freeze
  - Use Code Editor for these styles
  - See [VISUAL_EDITOR_PERFORMANCE.md](../csl-editor/VISUAL_EDITOR_PERFORMANCE.md) for planned improvements

- **Citation generation** for all 2,800+ styles takes ~2.5 minutes
  - Only needed when updating example citations
  - Pre-generated file is committed to repo

## Version History

- **v2.0** - Modernization (ES6, Vite, performance improvements)
- **v1.0** - Original RequireJS-based version
