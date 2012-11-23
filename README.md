# Reference implementation of the cslEdit library for searching and editing .csl (Citation Style Language) files

This web application allows users of CSL based reference managers to search for citation styles and edit them. It's still an alpha version, but the Visual Editor supports all the features of independent CSL styles (AFAIK) and it should be possible to do real work with it.

It is an implementation of the [CSL editor library](https://github.com/citation-style-editor/csl-editor).

Play with it here: [Citation Style Editor](http://steveridout.com/csl/)

## Prerequisites

- bash (on Windows, I recommend git bash included with [msysgit](http://code.google.com/p/msysgit/downloads/list))
- git
- [Jekyll](https://github.com/mojombo/jekyll/wiki/install)
- Node.js 0.8.4 or later
- Java runtime (optional - for running trang to convert the CSL schema)
- Mail server (for sending feedback emails)

## To Setup Development Version

- Run `git clone --recursive https://github.com/citation-style-editor/csl-editor-demo-site.git csl-demo` to checkout the repo.

- In the repo directory, run `jekyll --server --auto`.

- Point your browser to `localhost:5000` to view the site locally.

- Point your browser to `localhost:5000/cslEditorLib/pages/unitTests.html` to run the unit tests

## To Deploy

This process creates a version of the site to with concatenated javascript files and cache busters on the URLs, and optionally pushes the built version to the `gh-pages` branch, which is currently served by github pages using the domain `csleditor.steveridout.com`.

- Follow above steps for Development version (but if you want to deploy directly to `public_html` you'll have to checkout to a `csl-demo/` somewhere else, since the deploy directory will be erased by the deploy script)

- Run `./deploy.sh $DEPLOY_PATH`, where `$DEPLOY_PATH` is the path you wish to deploy to, if you don't specify it defaults to `../csl`. **All current contents of** `$DEPLOY_PATH` **will be removed!**

- Point your browser to `$BASE_URL/cslEditorLib/pages/unitTests.html` to run the unit tests

- Point your browser to `$BASE_URL/` to view the deployed site

## Customising the editor to integrate with your website or application

Create a fork of this `csl-editor-demo-site` repository and feel free to alter everything for your own needs _except_ for the core library within the `cslEditorLib` git submodule.

Customisable features include:

- Load/Save functions, see `src/visualEditorPage.js`
- Navigation bar and feedback widget, see `html/navigation.html`

You can override these without touching `cslEditorLib`.

## Customising the core library

See documentation for the core library code and it's API at the [CSLEditorLib wiki](https://github.com/citation-style-editor/csl-editor/wiki).

If you fix bugs or otherwise improve the core [cslEditorLib](https://github.com/citation-style-editor/csl-editor) library, ensure the changes are not specific to your implementation and please issue a [pull request](https://github.com/citation-style-editor/csl-editor/pulls) so that everyone can benefit. Thanks!

