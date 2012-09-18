<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	header("HTTP/1.0 405 Method Not Allowed");
	die();
}

// write to error log on server
$success = error_log("CSL Editor Client Error: " . $_REQUEST['message']);
if ($success == TRUE) {
        echo "success";
} else {
        echo "fail";
}
?>
