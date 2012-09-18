<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	header("HTTP/1.0 405 Method Not Allowed");
	die();
}

if (!file_exists('feedbackEmail.txt')) {
	echo "No recipient email address. Feedback not sent.";
	die();
}

$toEmail = file_get_contents('feedbackEmail.txt');
$subject = $_REQUEST['subject'];
$message = $_REQUEST['message'];
$fromEmail = $_REQUEST['email'];

if ($fromEmail == "" || filter_var($fromEmail, FILTER_VALIDATE_EMAIL) == TRUE) {
	mail($toEmail, $subject, $message, "From:" . $fromEmail);
	echo "Thanks for your feedback!";
}
else {
	echo 'Invalid Email Address';
}

?>
