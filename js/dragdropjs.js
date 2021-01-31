
var enpoint_auth = 'api/auth.php';
var enpoint_item = 'api/items.php';
var user_browser = '';

/*Variaveis para uso na lista de itens drag and drop*/
var _origin  = '';
var _destiny = '';
var dataItem = '';
var imgItem  = '';
var qtdItem  = 0;
var valItem  = 0.00;
var sumItem  = 0.00;
var except   = 0;
var countItem =  0;
var removeItem = '';

//Mensageiro (Tooltip style)
toastr.options = {
    "closeButton": false, // true/false
    "debug": false, // true/false
    "newestOnTop": false, // true/false
    "progressBar": false, // true/false
    "positionClass": "toast-bottom-center",//toast-bottom-center / toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left0
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

$(document).ready(function() {

    if(window.location.href.search("login") != -1) {
        loginDragDrop();
    } else {
        itemsDragDrop();
        activeItemDragDropEvent();
    }

    $("#bt-cancel").on('click', function() {
        formReset();
    });

    $("#bt-login").on('click', function() {
        if($('#hidden_sec_dragdrop').val() != "") {
            checkAuth();
        } else {
            toastr.error("Primeiro escolha um arquivo .sec devidamente autorizado !");
        }
    });

    $("#bt-color-white-black").on('click', function(){
        $("#dragdrop-view #drop").css("color","#000000");
        $("#dragdrop-view #drop").css("background-color","#FFFFFF");

        colorSave = "#000000";
        backgroundSave = "#FFFFFF";
    });

    $("#bt-color-black-green").on('click', function(){
        $("#dragdrop-view #drop").css("color","#00FF00");
        $("#dragdrop-view #drop").css("background-color","#000000");

        colorSave = "#00FF00";
        backgroundSave = "#000000";
    });

    $("#bt-color-black-default").on('click', function(){
        $("#dragdrop-view #drop").css("color","#888888");
        $("#dragdrop-view #drop").css("background-color","#545454");

        colorSave = "#888888";
        backgroundSave = "#545454";
    });

    $("#bt-reset").on('click', function(){
        //console.log('CANCELAR');
        if(qtdItem > 0) {
            alertify.confirm('Mensagem', 'Deseja mesmo cancelar a lista ?',

                function () {

                    dataItem = '';
                    imgItem  = '';
                    qtdItem  = 0;
                    valItem  = 0.00;
                    sumItem  = 0.00;
                    except   = 0;

                    $("#drop").html('');
                    $("#drop_details").html('');

                    $('.div_item_lista').unbind('dragstart');
                    $('.div_item_lista').unbind('dragend');
                },

                function () {
                    alertify.error('Cancelado');
                }
            );
        }
    });

    $("#bt-start").on('click', function(){
        //console.log('FINALIZAR', sumItem, qtdItem);

        if(sumItem > 0 && qtdItem > 0) {

            $("#dragdrop-block-payment").show();
            $("#div_container_payment").show();

        }
    });

    $("#bt-gen-item").on('click', function(){
        //console.log('GERAR NOVO ITEM');
        var itemsCurrent = $("#div_item_container").html();
        var newItem = getNewItem();

        $("#div_item_container").html(newItem + itemsCurrent);

        activeItemDragDropEvent();

    });

    $("#bt-cancel-payment").on('click', function(){
        //console.log('CANCELAR COMPRA');

        $("#dragdrop-block-payment").hide();
        $("#div_container_payment").hide();

    });

});

function getNewItem() {

    var newItem = null;

    $.ajax({
        type: "POST",
        url: enpoint_item,
        data: {type:'newItem'},
        async: false,
        beforeSend: function(data) {
            console.log("Ajax-beforeSend");
        },
        success: function(data) {

            //console.log(newItem);
            newItem = atob(data);

        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
        }
    });

    return newItem;

}

function formReset() {

    $('#out').html('');
    $('#hidden_sec_dragdrop').val('');
    $("#file_sec_dragdrop").val('');
    $("#file_sec_dragdrop").show('fast');
    $("#span_info_select").show('fast');

    $("#drop").show();
    $("#drop").html('Arraste um arquivo de login e solte aqui, ou selecione abaixo');
    $("#drop").css('color', '#AAAAAA');
    $("#drop").css('border', 'dashed 2px #888888');
    $("#drop").css('background', '#FFFFFF');

    $("#drop_login_ok").hide();

}

function getBrowser() {

    var nav = navigator.userAgent.toLowerCase();

    if(nav.indexOf("msie") != -1){

        x_navegador_usuario = "msie";

    } else if(nav.indexOf("opera") != -1){

        x_navegador_usuario = "opera";

    } else if(nav.indexOf("safari") != -1){

        x_navegador_usuario = "safari";

    } else if(nav.indexOf("netscape") != -1){

        x_navegador_usuario = "netscape";

    } else if(nav.indexOf("chrome") != -1){

        x_navegador_usuario = "chrome";

    }  else if(nav.indexOf("mozilla") != -1){

        if(nav.indexOf("firefox") != -1){

            x_navegador_usuario = "firefox";

        } else if(nav.indexOf("chrome") != -1){

            x_navegador_usuario = "chrome";

        }

    } else {
        console.info("Atenção: Seu Navegador não foi reconhecido...");
    }
}

function _errorAlertify(msg_error) {

    // Extend existing 'alert' dialog
    if(!alertify.errorAlert){
        //define a new errorAlert base on alert
        alertify.dialog('errorAlert',function factory(){
            return{
                build:function(){
                    var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                        +    'style="vertical-align:middle;color:#e10000;">'
                        + '</span> Application Error';
                    this.setHeader(errorHeader);
                }
            };
        },true,'alert');
    }
    //launch it.
    // since this was transient, we can launch another instance at the same time.
    alertify.errorAlert(msg_error);

}

function authBySecFile(param) {

    var jsonDec = false;

    $.ajax({
        type: "POST",
        url: enpoint_auth,
        data: {type:'auth', dauth:param},
        async: false,
        beforeSend: function(data) {
            console.log("Ajax-beforeSend");
        },
        success: function(data) {

            jsonDec = JSON.parse(data);

        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
        }
    });

    return jsonDec;

}

function checkAuth(param) {

    alertify.prompt( 'Atenção', 'Entre com a senha do arquivo .sec', '',

        function(evt, value) {

            var jsonDec = false;

            $.ajax({
                type: "POST",
                url: enpoint_auth,
                data: {type:'check', pass:btoa(value)},
                async: false,
                beforeSend: function(data) {
                    console.log("Ajax-beforeSend");
                },
                success: function(data) {

                    jsonDec = JSON.parse(data);

                },
                complete: function(data) {
                    console.log("Ajax-complete");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText, textStatus, errorThrown);
                    _errorAlertify(jqXHR.responseText);
                }
            });

            if(jsonDec.status == 'OK') {
                alertify.success(jsonDec.message);
                setTimeout(function(){
                    window.location.href = 'index.php';
                }, 2000);
            } else {
                alertify.error(jsonDec.message);
            }

        },
        function() {
            alertify.error('Cancelado');
        }

    ).set('type', 'password');

}

