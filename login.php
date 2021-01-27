<?php

session_start();

if(isset($_SESSION['dragdropjslogin'])) {
    header("location:index.php");
}

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>

    <title>DRAGDROPJS LOGIN</title>

    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="DRAGDROPJS" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!--Bootstrap-->
    <link rel="stylesheet" href="./css/bootstrap.min.css" />
    <link rel="stylesheet" href="./css/bootstrap-theme.min.css" />

    <!--Toastr-->
    <link rel="stylesheet" href="./js/vendor/toastr/toastr.min.css"/>

    <!--Alertify-->
    <link rel="stylesheet" href="./css/x-alertify/alertify-1.13.1.css" />
    <link rel="stylesheet" href="./css/x-alertify/themes/default.min.css" />
    <link rel="stylesheet" href="./css/x-alertify/themes/semantic.min.css" />
    <link rel="stylesheet" href="./css/x-alertify/themes/bootstrap.min.css" />

    <!--Specific Style-->
    <link rel="stylesheet" href="./css/styles.css" />

</head>
<body id="body-login">

<div id="box-conteiner-login">

    <div id="login-box">
        <h2>DRAGDROPJS - Login</h2>

        <div id="drop">
            Arraste um arquivo de login e solte aqui, ou selecione abaixo
        </div>

        <div id="drop_login_ok">
        </div>

        <span id="span_info_select">Selecione o Arquivo .sec</span>
        <input type="file" name="file_sec_dragdrop" id="file_sec_dragdrop" id="file_sec_dragdrop" value="" placeholder="Informe o arquivo SEC" />
        <input type="hidden" name="hidden_sec_dragdrop" id="hidden_sec_dragdrop" id="hidden_sec_dragdrop" value="" />

        <div id="out"></div>

        <div id="div_container_bts">
            <button class="btn btn-default bt-personalized-default" name="bt-cancel" id="bt-cancel" value="">Cancelar</button>
            <button class="btn btn-primary bt-personalized-theme" name="bt-login" id="bt-login" value="">Entrar</button>
        </div>

    </div>

</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script type="text/javascript" src="./js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/x-alertify/alertify-1.13.1.min.js"></script>
<script type="text/javascript" src="./js/dragdropjs.js"></script>

</body>
</html>
