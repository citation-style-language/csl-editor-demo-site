# Demo Site Integration Notes

## Branch: `integrate-modernized-library`

This branch integrates the modernized CSL Editor library (from `modernization-planning` branch) with the demo site.

## What's Been Done

### 1. Updated Library Submodule
- Pointed `cslEditorLib/` to the `modernization-planning` branch
- Built the modernized library:
  - Generated style index (~10,000 styles)
  - Built ES module and UMD builds with Vite

### 2. Created Compatibility Layer
**File:** `cslEditorLib/src/cslStyles.shim.js`

This AMD/RequireJS module wraps the new ES module version of cslStyles, providing:
- Backward-compatible API that existing code expects
- Automatic initialization of the modern library
- Promise-based ready() method for waiting on initialization
- Fallback behavior if called before initialization completes

### 3. Updated RequireJS Configuration
**File:** `cslEditorLib/src/config.js`

Added path mapping:
```javascript
'src/cslStyles' : 'src/cslStyles.shim'
```

This redirects all `require('src/cslStyles')` calls to use the compatibility shim.

## Architecture

### How It Works

```
Demo Site Page (RequireJS/AMD)
  ↓
require('src/cslStyles')
  ↓
config.js redirects to → src/cslStyles.shim
  ↓
Shim loads → dist/csl-editor.umd.js (modern library)
  ↓
Exposes AMD-compatible API
  ↓
Existing code works unchanged!
```

### Key Components

1. **Old Code**: Visual Editor, Code Editor, etc. (unchanged)
2. **RequireJS**: Still used for module loading (unchanged)
3. **Shim**: New compatibility layer
4. **Modern Library**: New ES module build loaded via UMD
5. **Generated Data**: Individual style JSON files + index

## Testing

### Quick Test

1. Start a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```

2. Open test page:
   ```
   http://localhost:8000/test-integration.html
   ```

3. Check for:
   - ✓ RequireJS config loaded
   - ✓ cslStyles module loaded
   - ✓ Modern library initialized
   - Total styles: 10391
   - Found X styles matching "APA"
   - Loaded APA XML
   - === ALL TESTS PASSED ===

### Full Visual Editor Test

1. Build Jekyll site (or test directly):
   ```bash
   jekyll serve
   ```

2. Navigate to Visual Editor:
   ```
   http://localhost:4000/visualEditor/
   ```

3. Verify:
   - [ ] Page loads without errors
   - [ ] Can search for styles
   - [ ] Can load a style
   - [ ] Tree editor works
   - [ ] Code editor works
   - [ ] Can edit and save

## What Changed vs. What Didn't

### Changed ✨
- **Library internals**: ES modules, Vite build, IndexedDB caching
- **Style loading**: On-demand instead of monolithic JSON
- **Data structure**: Individual files instead of huge JSON
- **Memory usage**: ~500MB build instead of 12GB

### Unchanged 🎯
- **Demo site pages**: Same HTML/JS
- **RequireJS**: Still used
- **API surface**: Same function names and signatures
- **User experience**: Should be identical (but faster!)

## Potential Issues & Solutions

### Issue: "CSL Editor not yet initialized"

**Cause:** Code trying to use cslStyles before the modern library loads

**Solution:** The shim provides fallback values until initialized. For critical operations, use:
```javascript
require(['src/cslStyles'], function(cslStyles) {
  cslStyles.ready.then(function() {
    // Now guaranteed to be initialized
    var styles = cslStyles.getAllStyleIds();
  });
});
```

### Issue: CORS errors

**Cause:** Loading from file:// protocol

**Solution:** Always use a web server (Python, http-server, Jekyll, etc.)

### Issue: Style loading seems slow

**Expected:** First load fetches from network. Subsequent loads use IndexedDB cache (<10ms).

### Issue: RequireJS can't find cslStyles.shim

**Cause:** Typo in config.js or shim file not created

**Solution:** Verify:
- `cslEditorLib/src/cslStyles.shim.js` exists
- `cslEditorLib/src/config.js` has the path mapping
- No typos in filenames

## Next Steps

1. **Test integration page** - Verify shim works
2. **Test Visual Editor** - Full functionality check
3. **Test other pages**:
   - Code Editor
   - Search by Name
   - Search by Example
   - Style Info
4. **Fix any issues** found during testing
5. **Document changes** for end users
6. **Deploy** to staging/production

## Files Modified

### In csl-editor-demo-site:
- `cslEditorLib/` (submodule updated to modernization-planning)
- `cslEditorLib/src/config.js` (added path mapping)
- `cslEditorLib/src/cslStyles.shim.js` (NEW - compatibility layer)
- `test-integration.html` (NEW - test page)

### In cslEditorLib (submodule):
- All changes from modernization-planning branch
- Built files in `dist/` and `generated/`

## Performance Expectations

### Before (v1.x)
- **Build**: 10+ minutes, 12GB RAM
- **Initial load**: 12MB of JSON
- **Style search**: Fast (all in memory)
- **Style load**: Instant (all pre-loaded)

### After (v2.0)
- **Build**: ~5 minutes, ~500MB RAM
- **Initial load**: ~50KB index
- **Style search**: Instant (index in memory)
- **Style load**:
  - First time: ~50-100ms (fetch + cache)
  - Cached: <10ms (IndexedDB)

## Rollback Plan

If integration fails:

1. Reset submodule:
   ```bash
   cd cslEditorLib
   git checkout v1.0.2
   ```

2. Revert config.js:
   ```bash
   git checkout HEAD -- cslEditorLib/src/config.js
   ```

3. Delete shim:
   ```bash
   rm cslEditorLib/src/cslStyles.shim.js
   ```

4. Rebuild old library:
   ```bash
   cd cslEditorLib
   ./configure.sh
   ```

## Success Criteria

✅ All existing demo site pages work
✅ No console errors
✅ Styles load and display correctly
✅ Search functionality works
✅ Visual/Code editors functional
✅ Performance is same or better
✅ First load < 2 seconds
✅ Cached loads instant

## Notes

- The shim is a temporary bridge - eventually we could fully modernize the demo site
- For now, this provides the benefits of modernization with minimal risk
- All old code remains functional
- Can incrementally improve pages later