function extensionFileValidated(input_file, filetype) {

    var fileinput;
    var inputOrigin = 0;

    try {
        fileinput = input_file.val();
        inputOrigin = 1;
    } catch (e) {
        fileinput = input_file;
    }

    var ext = fileinput.split(".").pop();

    var regtest = new RegExp('('+filetype+')');

    if(ext.search(regtest) == -1) {
        alertify.alert('Aviso', 'Tipo de arquivo invalido !');
        if(inputOrigin == 1) {
            input_file.val('');
        }
        return false;
    }

    return true;
}

function userAuthenticationWidget() {

    $("#out").html("<strong>Arquivo Carregado:</strong> " + fname);
    $("#drop").hide();
    $("#drop_login_ok").show();
    $("#drop_login_ok").html('<span class="span_ok">Seu usuário esta autorizado</span>');

}

function userUnAuthenticationWidget() {

    $("#out").html("<strong>Arquivo Carregado:</strong> " + fname);
    $("#drop").hide();
    $("#drop_login_ok").show();
    $("#drop_login_ok").html('<span class="span_erro">Seu usuário não esta autorizado</span>');

    $('#hidden_sec_dragdrop').val('');

}

function loginDragDrop() {

    var OUT = document.getElementById('out');

    (function () {
        var drop = document.getElementById('drop');
        var body = document.getElementsByTagName('body')[0];

        if (!drop.addEventListener) return;

        function handleDropPage(e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();

            try {

                fname = e.dataTransfer.files[0].name;

                if(extensionFileValidated(fname, 'sec')) {

                    var fReader = new FileReader();

                    fReader.addEventListener('load', function (event) {

                        var result = btoa(event.target.result);

                        $("#hidden_sec_dragdrop").val(result);
                        $("#file_sec_dragdrop").val('');
                        $("#file_sec_dragdrop").hide('fast');
                        $("#span_info_select").hide('fast');

                        var authSec = authBySecFile(result);

                        if(authSec.status == "ERRO") {

                            userUnAuthenticationWidget();
                            toastr.error(authSec.message);
                            return;

                        }

                        if($("#hidden_sec_dragdrop").val() != "") {

                            userAuthenticationWidget();

                        } else {
                            $("#out").html("<strong>Falha ao tentar carregar o arquivo!</strong>");
                        }

                    });

                    fReader.readAsBinaryString(e.dataTransfer.files[0]);

                } else {
                    $('#out').html('');
                    $('#hidden_sec_dragdrop').val('');
                    $("#file_sec_dragdrop").val('');
                    $("#file_sec_dragdrop").show('fast');
                    $("#span_info_select").show('fast');
                }

            } catch (er) {

                console.error("Exception", er.message);

                $('#out').html('');
                $('#hidden_sec_dragdrop').val('');
                $("#file_sec_dragdrop").val('');
                $("#file_sec_dragdrop").show('fast');
                $("#span_info_select").show('fast');
            }

            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
            drop.style.backgroundColor = "#FFFFFF";
        }

        function handleDragoverPage(e) {
            e.stopPropagation();
            e.preventDefault();
            return false
        }

        function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            drop.style.borderColor = "#00CBFE";
            drop.style.color = "#00CBFE";
            drop.style.backgroundColor = "#FFFFCC";
        }

        function handleExit(e) {
            e.stopPropagation();
            e.preventDefault();
            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
            drop.style.backgroundColor = "#FFFFFF";
        }

        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
        drop.addEventListener('dragexit', handleExit, false);

        body.addEventListener('dragenter', handleDragoverPage, false);
        body.addEventListener('dragover', handleDragoverPage, false);
        body.addEventListener('drop', handleDropPage, false);

    })();

    (function () {
        var sec = document.getElementById('file_sec_dragdrop');
        if (!sec.addEventListener) return;

        function handleFile(e) {

            try {

                fname = e.target.files[0].name;

                if (extensionFileValidated(fname, 'sec')) {

                    var fReader = new FileReader();

                    fReader.addEventListener('load', function (event) {

                        var result = btoa(event.target.result);

                        $("#hidden_sec_dragdrop").val(result);
                        $("#file_sec_dragdrop").val('');
                        $("#file_sec_dragdrop").hide('fast');
                        $("#span_info_select").hide('fast');

                        var authSec = authBySecFile(result);

                        if(authSec.status == "ERRO") {

                            userUnAuthenticationWidget();
                            $("#file_sec_dragdrop").val('');
                            toastr.error(authSec.message);
                            return;

                        }

                        if ($("#hidden_sec_dragdrop").val() != "") {

                            userAuthenticationWidget();

                        } else {
                            $("#out").html("<strong>Falha ao tentar carregar o arquivo!</strong>");
                        }

                    });

                    fReader.readAsBinaryString(e.target.files[0]);

                } else {
                    $('#out').html('');
                    $('#hidden_sec_dragdrop').val('');
                    $("#file_sec_dragdrop").val('');
                    $("#file_sec_dragdrop").show('fast');
                    $("#span_info_select").show('fast');
                }

            } catch (er) {

                console.error("Exception", er.message);

                $('#out').html('');
                $('#hidden_sec_dragdrop').val('');
                $("#file_sec_dragdrop").val('');
                $("#file_sec_dragdrop").show('fast');
                $("#span_info_select").show('fast');
            }

        }

        sec.addEventListener('change', handleFile, false);

    })();

}

