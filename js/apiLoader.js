
var domain = "DOMAIN";
var endpointApi = "https://"+domain+"/devlogger/DevLoggerApi.php";

/*Controle de acesso por aplicacao*/
var appOriginUrl = window.location.href;
var getDomain = appOriginUrl.replace("http://", "").replace("https://", "");
getDomain = getDomain.split("/");
var remoteDomain   = getDomain[0];

function callDevLogger(logdata, logname) {

    if(remoteDomain != domain) {

        console.error(false);
        return false;

    } else {

        console.info("Welcome " + remoteDomain);

        $.ajax({
            type: "POST",
            url: endpointApi,
            data: {
                acao: "createlog",
                logdata: btoa(logdata),
                logname: logname,
                debug: "N"
            },
            async: false,
            success: function (resp) {
                //console.log(atob(resp));
            }
        });
    }
}
