<?php

session_start();
unset($_SESSION['dragdropjslogin']);
//session_unset();
//session_destroy();

header("location:login.php");

?>