function itemsDragDrop() {

    var drop  = document.getElementById('drop');
    var trash = document.getElementById('dragdrop-trash');
    var body  = document.getElementsByTagName('body')[0];

    (function () {

        if (!drop.addEventListener) return;
        if (!trash.addEventListener) return;

        function handleDropPage(e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }

        function handleDrop(e) {

            //console.log("DROP");
            //console.log(e);

            e.stopPropagation();
            e.preventDefault();

            //Controle de onde vem o item
            if(except == 0 && _destiny == "#drop" && _origin == "dragdrop-products") {

                try {

                    //console.log('ANTES', sumItem, valItem);

                    //Dados e Calculos
                    valItem = dataItem.split(";")[1];
                    sumItem = (parseFloat(sumItem) + parseFloat(valItem));
                    qtdItem++;
                    countItem++;

                    //console.log('DEPOIS', sumItem, valItem);

                    var dataTmp = dataItem.split(";");
                    var htmlTmp = '<p>';
                    htmlTmp += " <strong>Nome Item:</strong> " + dataTmp[0];
                    htmlTmp += " <strong>Categoria:</strong> " + dataTmp[2];
                    htmlTmp += " <strong>Estoque:</strong> " + dataTmp[3];
                    htmlTmp += " <strong>Valor:</strong> " + dataTmp[1];
                    htmlTmp += '</p>';

                    //Lista dragdrop
                    $("#drop").append('<div id="item_'+countItem+'" class="div_item_lista" draggable="true">' + imgItem + htmlTmp + '</div>');

                    //Detalhes dragdrop
                    $("#drop_details").html('' +
                        '<div class="div_qtd_item">' +
                            'Qtde: ' + qtdItem +
                        '</div>' +
                        '<div class="div_sum_item">' +
                            'Total: ' + sumItem.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2}) +
                        '</div>');

                    activeItemListaDragDropEvent();

                } catch (er) {

                    console.error("Exception", er.message);
                }

            } else {
                except = 0;
            }

            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
            drop.style.backgroundColor = "#FFFFFF";

        }

        function handleDropTrash(e) {

            e.stopPropagation();
            e.preventDefault();

            if(qtdItem <= 0 || sumItem <= 0) {
                return false;
            }

            //Controle de onde vem o item
            if(except == 0 && _destiny == "#dragdrop-trash" && _origin == "dragdrop-view") {

                try {

                    console.log(sumItem);

                    //Dados e Calculos
                    var valItemLista = dataItem.split("Valor: ")[1];
                    sumItem = (parseFloat(sumItem) - parseFloat(valItemLista));
                    qtdItem--;

                    console.log(sumItem, valItemLista, qtdItem, removeItem);

                    //Atualiza lista de itens
                    $("#drop #" + removeItem).remove();

                    //Atualiza detalhes de itens na view
                    $("#drop_details").html('' +
                        '<div class="div_qtd_item">' +
                        'Qtde: ' + qtdItem +
                        '</div>' +
                        '<div class="div_sum_item">' +
                        'Total: ' + sumItem.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2}) +
                        '</div>');

                } catch (er) {

                    console.error("Exception", er.message);
                }

            } else {
                except = 0;
            }

            trash.style.backgroundColor = "";

        }

        function handleDragoverPage(e) {
            e.stopPropagation();
            e.preventDefault();
            return false
        }

        function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault();

            if(except == 0 && _destiny == "#drop" && _origin == "dragdrop-products") {
                e.dataTransfer.dropEffect = 'copy';
                drop.style.borderColor = "#00CBFE";
                drop.style.color = "#00CBFE";
                drop.style.backgroundColor = "#FFFFCC";
            }
        }

        function handleDragoverTrash(e) {
            e.stopPropagation();
            e.preventDefault();

            if(except == 0 && _destiny == "#dragdrop-trash" && _origin == "dragdrop-view") {
                e.dataTransfer.dropEffect = 'copy';

                trash.style.backgroundColor = "#FFFFCC";
            }
        }

        function handleExit(e) {
            e.stopPropagation();
            e.preventDefault();
            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
            drop.style.backgroundColor = "#FFFFFF";
        }

        function handleExitTrash(e) {
            e.stopPropagation();
            e.preventDefault();

            trash.style.backgroundColor = "";
        }

        //Registros dos eventos drag and drop
        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
        drop.addEventListener('dragexit', handleExit, false);

        //Trash events
        trash.addEventListener('dragenter', handleDragoverTrash, false);
        trash.addEventListener('dragover', handleDragoverTrash, false);
        trash.addEventListener('drop', handleDropTrash, false);
        trash.addEventListener('dragexit', handleExitTrash, false);

        body.addEventListener('dragenter', handleDragoverPage, false);
        body.addEventListener('dragover', handleDragoverPage, false);
        body.addEventListener('drop', handleDropPage, false);

    })();

}

