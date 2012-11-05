<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>CSL Code Editor</title>

	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/codemirror.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.22/themes/ui-lightness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/css/base.css?bust=$GIT_COMMIT" />
	<style type="text/css">
		#codeEditorContainer {
			position: absolute;

			top: 40px;
			bottom: 0px;
			left: 0px;
			right: 0px;

			background: #eeeeee;
		}
	</style>

	<script type="text/javascript" src="../cslEditorLib/external/require-jquery.js"></script>
	<script>
		require.config({
			baseUrl: "../cslEditorLib",
			urlArgs : "bust=$GIT_COMMIT"
		});
		requirejs(['src/config'], function (config) {
			require(['src/codeEditor'], function () {
				require(['../src/codeEditorPage'], function () {});
			});
		});
	</script>
	<script type="text/javascript" src="../src/analytics.js"></script>
</head>
<body id="codeEditor">

<?php include '../html/navigation.html'; ?>

<div id="codeEditorContainer">
</div>

</body>
</html>
