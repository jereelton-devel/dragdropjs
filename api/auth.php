<?php

error_reporting(E_ALL);

ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
ini_set("memory_limit",-1);
ini_set('max_execution_time', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$dauth = explode(";", base64_decode($_POST['dauth']))[0];

if(!$dauth || empty($dauth) || $dauth == false) {
	echo "[Erro] Falha no login !";
	die;
}

$response = [
	'status' => 'ERRO',
	'message' => 'Falha no login'
];

if($dauth == "9456d37635bb640cfb6eae64b0c2e0db") {
	$response = [
		'status' => 'OK',
		'message' => 'Logado com sucesso !'
	];
}

echo json_encode($response);
exit;

?>