function activeItemDragDropEvent() {

    $('.div_item').unbind('dragstart');
    $('.div_item').unbind('dragend');

    //Elementos arrastaveis - Start
    $('.div_item').on('dragstart',function(e){

        console.log("START");//Debug
        console.log($(this));
        console.log(e);
        //console.log(e.target.offsetParent.id);
        //console.log(e.target.innerHTML.split('value="')[1].split('">')[0]); //Item 8;780,00;Autos;Disponivel
        //console.log(e.target.firstElementChild.outerHTML); //<img src="img/icone-produtos.png">

        try {
            _origin  = e.target.offsetParent.id;
            _destiny = "#drop";
            dataItem = e.target.innerHTML.split('value="')[1].split('">')[0];
            imgItem  = e.target.firstElementChild.outerHTML;
        } catch(er){
            console.error('Exception: ' + er);
            except = 1;
        }

    });

    //Elementos arrastaveis - End
    $('.div_item').on('dragend',function(e){

        //console.log("END");//Debug
        //console.log($(this))

        _origin  = '';
        _destiny = '';
        valItem  = 0.00;
        dataItem = '';
        imgItem  = '';

    });
}

function activeItemListaDragDropEvent() {

    $('.div_item_lista').unbind('dragstart');
    $('.div_item_lista').unbind('dragend');

    //Elementos arrastaveis - Start
    $('.div_item_lista').on('dragstart',function(e){

        console.log("START:ITEM:LISTA");//Debug
        console.log($(this));
        console.log(e);
        //console.log(e.target.offsetParent.id);
        console.log(e.target.innerText); //Nome Item: Chaves de Boca Categoria: Ferramentas Estoque: Disponivel Valor: 1259.99
        //console.log(e.target.firstElementChild.outerHTML); //<img src="img/icone-produtos.png">

        try {
            _origin  = e.target.offsetParent.id;
            _destiny = "#dragdrop-trash";
            dataItem = e.target.innerText;
            removeItem = e.target.id;

            if(!dataItem) {
                console.exception("Exception: invalid data element...");
                except = 1;
            }

        } catch(er){
            console.error('Exception: ' + er);
            except = 1;
        }

    });

    //Elementos arrastaveis - End
    $('.div_item_lista').on('dragend',function(e){

        //console.log("END");//Debug
        //console.log($(this))

        _origin  = '';
        _destiny = '';
        dataItem = '';

    });
}
