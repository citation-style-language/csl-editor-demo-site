<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>Visual CSL Editor</title>

	<script type="text/javascript" src="../cslEditorLib/external/require.js"></script>

	<script>
		require.config({
			baseUrl: "../cslEditorLib",
			urlArgs : "bust=$GIT_COMMIT"
		});
		requirejs(['src/config'], function (config) {
			require(['../src/visualEditorPage'], function () {});
		});
	</script>

	<script type="text/javascript" src="../src/analytics.js"></script>

	<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.22/themes/ui-lightness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/external/jstree/themes/default/style.css" />

	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/base.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/dropdown.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/visualEditor.css?bust=$GIT_COMMIT" />

	<style>
		#visualEditorContainer {
			position: absolute;
			top: 40px;
			bottom: 0px;
			left: 0px;
			right: 0px;
		}
	</style>
</head>
<body id="visualEditor">
<?php include '../html/navigation.html'; ?>
<div id="visualEditorContainer">
</div>
</body>
</html>
