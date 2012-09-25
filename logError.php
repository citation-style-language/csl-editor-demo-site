<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	header("HTTP/1.0 405 Method Not Allowed");
	die();
}

$message = $_REQUEST['message'];

// Restrict message length
// Note: log_errors_max_len in php.ini can also restrict log length
$MAX_LOG_LEN = 4000;
if (strlen($message) > $MAX_LOG_LEN) {
	$message = substr($message, 0, $MAX_LOG_LEN);
}

// write to error log on server
$success = error_log("CSL Editor Client Error: " . $message);
if ($success == TRUE) {
        echo "success";
} else {
        echo "fail";
}
?>
