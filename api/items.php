<?php

session_start();

error_reporting(E_ALL);

ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
ini_set("memory_limit",-1);
ini_set('max_execution_time', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$type = $_POST['type'];

$response = false;

$arrayImage    = [0=>"ferramentas.png",1=>"alimentos-1.png",2=>"acessorios-1.png",3=>"jogos-1.png",4=>"ferramentas.png",5=>"acessorios-1.png",6=>"autos-1.png",7=>"autos-1.png"];
$arrayName     = [0=>'Chave de Boca',1=>'Prato 4 Pessoas',2=>'Monitor AOC',3=>'Speed 1',4=>'Chave L',5=>'Itens de Série',6=>'Super Bife', 7=>'Roda Liga 17'];
$arrayValue    = [0=>"1259.99",1=>"80.00",2=>"236.55",3=>"896.00",4=>"58.00",5=>"630.00",6=>"56.00",7=>"780.00"];
$arrayCategory = [0=>"Ferramentas",1=>"Alimentos",2=>"Acessórios",3=>"Games",4=>"Autos",5=>"Ferramentas",6=>"Acessórios",7=>"Games"];
$arrayStock    = [0=>"Disponivel",1=>"Disponivel",2=>"Disponivel",3=>"Disponivel",4=>"Disponivel",5=>"Disponivel",6=>"Disponivel",7=>"Disponivel"];

$randItemId = rand(0, 7);

if($type == 'newItem') {

    $value = "{$arrayName[$randItemId]};{$arrayValue[$randItemId]};{$arrayCategory[$randItemId]};{$arrayStock[$randItemId]}";

    $response = '
        <div class="div_item" draggable="true">
            <img src="img/'.$arrayImage[$randItemId].'" />
            <div class="div_item_details">
                <p><strong>Nome: </strong>'.utf8_decode($arrayName[$randItemId]).'</p>
                <p><strong>Valor: </strong>R$ '.number_format($arrayValue[$randItemId], 2, ',', '.').'</p>
                <p><strong>Categoria: </strong>'.utf8_decode($arrayCategory[$randItemId]).'</p>
                <p><strong>Estoque: </strong>'.utf8_decode($arrayStock[$randItemId]).'</p>
                <input type="hidden" name="hidden_item_details" id="hidden_item_details" value="'.utf8_decode($value).'" />
            </div>
        </div>';

}

echo base64_encode($response);
exit;

?>
