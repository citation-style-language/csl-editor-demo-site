<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>CSL Search by Example</title>

	<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.18/themes/ui-lightness/jquery-ui.css">
	<link rel="stylesheet" href="../cslEditorLib/css/base.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" href="../cslEditorLib/css/searchByExample.css?bust=$GIT_COMMIT" />
	<link rel="stylesheet" href="../cslEditorLib/css/searchResults.css?bust=$GIT_COMMIT" />

	<script type="text/javascript" src="../cslEditorLib/external/require-jquery.js"></script>
	<script>
		require.config({
			baseUrl: "../cslEditorLib",
			urlArgs : "bust=$GIT_COMMIT"
		});
		requirejs(['src/config'], function (config) {
			require(['../src/searchByExamplePage'], function () {});
		});
	</script>
	<script type="text/javascript" src="../src/analytics.js"></script>
	
</head>
<body id="searchByExample">
<?php include '../html/navigation.html'; ?>
<div id="mainContainer">
</div>
</body>
</html>
