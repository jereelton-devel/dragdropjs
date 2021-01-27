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

    <title>DRAGDROPJS</title>

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
<body>

<div id="dragdrop-view">
    <h2>Lista de Itens</h2>
    <div id="drop">
    </div>
    <div id="drop_details">
    </div>
</div>

<div id="dragdrop-products">

    <div id="div_item_title">
        <h2>Itens Disponiveis</h2>
    </div>

    <div id="div_item_container">

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 1</p>
                <p><strong>Valor:</strong> R$ 500,00</p>
                <p><strong>Categoria:</strong> Ferramentas</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 1;500,00;Ferramentas;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 2</p>
                <p><strong>Valor:</strong> R$ 80,00</p>
                <p><strong>Categoria:</strong> Alimentos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 2;80,00;Alimentos;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 3</p>
                <p><strong>Valor:</strong> R$ 236,00</p>
                <p><strong>Categoria:</strong> Acessórios</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 3;236,00;Acessórios;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 4</p>
                <p><strong>Valor:</strong> R$ 896,00</p>
                <p><strong>Categoria:</strong> Games</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 4;896,00;Games;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 5</p>
                <p><strong>Valor:</strong> R$ 58,00</p>
                <p><strong>Categoria:</strong> Ferramentas</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 5;58,00;Ferramentas;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 6</p>
                <p><strong>Valor:</strong> R$ 630,00</p>
                <p><strong>Categoria:</strong> Acessórios</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 6;630,00;Acessórios;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 7</p>
                <p><strong>Valor:</strong> R$ 56,00</p>
                <p><strong>Categoria:</strong> Alimentos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 7;56,00;Alimentos;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/icone-produtos.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Item 8</p>
                <p><strong>Valor:</strong> R$ 780,00</p>
                <p><strong>Categoria:</strong> Autos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Item 8;780,00;Autos;Disponivel" />
            </div>
        </div>

    </div>

</div>

<div id="dragdrop-view-controls">

    <p>Opções</p>

    <button class="btn btn-success" id="bt-start">Finalizar</button>
    <button class="btn btn-warning" id="bt-reset">Cancelar</button>
    <button class="btn btn-danger" id="bt-gen-item">Gerar Novo Item</button>

    <p>Cor de Fundo</p>

    <button class="btn btn-default" id="bt-color-white-black">Branco</button>
    <button class="btn btn-primary btn-black" id="bt-color-black-green">Preto</button>
    <button class="btn btn-info btn-silver" id="bt-color-black-default">Cinza</button>

    <div id="dragdrop-view-quit">
        <a id="a-quit" href="logout.php">Sair</a>
    </div>

</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script type="text/javascript" src="./js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/x-alertify/alertify-1.13.1.min.js"></script>
<script type="text/javascript" src="./js/dragdropjs.js"></script>

</body>
</html>
