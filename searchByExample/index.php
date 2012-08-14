<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>CSL Search by Example</title>

	<script type="text/javascript" src="../cslEditorLib/external/require.js"></script>
	<script>
		require.config({
			baseUrl: "../cslEditorLib",
			urlArgs : "bust=21bc39ccdd543fe59756d70e2bda5f7618b896a5"
		});
		requirejs(['src/config'], function (config) {
			require(['../src/searchByExamplePage'], function () {});
		});
	</script>
	<script type="text/javascript" src="../src/analytics.js"></script>
	
	<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.8.18/themes/ui-lightness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="../cslEditorLib/external/cleditor/jquery.cleditor.css">

	<link rel="stylesheet" href="../cslEditorLib/css/base.css?bust=21bc39ccdd543fe59756d70e2bda5f7618b896a5" />
	<link rel="stylesheet" href="../cslEditorLib/css/searchByExample.css?bust=21bc39ccdd543fe59756d70e2bda5f7618b896a5" />
	<link rel="stylesheet" href="../cslEditorLib/css/searchResults.css?bust=21bc39ccdd543fe59756d70e2bda5f7618b896a5" />

</head>
<body id="searchByExample">
<?php include '../html/navigation.html'; ?>
<div id="mainContainer">
</div>
</body>
</html>
