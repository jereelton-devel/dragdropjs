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
$param = $_POST['param'];

$response = [
    'status' => 'ERRO',
    'message' => false,
    'code' => false,
    'date' => date('d/m/Y H:i:s')
];

if($type == 'pay') {

    $param = base64_decode($param);
    $date = date('d/m/Y H:i:s');
    $source = $param.$date;
    $code = strtoupper(md5($source));

    $response = [
        'status' => 'OK',
        'message' => 'Pagamento Realizado !',
        'code' => $code,
        'date' => $date,
        'param' => $param, //Devel
        'source' => $source //Devel
    ];

}

echo json_encode($response);
exit;

?>
