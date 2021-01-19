<?php

session_start();

if(isset($_SESSION['loggerlogin'])) {
    header("location:index.php");
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>LOGGER LOGIN</title>
    <meta name="description" content="LOGGERVIEW">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/bootstrap-theme.min.css" />
    <link rel="stylesheet" href="css/styles.css" />

    <link rel="stylesheet" href="js/vendor/toastr/toastr.min.css"/>
</head>
<body id="body-login">

<div id="box-conteiner-login">

    <div id="login-box">
        <h2>DEV LOGGER - Login</h2>
        Login
        <input type="text" name="name" id="name" id="name" value="" placeholder="Informe seu Login" />
        Senha
        <input type="password" name="password" id="password" id="password" value="" placeholder="Informe sua Senha" />
        <button class="btn btn-primary" name="bt-login" id="bt-login" value="">Entrar</button>
    </div>

</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script src="js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/script.js"></script>

</body>
</html>
