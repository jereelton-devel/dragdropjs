<?php

session_start();

/*error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);*/

if(!isset($_SESSION['dragdropjslogin']) || $_SESSION['dragdropjslogin'] == "") {
    header("location:login.php");
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>LOGGER VIEW</title>
    <meta name="description" content="LOGGERVIEW">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
    <link rel="stylesheet" href="css/styles.css" />

    <link rel="stylesheet" href="js/vendor/toastr/toastr.min.css"/>
</head>
<body>

<div id="logger-view">
    <pre>
|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
| * Welcome to DevLogger!
|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
| * Choose a logfile to start a logging view
|++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Enjoy !

Jereelton Teixeira - Developer Web PHP - 2020&copy;
    </pre>
</div>

<div id="logger-view-controls">
    <button class="btn btn-danger" id="bt-stop">Stop</button>
    <button class="btn btn-success" id="bt-start">Start</button>
    <button class="btn btn-warning" id="bt-reset">Reset</button>

    <hr />
    <p>Background</p>
    <br />

    <button class="btn btn-default" id="bt-color-white-black">White</button>
    <button class="btn btn-primary" id="bt-color-black-green">Black</button>
    <button class="btn btn-info" id="bt-color-black-default">Default</button>

    <hr />
    <p>Logs</p>
    <br />

    <select id="select-logs">
        <option value="">Selecione um log</option>
    </select>

    <div id="logger-view-alert"></div>

    <div id="logger-view-quit">
        <a id="a-quit" href="logout.php">Sair</a>
    </div>

</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script src="js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/script.js"></script>

</body>
</html>
