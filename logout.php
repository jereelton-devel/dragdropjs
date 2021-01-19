<?php

session_start();
unset($_SESSION['loggerlogin']);
//session_unset();
//session_destroy();

header("location:apilogin.php");

?>