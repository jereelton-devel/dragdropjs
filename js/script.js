
var timeInterval = '5000';
var domain = "DOMAIN";
var endpointApi = "https://"+domain+"/devlogger/DevLoggerApi.php";

//TODO: Terminar o controle de acesso das aplicacoes
/*Controle de acesso por aplicacao*/
var appOriginUrl = window.location.href;
var getDomain = appOriginUrl.replace("http://", "").replace("https://", "");
getDomain = getDomain.split("/");
var remoteDomain   = getDomain[0];

//console.log(remoteDomain);

//Mensageiro (Tooltip style)
toastr.options = {
    "closeButton": false, // true/false
    "debug": false, // true/false
    "newestOnTop": false, // true/false
    "progressBar": false, // true/false
    "positionClass": "toast-bottom-right",//toast-bottom-center / toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left0
    "preventDuplicates": true, //true/false,
    "onclick": null,
    "showDuration": "300", // in milliseconds
    "hideDuration": "1000", // in milliseconds
    "timeOut": "5000", // in milliseconds
    "extendedTimeOut": "1000", // in milliseconds
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var colorSave = "#3FD3CE";
var backgroundSave = "#222222";
var controlLogger = null;
var logname = "welcome"; //Log padrao do sistema

function callDevLoggerList() {

    var currentOption = $("#select-logs").val();

    $.post(endpointApi,
        {acao: 'listlog'},
        function (resp, textStatus, jqXHR) {

            logs = JSON.parse(atob(resp));

            $("#select-logs").html('<option value="">Selecione um log</option>');

            $.each(logs.logfiles, function(i, obj){
                //console.log(obj);
                selectedOption = (obj == currentOption) ?  "selected" : "";
                $("#select-logs").append('<option value="'+obj+'" '+selectedOption+'>'+obj+'</option>');
            });
        }
    );
}

function callDevLoggerReset() {

    if(confirm("Efetuar o reset do arquivo "+logname+" ?")) {

        $.post(endpointApi,
            {acao: 'resetlog', logname: logname},
            function (resp, textStatus, jqXHR) {
                //console.log(atob(resp).search("Houve um erro"));
                if (atob(resp).search("Houve um erro") != -1) {
                    toastr.success("Arquivo de log resetado com sucesso");
                } else {
                    toastr.error("Erro ao tentar resetar arquivo de log");
                }
            }
        );
    }
}

function callDevLoggerView() {

    $("#logger-view-alert").html("Atualizando...");

    setTimeout(function() {

        $.post(endpointApi,
            {acao: 'viewlog', logname: logname},
            function (resp, textStatus, jqXHR) {
                //console.log(atob(resp));
                $("#logger-view").html("<pre>" + atob(resp).replaceAll('\n', '<br />').replaceAll('[Error]','<span class="text-error">[Error]</span>') + "</pre>");
                $("#logger-view-alert").html("");

                $("#logger-view pre").css("color",colorSave);
                $("#logger-view pre").css("background-color",backgroundSave);

                callDevLoggerList();
            }
        );

    }, 1500);
}

function apiAuthentication(name, pass) {

    $.post(endpointApi,
        {acao: 'auth', name: btoa(name), pass: btoa(pass)},
        function (resp, textStatus, jqXHR) {
            if (parseInt(atob(resp)) == 1) {
                toastr.success("Logado com sucesso!");
                setTimeout(function(){
                    location.href = 'index.php';
                }, 2000);
            } else {
                toastr.error("Erro: Login Invalido!");
                //window.location.href = 'apilogin.php';
            }
        }
    );
}

$(document).ready(function(){

    $("#bt-login").on('click', function(){
        var name = $("#name").val();
        var pass = $("#password").val();
        if(name && pass) {
            apiAuthentication(name, pass);
        } else {
            toastr.error("Erro: Informe dos dados para login!");
        }
    });

    $("#select-logs").change(function(){
        logname = $(this).val();
        clearInterval(controlLogger);
        callDevLoggerView();
        controlLogger = setInterval(callDevLoggerView, timeInterval);

        $("#bt-start").addClass('hide');
        $("#bt-start").hide();
        $("#bt-stop").removeClass('hide');
        $("#bt-stop").show();
    });

    $("#bt-color-white-black").on('click', function(){
        $("#logger-view pre").css("color","#000000");
        $("#logger-view pre").css("background-color","#FFFFFF");

        colorSave = "#000000";
        backgroundSave = "#FFFFFF";
    });

    $("#bt-color-black-green").on('click', function(){
        $("#logger-view pre").css("color","#00FF00");
        $("#logger-view pre").css("background-color","#000000");

        colorSave = "#00FF00";
        backgroundSave = "#000000";
    });

    $("#bt-color-black-default").on('click', function(){
        $("#logger-view pre").css("color","#3FD3CE");
        $("#logger-view pre").css("background-color","#222222");

        colorSave = "#3FD3CE";
        backgroundSave = "#222222";
    });

    $("#bt-reset").on('click', function(){
        callDevLoggerReset();
    });

    $("#bt-stop").on('click', function(){

        $(this).addClass('hide');
        $(this).hide();
        $("#bt-start").removeClass('hide');
        $("#bt-start").show();

        clearInterval(controlLogger);
    });

    $("#bt-start").on('click', function(){

        if($("#select-logs").val() == "") {
            toastr.error("Escolha um log para monitorar !");
            return false;
        }

        $(this).addClass('hide');
        $(this).hide();
        $("#bt-stop").removeClass('hide');
        $("#bt-stop").show();

        clearInterval(controlLogger);
        controlLogger = setInterval(callDevLoggerView, timeInterval);
    });

    callDevLoggerList();

});
