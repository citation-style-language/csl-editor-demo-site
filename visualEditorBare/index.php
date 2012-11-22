<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>Visual CSL Editor</title>

	<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.22/themes/ui-lightness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/external/jstree/themes/default/style.css" />

	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/base.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/dropdown.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/visualEditor.css?bust=$GIT_COMMIT" />

	<style>
		#visualEditorContainer {
			position: absolute;
			top: 0px;;
			bottom: 0px;
			left: 0px;
			right: 0px;
		}
	</style>

	<script type="text/javascript" src="../cslEditorLib/external/require-jquery.js"></script>
	<script>
		require.config({
			baseUrl: "../cslEditorLib",
			urlArgs : "bust=$GIT_COMMIT"
		});
		requirejs(['src/config'], function (config) {
			require(['src/VisualEditor'], function (CSLEDIT_VisualEditor) {
				var cslEditor = new CSLEDIT_VisualEditor('#visualEditorContainer',	
					{
						loadCSLName : "Load Style Not Implemented",
						loadCSLFunc : function () {
							// your load function here
							alert("Not implemented");
						},
						saveCSLName : 'Save Style Not Implemented',
						saveCSLFunc : function () {
							// your save function here
							alert("Not implemented");
						}
					});
			});
		});
	</script>
</head>
<body id="visualEditor">
<div id="visualEditorContainer">
</div>
</body>
</html>
