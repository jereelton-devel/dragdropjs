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
            <img src="img/ferramentas.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Chaves de Boca</p>
                <p><strong>Valor:</strong> R$ 1.259,99</p>
                <p><strong>Categoria:</strong> Ferramentas</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Chaves de Boca;1259.99;Ferramentas;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/alimentos-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Prato P/4 pesssoas</p>
                <p><strong>Valor:</strong> R$ 80,00</p>
                <p><strong>Categoria:</strong> Alimentos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Prato P/4 pesssoas;80.00;Alimentos;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/acessorios-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Monitor AOC</p>
                <p><strong>Valor:</strong> R$ 236,55</p>
                <p><strong>Categoria:</strong> Acessórios</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Monitor AOC;236.55;Acessórios;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/jogos-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Need For Speed 1</p>
                <p><strong>Valor:</strong> R$ 896,00</p>
                <p><strong>Categoria:</strong> Games</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Need For Speed 1;896.00;Games;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/ferramentas.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Jogo de Cahve L</p>
                <p><strong>Valor:</strong> R$ 58,00</p>
                <p><strong>Categoria:</strong> Ferramentas</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Jogo de Cahve L;58.00;Ferramentas;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/acessorios-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Itens de Série</p>
                <p><strong>Valor:</strong> R$ 630,00</p>
                <p><strong>Categoria:</strong> Acessórios</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Itens de Série;630.00;Acessórios;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/alimentos-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Super Bife</p>
                <p><strong>Valor:</strong> R$ 56,00</p>
                <p><strong>Categoria:</strong> Alimentos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Super Bife;56.00;Alimentos;Disponivel" />
            </div>
        </div>

        <div class="div_item" draggable="true">
            <img src="img/autos-1.png" />
            <div class="div_item_details">
                <p><strong>Nome:</strong> Roda Liga Leve 17</p>
                <p><strong>Valor:</strong> R$ 780,00</p>
                <p><strong>Categoria:</strong> Autos</p>
                <p><strong>Estoque:</strong> Disponivel</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="Roda Liga Leve 17;780.00;Autos;Disponivel" />
            </div>
        </div>

    </div>

</div>

<div id="dragdrop-view-controls">

    <p>Cor de Fundo</p>

    <button class="btn btn-default" id="bt-color-white-black">Branco</button>
    <button class="btn btn-primary btn-black" id="bt-color-black-green">Preto</button>
    <button class="btn btn-info btn-silver" id="bt-color-black-default">Cinza</button>

    <p>Opções</p>

    <button class="btn btn-success" id="bt-finalize">Finalizar</button>
    <button class="btn btn-warning" id="bt-reset">Cancelar</button>
    <button class="btn btn-danger" id="bt-gen-item">Novo Item</button>

    <div id="dragdrop-trash"></div>

    <div id="dragdrop-view-quit">
        <a id="a-quit" href="logout.php">Sair</a>
    </div>

</div>

<div id="dragdrop-block-payment"></div>
<div id="div_container_payment">

    <div id="div_extract_details" draggable="true"></div>

    <div id="div_virtual_card">
        <div id="div_card" draggable="true">

            <div class="fields_card fields_card_titular">
                <input type="text" name="name" id="name" class="" placeholder="NOME TITULAR" />
            </div>
            <div class="fields_card">
                <input type="text" name="card" id="card" class="" placeholder="NUMERO DO CARTÃO" />
            </div>
            <div class="fields_card">
                <input type="text" name="valid" id="valid" class="" placeholder="VALIDADE (mm/AA)" />
            </div>
            <div class="fields_card">
                <input type="text" name="cvv" id="cvv" class="" placeholder="CVV" />
            </div>

        </div>
    </div>

    <div id="drop_payment">

        <h2>PayNow</h2>

        <p style="color: #BDBDBD;text-align: center;max-width: 50%;margin: -5px auto;">
            Arraste e solte aqui o cupom fiscal e seu cartão virtual
        </p>

        <div id="div_cupom_fiscal_load">Cupom Carregado</div>
        <div id="div_virtual_card_load">Cartão Carregado</div>

        <input type="button" id="bt-payment" class="btn btn-success" value="Pagar" disabled />
        <input type="button" id="bt-cancel-payment" class="btn btn-danger" value="Cancelar" />

    </div>

</div>

<script type="text/javascript" src="./js/vendor/jquery/jquery-1.11.3.js"></script>
<script type="text/javascript" src="./js/vendor/toastr/toastr.min.js"></script>
<script type="text/javascript" src="./js/x-alertify/alertify-1.13.1.min.js"></script>
<script type="text/javascript" src="./js/dragdropjs.js"></script>

</body>
</html>
