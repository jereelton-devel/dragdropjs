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

$response = [
    'status' => 'ERRO',
    'message' => false
];

if($type == 'auth') {

    $dauth = explode(";", base64_decode($_POST['dauth']))[0];

    if (!$dauth || empty($dauth) || $dauth == false) {
        echo "[Erro] Falha na autorização !";
        die;
    }

    $response = [
        'status' => 'ERRO',
        'message' => 'Falha na autorização !'
    ];

    if ($dauth == "9456d37635bb640cfb6eae64b0c2e0db") {
        $response = [
            'status' => 'OK',
            'message' => 'Usuário Autorizado !'
        ];
    }
}

if($type == 'check') {

    $pass = base64_decode($_POST['pass']);

    if (!$pass || empty($pass) || $pass == false) {
        echo "[Erro] Falha na autenticação !";
        die;
    }

    $response = [
        'status' => 'ERRO',
        'message' => 'Falha na autenticação !'
    ];

    if ($pass == "123456") {
        $response = [
            'status' => 'OK',
            'message' => 'Usuário Autenticado !'
        ];
        $_SESSION['dragdropjslogin'] = md5($pass);
    }
}

echo json_encode($response);
exit;

?>
