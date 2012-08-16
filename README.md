# Reference implementation of the cslEdit library for searching and editing .csl (Citation Style Language) files

This web application allows users of CSL based reference managers to search for citation styles and edit them. It's still an alpha version, but the Visual Editor supports all the features of independent CSL styles (AFAIK) and it should be possible to do real work with it.

It is an implementation of the [CSL editor library](https://github.com/citation-style-editor/csl-editor).

Play with it here: [Citation Style Editor](http://steveridout.com/csl/)

## Deployment Instructions

### Prerequisites

- LAMP stack

- Node.js 0.8.4 or later

- Java runtime (optional - for running trang to convert the CSL schema)

- Mail server (for sending feedback emails)

- Python 2.6.5 or 2.7

### To Setup Development Version

- Run `git clone https://github.com/citation-style-editor/csl-editor-demo-site.git csl-source` to checkout repo into the directory `csl-source` within your `public\_html` (or equivalent) directory

- Run `git submodule update --init --recursive` from checked out directory to fetch submodules

- Run configure.sh (optional - only if you want to re-generate the example citations, or change the CSL schema in external/csl-styles)

- Point your browser to `$BASE_URL/csl-source/cslEditorLib/unitTests/` to run the unit tests

- Point your browser to `$BASE_URL/csl-source/` to view the site

### To Deploy

- Follow above steps for Development version (but if you want to deploy directly to `public_html` you'll have to checkout to a `csl-source/` somewhere else, since the deploy directory will be erased by the deploy script)

- Within `csl-source/` create the file feedbackEmail.txt within containing a single email address that you want the feedback widget to send to

- Run `./deploy.sh $DEPLOY_PATH`, where `$DEPLOY_PATH` is the path you wish to deploy to. **All current contents of `$DEPLOY_PATH` will be removed!**

- Point your browser to `$BASE_URL/cslEditorLib/unitTests/` to run the unit tests

- Point your browser to `$BASE_URL/` to view the deployed site

