({
	baseUrl: "cslEditorLib",
	mainConfigFile: "cslEditorLib/src/config.js",
	optimize: "none",

	appDir: ".",
	dir: "../csl",

	fileExclusionRegExp: /^\.git$/,

	paths: {
		'jquery': 'empty:',
		'jquery.ui': 'empty:',
		'jquery.layout' : 'empty:',
		'external/citeproc/citeproc': 'empty:'
	},
	
	modules: [
		{
			name: 'src/VisualEditor'
		},
		{
			name: 'src/SearchByExample'
		},
		{
			name: 'src/SearchByName'
		},
		{
			name: 'src/CodeEditor'
		}
	]
})
