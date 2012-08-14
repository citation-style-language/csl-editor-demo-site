<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 

	<title>CSL-data-exporter style generator</title>

	<script type="text/javascript" src="../csledit/external/require.js"></script>
	<script>
		require.config({
			baseUrl: "../csledit",
			urlArgs : "bust=21bc39ccdd543fe59756d70e2bda5f7618b896a5"
		});
		requirejs(['src/config'], function (config) {
			require(['jquery'], function () {
				require(['../cslDataExporter/generateCsl'], function () {});
			});
		});
	</script>
</head>
<body>
</body>
</html>
