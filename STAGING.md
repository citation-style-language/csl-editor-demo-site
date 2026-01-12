# Staging Environment Setup

This guide explains how to set up a staging/beta environment for testing changes before deploying to production.

## Why Use Staging?

- Test major changes with real traffic before production deployment
- Allow users to preview and test new features
- Verify deployment process works correctly
- Catch issues that don't appear in local development

## Option 1: GitHub Pages Fork (Recommended)

### Setup Steps

1. **Fork the repository on GitHub**
   - Go to https://github.com/citation-style-editor/csl-editor-demo-site
   - Click "Fork" button (top right)
   - This creates: `https://github.com/YOUR-USERNAME/csl-editor-demo-site`

2. **Clone your fork locally**
   ```bash
   git clone --recursive https://github.com/YOUR-USERNAME/csl-editor-demo-site.git staging
   cd staging
   ```

3. **Add upstream remote (to sync with main repo)**
   ```bash
   git remote add upstream https://github.com/citation-style-editor/csl-editor-demo-site.git
   ```

4. **Enable GitHub Pages on your fork**
   - Go to Settings → Pages (in your forked repo)
   - Source: Deploy from a branch
   - Branch: `main` (or `integrate-modernized-library`)
   - Folder: `/docs`
   - Click "Save"

5. **Your staging site will be available at:**
   - `https://YOUR-USERNAME.github.io/csl-editor-demo-site/`

### Deployment Workflow

```bash
# 1. Sync with upstream (optional - if you want latest changes)
git fetch upstream
git merge upstream/main

# 2. Make your changes...

# 3. Build and deploy to staging
cd cslEditorLib
npm run build:styles
npm run build:citations
npm run build
cd ..
./deploy.sh

# 4. Test at your GitHub Pages URL
# Visit: https://YOUR-USERNAME.github.io/csl-editor-demo-site/

# 5. When ready, submit PR to main repo
git push origin main
# Then create PR on GitHub
```

### Custom Domain (Optional)

If you want a custom staging URL:

1. **Buy a domain** (e.g., `staging.yourdomain.com`)

2. **Configure DNS:**
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`

3. **Update CNAME file:**
   ```bash
   echo "staging.yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom staging domain"
   ```

4. **Enable in GitHub Pages settings**
   - Settings → Pages → Custom domain: `staging.yourdomain.com`

## Option 2: Separate Branch Method

Use a separate branch in your fork for staging versions:

```bash
# Create staging branch
git checkout -b staging

# Make changes, commit, push
git push origin staging

# Enable GitHub Pages from 'staging' branch
# (Settings → Pages → Branch: staging, Folder: /docs)
```

**Advantages:**
- Keep experimental changes isolated
- Can have multiple staging branches (beta, alpha, etc.)

**Disadvantages:**
- Need to manage multiple branches
- Can get out of sync with main

## Option 3: Netlify/Vercel Deploy

For more control, use a dedicated hosting service:

### Netlify (Free tier available)

1. **Sign up at** https://netlify.com
2. **Connect your GitHub fork**
3. **Build settings:**
   - Build command: `cd cslEditorLib && npm run build && cd .. && jekyll build`
   - Publish directory: `_site`
4. **Deploy!**

Netlify will give you a URL like `random-name-123.netlify.app` (can customize).

### Vercel (Free tier available)

Similar to Netlify:

1. **Sign up at** https://vercel.com
2. **Import your fork**
3. **Configure build**
4. **Deploy!**

**Advantages of Netlify/Vercel:**
- Automatic deploys on git push
- Preview deployments for PRs
- Better build logs and error handling
- Custom domains easier
- Can run build scripts more easily

**Disadvantages:**
- Another service to manage
- Free tier limits (usually sufficient)

## Testing Checklist

Before deploying staging → production:

### Functionality Tests
- [ ] All pages load without errors
- [ ] Search by Name works
- [ ] Search by Example works
- [ ] Visual Editor loads
- [ ] Code Editor loads
- [ ] Style info pages work
- [ ] Edit function works (including large styles warning)
- [ ] Install/download styles works

### Performance Tests
- [ ] Page load times acceptable
- [ ] Citation generation works
- [ ] No console errors
- [ ] Mobile responsive

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Data Tests
- [ ] CSL styles up to date
- [ ] Example citations correct
- [ ] Locales loading properly

## Promoting Staging to Production

Once testing is complete:

1. **Create PR from your fork:**
   - Go to main repo: https://github.com/citation-style-editor/csl-editor-demo-site
   - Click "New Pull Request"
   - Compare across forks: `base:main` ← `YOUR-USERNAME:main`
   - Describe changes thoroughly

2. **Code review process:**
   - Wait for maintainer review
   - Address any feedback
   - Tests should pass

3. **Merge to production:**
   - Maintainer will merge PR
   - Production site automatically updates

## Environment Comparison

| Aspect | Local Dev | Staging | Production |
|--------|-----------|---------|------------|
| URL | localhost:5001 | yourusername.github.io/... | editor.citationstyles.org |
| Update method | Manual refresh | ./deploy.sh + push | Merge PR |
| Build | Jekyll only | Full build | Full build |
| Purpose | Development | Testing | Live users |
| Data | Can be stale | Should be current | Always current |

## Keeping Staging in Sync

Regularly sync your fork with upstream:

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main

# Also update staging branch if using separate branch method
git checkout staging
git merge main

# Push to your fork
git push origin main
git push origin staging
```

## Troubleshooting

### Staging site not updating
- Check GitHub Pages settings (enabled, correct branch/folder)
- Wait 1-2 minutes after push (GitHub Pages has delay)
- Check commit includes docs/ directory changes
- Verify deploy.sh ran successfully

### 404 errors on staging
- Ensure `/docs` folder exists and has content
- Check CNAME file (might need to remove it for GitHub Pages subdomain)
- Verify GitHub Pages is enabled

### Build failures
- Check build logs in Actions tab (if using GitHub Actions)
- Verify Jekyll installed: `jekyll --version`
- Check Node.js version: `node --version` (need 18+)
- Run build locally first to debug

### Differences between local and staging
- Check cache version (should be incremented)
- Verify all files were committed and pushed
- Check browser console for errors
- Clear browser cache and hard refresh (Ctrl+Shift+R)

## Advanced: Automated Staging

Create `.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy to Staging
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Build library
        run: |
          cd cslEditorLib
          npm install
          npm run build:styles
          npm run build:citations
          npm run build

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0

      - name: Install Jekyll
        run: gem install jekyll

      - name: Deploy
        run: ./deploy.sh

      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git push
```

This automatically builds and deploys whenever you push to main.

## Beta User Access

To let users test staging:

1. **Announce staging URL:**
   - In GitHub discussions
   - On project website
   - To specific beta testers

2. **Gather feedback:**
   - Create GitHub issue template for beta feedback
   - Monitor console errors
   - Track usage analytics (if added)

3. **Iterate quickly:**
   - Fix bugs found in testing
   - Deploy new version to staging
   - Retest

4. **Graduate to production** when stable

## Summary

**Quick Setup:**
1. Fork repo on GitHub
2. Enable Pages: Settings → Pages → main branch → /docs folder
3. Clone fork locally
4. Make changes, run `./deploy.sh`, push
5. Test at `https://YOUR-USERNAME.github.io/csl-editor-demo-site/`
6. Submit PR when ready

**This workflow allows safe testing of major updates before impacting production users.**
