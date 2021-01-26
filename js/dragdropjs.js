
/*
* VARIAVEIS
* Declaração de variaveis
*
* */

var enpoint_auth = 'api/auth.php';
var user_browser = '';

/*
* DOM READY
* Configurar as primeiras instruções a serem executadas quando o DOM estiver pronto
*
* */

$(document).ready(function() {
    ativarDragDrop();

    $("#bt-cancel").on('click', function() {
        formReset();
    });
});

/*
* GENERICO
* Configurar aqui as funcões genericas do subomulo
*
* */

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

//Verifica qual browser o usuario esta usando
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

//Date Picker
function setDatepicker(){
    $(".mascara_ddmmyyyy").datepicker({ dateFormat: 'dd/mm/yy' });
    $(".mascara_ddmmyyyy").datepicker("option",$.datepicker.regional['1']);
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
        data: {dauth:param},
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

/*
* LOAD, RELOAD E PAGINAÇÃO
* Configurar aqui as funções de carregamento de tela e paginação
*
* */

//Função que carrega o conteudo inicial na grid
function loadGrid(param){

    iniTransicaoAjax();

    if(param == '') {
        param = {'acao':'grid'};
    } else {
        //Atualiza o indice da paginacao antes de executar a requisicao
        //de paginacao para poder enviar o valor correto da pagina atual
        $("#page").val(param);
        $("#grid_busca").val($("#input_grid_busca").val());
        param = $("#frm_grid_hidden").serialize();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        /*data: $("#frm_grid_hidden").serialize(),*/
        data: param,
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {

                $("#pagina_total").val($("#page_total").val());
                $("#page").val($("#page_current").val());
                $("#filtro_sql").val($("#sql_save").val());

                criaPaginacao($("#pagina_total").val(), $("#page").val());
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

/*
* VALIDACOES
* Configurar aqui as validacoes gerais do submodulo
*
* */

//Funções especificas do submodulo
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

}

/*
* CRUD
* Configuar aqui as funções para manipular os itens: Listar/Inserir/Atualizar/Remover/Bloquear
*
* */

//Inserir
function insertNewItem(id){

    $("#frm_cadastro_novo_item").append("Aguarde...");

    var dataForm = new FormData();

    dataForm.append('id_request_novo_item', $("#id_request_novo_item").val());
    dataForm.append('acao', $("#acao_novo_item").val());
    dataForm.append('input_atualizar_novo_item', $("#input_atualizar_novo_item").val());
    dataForm.append('input_numero_1', $("#input_numero_1").val());
    dataForm.append('input_numero_2', $("#input_numero_2").val());

    //Arquivo PDF
    $('input[type=file]').each(function (index, item) {
        if (item.files.length > 0) {
            dataForm.append('ext_file', item.files[0]);
        }
    });

    dataForm.append('comentario_novo_item', $("#comentario_novo_item").val());

    $.ajax({
        url: x_nome_script_modelo_acao,
        dataType: 'json',
        cache: false,
        data: dataForm,
        method: 'POST',
        async: false,
        processData: false,
        contentType: false,
        success: function (data) {

            var resp = JSON.parse(JSON.stringify(data));

            alertify.alert('Aviso', resp.message);

            //window.location.href = 'os_controle_inclusao_nf1_ing.php';
            recarregarTela();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });

}

//Listar
function listItem(id){
    listarItemTela(id);
}

//Atualizar
function updateItem(id){

    $("#frm_cadastro_novo_item").append("Aguarde...");

    var dataForm = new FormData();

    dataForm.append('id_request_novo_item', $("#id_request_novo_item").val());
    dataForm.append('acao', $("#acao_novo_item").val());
    dataForm.append('input_atualizar_novo_item', $("#input_atualizar_novo_item").val());
    dataForm.append('input_numero_1', $("#input_numero_1").val());
    dataForm.append('input_numero_2', $("#input_numero_2").val());

    //Arquivo PDF
    $('input[type=file]').each(function (index, item) {
        if (item.files.length > 0) {
            dataForm.append('ext_file', item.files[0]);
        }
    });

    dataForm.append('comentario_novo_item', $("#comentario_novo_item").val());

    $.ajax({
        url: x_nome_script_modelo_acao,
        dataType: 'json',
        cache: false,
        data: dataForm,
        method: 'POST',
        async: false,
        processData: false,
        contentType: false,
        success: function (data) {

            var resp = JSON.parse(JSON.stringify(data));

            alertify.alert('Aviso', resp.message);

            //window.location.href = 'os_controle_inclusao_nf1_ing.php';
            recarregarTela();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });

}

//Remover
function removeItem(id){

    alertify.confirm('Mensagem', 'Deseja mesmo remover o item ?',
        function(){
            alertify.success('Confirmado');

            $.ajax({
                url: x_nome_script_modelo_acao,
                dataType: 'json',
                cache: false,
                data: {acao: 'remover_item', id: id},
                method: 'POST',
                async: false,
                success: function (data) {

                    var resp = JSON.parse(JSON.stringify(data));

                    alertify.alert('Mensagem', resp.message);

                    recarregarTela();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText, textStatus, errorThrown);
                    _errorAlertify(jqXHR.responseText);
                    $("div.page").fadeIn('slow', 'linear');
                }
            });
        },
        function(){
            alertify.error('Cancelado');
        });

}

//Bloquear
function lockItem(id){

    alertify.confirm('Mensagem', 'Deseja mesmo bloquear o item ?',
        function(){
            alertify.success('Confirmado');

            $.ajax({
                url: x_nome_script_modelo_acao,
                dataType: 'json',
                cache: false,
                data: {acao: 'bloquear_item', id: id},
                method: 'POST',
                async: false,
                success: function (data) {

                    var resp = JSON.parse(JSON.stringify(data));

                    alertify.alert('Mensagem', resp.message);

                    recarregarTela();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText, textStatus, errorThrown);
                    _errorAlertify(jqXHR.responseText);
                    $("div.page").fadeIn('slow', 'linear');
                }
            });
        },
        function(){
            alertify.error('Cancelado');
        });

}

//Desbloquear
function unlockItem(id){

    alertify.confirm('Mensagem', 'Deseja mesmo bloquear o item ?',
        function(){
            alertify.success('Confirmado');

            $.ajax({
                url: x_nome_script_modelo_acao,
                dataType: 'json',
                cache: false,
                data: {acao: 'bloquear_item', id: id},
                method: 'POST',
                async: false,
                success: function (data) {

                    var resp = JSON.parse(JSON.stringify(data));

                    alertify.alert('Mensagem', resp.message);

                    recarregarTela();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText, textStatus, errorThrown);
                    _errorAlertify(jqXHR.responseText);
                    $("div.page").fadeIn('slow', 'linear');
                }
            });
        },
        function(){
            alertify.error('Cancelado');
        });

}

/*
* TELAS
* Configurar aqui as funções para mostrar as telas do submodulo
*
* */

//Configurar aqui a tela para criar um novo item no sistema (pedidos, os, etc...)
function novoItemTela(tela){

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'novo_item',
            filtro_where:'',
            limit:'',
            lista_os:'',
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {

                $('[data-click-retorna-tela-principal]').on('click', function(){
                    if(tela == "carregar_filtro") {
                        loadForm();
                    }
                    if(tela == "recarregar_tela") {
                        recarregarTela();
                    }
                });

                $("#bt-submit-form-novo-item").on('click', function(){
                    if(validarCadastroNovoItem() === true) {

                        alertify.confirm('Mensagem', 'Deseja mesmo cadastrar o novo item ?',
                            function(){
                                alertify.success('Confirmado');
                                insereNovoItem('123456');
                            },
                            function(){
                                alertify.error('Cancelado');
                            });

                    }
                    return false;
                });

                $('#bt-reset-form-novo-item').on('click', function() {
                    $('#out').html('');
                    $('#ext_file').val('');
                    $('#file_ext').val('');
                    $("#ext_file").show('fast');
                });

                //Somente numeros para os campos de chave e numero da nota fiscal
                $("#input_numero_1, #input_numero_2").on('keyup', function() {

                    var str_campo = $(this).val();
                    $(this).val(str_campo.replace(/[^\d]+/g, ''));

                });

                ativarUploadPDF();
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function(error){
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(error);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

//Configurar aqui a tela para editar um item no sistema (pedidos, os, etc...)
function editarItemTela(item_id){

    var lista_os = "";

    if(item_id) {
        lista_os = item_id;
    } else {

        $('.lista_os').each(function () {
            if ($(this).is(':checked')) {
                if (lista_os != '') lista_os += ',';
                lista_os += $(this).val();
            }
        });
    }

    if (lista_os == ''){
        alertify.alert('Aviso', 'Selecione 1 item para editar');
        return false;
    }

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'editar_item',
            filtro_where:'',
            limit:'',
            lista_os:'',
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                $('[data-click-retorna-tela-principal]').on('click', function(){
                    recarregarTela();
                });

                $("#bt-submit-form-editar-item").on('click', function(){
                    if(validacaoFake() === true) {

                        alertify.confirm('Mensagem', 'Deseja mesmo atualizar o item ?',
                            function(){
                                alertify.success('Confirmado');
                                atualizaItem('123456');
                            },
                            function(){
                                alertify.error('Cancelado');
                            });

                    }
                    return false;
                });

                $('#bt-reset-form-editar-item').on('click', function() {
                    $('#out').html('');
                    $('#ext_file').val('');
                    $('#file_ext').val('');
                    $("#ext_file").show('fast');
                });

                //Somente numeros para os campos de chave e numero da nota fiscal
                $("#input_numero_1, #input_numero_2").on('keyup', function() {

                    var str_campo = $(this).val();
                    $(this).val(str_campo.replace(/[^\d]+/g, ''));

                });

                ativarUploadPDF();
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function(error){
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(error)
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

//TODO: Configurar
function removerItemTela(item_id){

    var lista_os = "";

    if(item_id) {
        lista_os = item_id;
    } else {

        $('.lista_os').each(function () {
            if ($(this).is(':checked')) {
                if (lista_os != '') lista_os += ',';
                lista_os += $(this).val();
            }
        });
    }

    if (lista_os == ''){
        alertify.alert('Aviso', 'Selecione 1 item para remover');
        return false;
    }

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'remover_item',
            filtro_where:'',
            limit:'',
            lista_os:lista_os,
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                $('[data-click-retorna-tela-principal]').on('click', function(){
                    recarregarTela();
                });

                $("#bt-submit-form-remover-item").on('click', function(){
                    if(validarCadastroNovoItem() === true) {

                        alertify.confirm('Mensagem', 'Deseja mesmo remover o item ?',
                            function(){
                                alertify.success('Confirmado');
                                removeItem('123456');
                            },
                            function(){
                                alertify.error('Cancelado');
                            });

                    }
                    return false;
                });

                //Somente numeros para os campos de chave e numero da nota fiscal
                $("#input_numero_1, #input_numero_2").on('keyup', function() {

                    var str_campo = $(this).val();
                    $(this).val(str_campo.replace(/[^\d]+/g, ''));

                });
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

//TODO: Configurar
function bloquearItemTela(item_id){

    var lista_os = "";

    if(item_id) {
        lista_os = item_id;
    } else {

        $('.lista_os').each(function () {
            if ($(this).is(':checked')) {
                if (lista_os != '') lista_os += ',';
                lista_os += $(this).val();
            }
        });
    }

    if (lista_os == ''){
        alertify.alert('Aviso', 'Selecione 1 item para bloquear');
        return false;
    }

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'bloquear_item',
            filtro_where:'',
            limit:'',
            lista_os:lista_os,
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                $('[data-click-retorna-tela-principal]').on('click', function(){
                    recarregarTela();
                });

                $("#bt-submit-form-bloquear-item").on('click', function(){
                    if(validarCadastroNovoItem() === true) {

                        alertify.confirm('Mensagem', 'Deseja mesmo bloquear o item ?',
                            function(){
                                alertify.success('Confirmado');
                                bloqueiaItem('123456');
                            },
                            function(){
                                alertify.error('Cancelado');
                            });

                    }
                    return false;
                });

                //Somente numeros para os campos de chave e numero da nota fiscal
                $("#input_numero_1, #input_numero_2").on('keyup', function() {

                    var str_campo = $(this).val();
                    $(this).val(str_campo.replace(/[^\d]+/g, ''));

                });
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

//TODO: Configurar
function listarItemTela(item_id){

    var lista_os = "";

    if(item_id) {
        lista_os = item_id;
    } else {

        $('.lista_os').each(function () {
            if ($(this).is(':checked')) {
                if (lista_os != '') lista_os += ',';
                lista_os += $(this).val();
            }
        });
    }

    if (lista_os == ''){
        alertify.alert('Aviso', 'Selecione 1 item para listar');
        return false;
    }

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'listar_item',
            filtro_where:'',
            limit:'',
            lista_os:lista_os,
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                $('[data-click-retorna-tela-principal]').on('click', function(){
                    recarregarTela();
                });
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

//TODO: Configurar
function acoesItemTela(item_id){

    var lista_os = "";

    if(item_id) {
        lista_os = item_id;
    } else {

        $('.lista_os').each(function () {
            if ($(this).is(':checked')) {
                if (lista_os != '') lista_os += ',';
                lista_os += $(this).val();
            }
        });
    }

    if (lista_os == ''){
        alertify.alert('Aviso', 'Selecione 1 item');
        return false;
    }

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'acoes_item',
            filtro_where:'',
            limit:'',
            lista_os:'',
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                $('[data-click-retorna-tela-principal]').on('click', function(){
                    recarregarTela();
                });

                $("#bt-submit-form-acoes-item").on('click', function(){
                    if(validacaoFake() === true) {

                        alertify.confirm('Mensagem', 'Deseja mesmo agir no item ?',
                            function(){
                                alertify.success('Confirmado');
                                //TODO algumaAcao('123456');
                            },
                            function(){
                                alertify.error('Cancelado');
                            });

                    }
                    return false;
                });

                $('#bt-reset-form-acoes-item').on('click', function() {
                    $('#out').html('');
                    $('#ext_file').val('');
                    $('#file_ext').val('');
                    $("#ext_file").show('fast');
                });

                //Somente numeros para os campos de chave e numero da nota fiscal
                $("#input_numero_1, #input_numero_2").on('keyup', function() {

                    var str_campo = $(this).val();
                    $(this).val(str_campo.replace(/[^\d]+/g, ''));

                });

                ativarUploadPDF();
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

function uploadItemTela(tela){

    identificarNavegador();

    if(x_navegador_usuario != "chrome") {
        iniTransicaoAjax();
    }

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao:'upload',
            filtro_where:'',
            limit:'',
            lista_os:'',
            status_atual:'',
            tipo_consulta:'',
            getsql:'',
            sql:'',
            request_number:''
        },
        async: false,
        beforeSend: function(data) {

            console.log("Ajax-beforeSend");
            if(x_navegador_usuario == "chrome") {
                iniTransicaoAjax();
            }
        },
        success: function(data) {

            fimTransicaoAjax(data, function() {
                ativarUpload(tela);

                $('[data-click-retorna-tela-principal]').on('click', function(){
                    if(tela == "carregar_filtro") {
                        loadForm();
                    }
                    if(tela == "recarregar_tela") {
                        recarregarTela();
                    }
                });

                $('#bt-reset-form-upload-item').on('click', function() {
                    $('#out').html('');
                    $('#xls').val('');
                    $("#xlfile").show('fast');
                });

                ativarXlsImport();
            });
        },
        complete: function(data) {
            console.log("Ajax-complete");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText, textStatus, errorThrown);
            _errorAlertify(jqXHR.responseText);
            $("div.page").fadeIn('slow', 'linear');
        }
    });
}

/*
* UPLOAD
* Configuar aqui as funções para upload de arquivos
*
* */

function ativarDragDrop() {

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

        $("#drop").addEventListener();

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

function ativarXlsImport() {

    /*jshint browser:true */
    /* eslint-env browser */
    /* eslint no-use-before-define:0 */
    /*global Uint8Array, Uint16Array, ArrayBuffer */
    /*global XLSX */
    var X = XLSX;
    var XW = {
        /* worker message */
        msg: 'xlsx',
        /* worker scripts */
        worker: './xlsxworker.js'
    };

    var global_wb;
    var fname = null;

    var process_wb = (function () {
        var OUT = document.getElementById('out');
        var HTMLOUT = document.getElementById('htmlout');

        var get_format = (function () {
            var radios = document.getElementsByName("format");
            return function () {
                for (var i = 0; i < radios.length; ++i) if (radios[i].checked || radios.length === 1) return radios[i].value;
            };
        })();

        var to_json = function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName]);
                if (roa.length) result[sheetName] = roa;
            });
            return JSON.stringify(result, 2, 2);
        };

        var to_csv = function to_csv(workbook) {
            var result = [];
            workbook.SheetNames.forEach(function (sheetName) {
                var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                if (csv.length) {
                    //result.push("SHEET: " + sheetName);
                    //result.push("");
                    result.push(csv);
                }
            });
            return result.join("\n");
        };

        var to_fmla = function to_fmla(workbook) {
            var result = [];
            workbook.SheetNames.forEach(function (sheetName) {
                var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
                if (formulae.length) {
                    result.push("SHEET: " + sheetName);
                    result.push("");
                    result.push(formulae.join("\n"));
                }
            });
            return result.join("\n");
        };

        var to_html = function to_html(workbook) {
            HTMLOUT.innerHTML = "";
            workbook.SheetNames.forEach(function (sheetName) {
                var htmlstr = X.write(workbook, {sheet: sheetName, type: 'binary', bookType: 'html'});
                HTMLOUT.innerHTML += htmlstr;
            });
            return "";
        };

        return function process_wb(wb) {
            global_wb = wb;
            var output = "";
            switch (get_format()) {
                case "form":
                    output = to_fmla(wb);
                    break;
                case "html":
                    output = to_html(wb);
                    break;
                case "json":
                    output = to_json(wb);
                    break;
                default:
                    output = to_csv(wb);
            }

            $("#xls").val(output);
            $("#xlfile").val('');
            $("#xlfile").hide('fast');

            if($("#xls").val() != "") {
                $("#out").html('<strong>Arquivo carregado:</strong> ' + fname);
            } else {
                $("#out").html('<strong>Falha ao carregar arquivo:</strong> ' + fname);
            }

            //if (typeof console !== 'undefined') console.log("output", new Date());
        };
    })();

    var do_file = (function () {
        var rABS = typeof FileReader !== "undefined" && (FileReader.prototype || {}).readAsBinaryString;
        var domrabs = false;
        if (!rABS) domrabs.disabled = !(domrabs.checked = false);

        var use_worker = typeof Worker !== 'undefined';
        var domwork = false;
        if (!use_worker) domwork.disabled = !(domwork.checked = false);

        var xw = function xw(data, cb) {
            var worker = new Worker(XW.worker);
            worker.onmessage = function (e) {
                switch (e.data.t) {
                    case 'ready':
                        break;
                    case 'e':
                        console.error(e.data.d);
                        break;
                    case XW.msg:
                        cb(JSON.parse(e.data.d));
                        break;
                }
            };
            worker.postMessage({d: data, b: rABS ? 'binary' : 'array'});
        };

        return function do_file(files) {
            rABS = domrabs.checked;
            use_worker = domwork.checked;
            var f = files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                /*if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);*/
                var data = e.target.result;
                if (!rABS) data = new Uint8Array(data);
                if (use_worker) xw(data, process_wb);
                else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
            };
            if (rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
        };
    })();

    (function () {
        var drop = document.getElementById('drop');
        if (!drop.addEventListener) return;

        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();

            try {

                fname = e.dataTransfer.files[0].name;

                if(validarExtensaoArquivo(e.dataTransfer.files[0].name, 'xls|xlsx|xlsb')) {
                    do_file(e.dataTransfer.files);
                } else {
                    $('#out').html('');
                    $('#xls').val('');
                    $("#xlfile").val('');
                    $("#xlfile").show('fast');
                }

            } catch (er) {
                console.log(er.message);
                $('#out').html('');
                $('#xls').val('');
                $("#xlfile").val('');
                $("#xlfile").show('fast');
            }

            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
        }

        function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            drop.style.borderColor = "#00CBFE";
            drop.style.color = "#00CBFE";
        }

        function handleExit(e) {
            e.stopPropagation();
            e.preventDefault();
            drop.style.borderColor = "#ABABAB";
            drop.style.color = "#ABABAB";
        }

        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
        drop.addEventListener('dragexit', handleExit, false);

    })();

    (function () {
        var xlf = document.getElementById('xlfile');
        if (!xlf.addEventListener) return;

        function handleFile(e) {

            try {

                fname = e.target.files[0].name;

                if (validarExtensaoArquivo(e.target.files[0].name, 'xls|xlsx|xlsb')) {

                    do_file(e.target.files);

                    if ($("#xls").val() != "") {
                        $("#out").html('Arquivo carregado!');
                    } else {
                        $("#out").html('Falha ao carregar arquivo!');
                    }
                } else {
                    $('#out').html('');
                    $('#xls').val('');
                    $("#xlfile").val('');
                    $("#xlfile").show('fast');
                }

            } catch (er) {
                console.error(er.message);
                $('#out').html('');
                $('#xls').val('');
                $("#xlfile").val('');
                $("#xlfile").show('fast');
            }

        }

        xlf.addEventListener('change', handleFile, false);
    })();

}

function ativarUpload(tela) {

    $('#frm_upload_item').validate({
        rules: {
            modelo: "required"
        },
        messages: {
            modelo: "Campo Obrigatorio"
        },
        submitHandler: function (form) {

            var msg = "";

            if (msg !== "") {
                alertify.alert('Aviso', msg);
                return false;
            }

            if($("#xlfile").val() == "" && $("#xls").val() == "") {
                alertify.alert('Aviso', 'Escolha um arquivo para upload');
                return false;
            }

            alertify.confirm('Mensagem', 'Confirma upload do arquivo ?',
                function () {
                    alertify.success('Confirmado');
                    $.ajax({
                        type: "POST",
                        url: x_nome_script_modelo_acao,
                        data: $("#frm_upload_item").serialize(),
                        async: false,
                        success: function (data) {

                            alertify.alert('Mensagem', data);
                            if(tela == "carregar_filtro") {
                                loadForm();
                            }
                            if(tela == "recarregar_tela") {
                                recarregarTela();
                                //loadGrid('');
                            }

                            return false;

                        }
                    });
                },
                function () {
                    alertify.error('Cancelado');
                });

            return false;
        }
    });
}

/*
* FILTROS (Dialog)
* Configurar aqui as funções utilizadas pelo dialog de filtro padrão do sistema
*
* */

//Configurar aqui o filtro que deve ser carregado quando requisitado
function getFiltro(){

    var dialog_filtro = "";

    $.ajax({
        type: "POST",
        url: x_nome_script_modelo_edicao,
        data: {
            acao: 'dialog_filtro',
            filtro_hidden_1: $("#filtro_hidden_1").val(),
            filtro_hidden_2: $("#filtro_hidden_2").val(),
            filtro_hidden_3: $("#filtro_hidden_3").val(),
            filtro_hidden_4: $("#filtro_hidden_4").val(),
            filtro_hidden_5: $("#filtro_hidden_5").val(),
            filtro_hidden_6: $("#filtro_hidden_6").val(),
            filtro_hidden_7: $("#filtro_hidden_7").val(),
            filtro_hidden_8: $("#filtro_hidden_8").val(),
            filtro_hidden_9: $("#filtro_hidden_9").val(),
            filtro_hidden_10: $("#filtro_hidden_10").val(),
            filtro_hidden_11: $("#filtro_hidden_11").val(),
            filtro_hidden_12: $("#filtro_hidden_12").val(),
            filtro_hidden_13: $("#filtro_hidden_13").val(),
            filtro_hidden_14: $("#filtro_hidden_14").val(),
            filtro_hidden_15: $("#filtro_hidden_15").val(),
            filtro_hidden_16: $("#filtro_hidden_16").val(),
            filtro_hidden_17: $("#filtro_hidden_17").val(),
            filtro_hidden_18: $("#filtro_hidden_18").val(),
            filtro_hidden_19: $("#filtro_hidden_19").val(),
            filtro_hidden_20: $("#filtro_hidden_20").val(),
            filtro_hidden_21: $("#filtro_hidden_21").val(),
            filtro_hidden_22: $("#filtro_hidden_22").val(),
            filtro_hidden_23: $("#filtro_hidden_23").val(),
            filtro_hidden_24: $("#filtro_hidden_24").val(),
            filtro_hidden_25: $("#filtro_hidden_25").val(),
            filtro_hidden_26: $("#filtro_hidden_26").val()
        },
        async: false,
        success: function(data) {
            dialog_filtro = data;
        }
    });

    return dialog_filtro;

}

//Mostra o filtro em um dialog jquery
function dialogFiltro(){

    $.Dialog({
        'title'      : 'Filtro',
        'content'    : getFiltro(),
        'draggable'  : true,
        'keepOpened' : true,
        'closeButton': true,
        'buttonsAlign': 'right',
        'buttons'    : {
            'OK'	: {
                'action': function() {

                    $("#filtro_hidden_1").val($("#filtro_1").val());
                    $("#filtro_hidden_2").val($("#filtro_2").val());
                    $("#filtro_hidden_3").val($("#filtro_3").val());
                    $("#filtro_hidden_4").val($("#filtro_4").val());
                    $("#filtro_hidden_5").val($("#filtro_5").val());
                    $("#filtro_hidden_6").val($("#filtro_6").val());
                    $("#filtro_hidden_7").val($("#filtro_7").val());
                    $("#filtro_hidden_8").val($("#filtro_8").val());
                    $("#filtro_hidden_9").val($("#filtro_9").val());
                    $("#filtro_hidden_10").val($("#filtro_10").val());
                    $("#filtro_hidden_11").val($("#filtro_11").val());
                    $("#filtro_hidden_12").val($("#filtro_12").val());
                    $("#filtro_hidden_13").val($("#filtro_13").val());
                    $("#filtro_hidden_14").val($("#filtro_14").val());
                    $("#filtro_hidden_15").val($("#filtro_15").val());
                    $("#filtro_hidden_16").val($("#filtro_16").val());
                    $("#filtro_hidden_17").val($("#filtro_17").val());
                    $("#filtro_hidden_18").val($("#filtro_18").val());
                    $("#filtro_hidden_19").val($("#filtro_19").val());
                    $("#filtro_hidden_20").val($("#filtro_20").val());
                    $("#filtro_hidden_21").val($("#filtro_21").val());
                    $("#filtro_hidden_22").val($("#filtro_22").val());
                    $("#filtro_hidden_23").val($("#filtro_23").val());
                    $("#filtro_hidden_24").val($("#filtro_24").val());
                    $("#filtro_hidden_25").val($("#filtro_25").val());
                    $("#filtro_hidden_26").val($("#filtro_26").val());

                    loadGrid('1');
                }
            },
            'Cancelar'	: {
                'action': function() {}
            }
        }
    });

    listaFiltro1();
    listaFiltro2();
    listaFiltro3();
    carregarDatepicker();
}

function listaFiltro1(cliente_negocio) {

    $.get(x_request,
        {acao:'consulta_status_ws',id:'508,532,529,535,533,534,531,537,530,536',descricao:''},
        function(data, textStatus, jqXHR)
        {
            $("#filtro_6").html(data);
        }
    );

}

function listaFiltro2(){

    $.get(x_request,
        {acao:'consulta_cliente_negocio_operacao',cliente_negocio:'',todos:'S'},
        function(data, textStatus, jqXHR)
        {
            $("#filtro_7").html(data);
        }
    );
}

function listaFiltro3(){

    $.get(x_request,
        {acao:'consulta_status_ws',id:'508,532,529,535,533,534,531,537,530,536',descricao:''},
        function(data, textStatus, jqXHR)
        {
            $("#filtro_8").html(data);
        }
    );
}

/*
* EXPORTAR DADOS
* Configurar aqui as funções para exportar dados da tela para arquivos (ex: planilhas)
*
* */

//Configurar aqui a exportação do conteudo em tela para arquivo excel
function exportaBase(){

    $('body').addClass("loading");

    var filtro_sql = $("#filtro_sql").val();
    var formato = "xls";
    $("#sql").val(filtro_sql);
    $("#acao").val(formato);
    $("#pag").val($("#body").val());

    $.post(x_nome_script_modelo_acao,
        $("#frm_exportar").serialize(),
        function(data, textStatus, jqXHR)
        {
            $('#iframe_exportar_xls').attr('src', data.replaceAll('\n', ''));

            setTimeout(function(){

                $.post(x_nome_script_modelo_acao,
                    {acao:'xls_delete', path_filename:data.replaceAll('\n', '')},
                    function(datadel, textStatus, jqXHR)
                    {
                        $('body').removeClass("loading");
                    }
                );

            }, 1000);

            //Garante que o loader gif seja removido em casos de falha na requisição acima
            setTimeout(function(){
                if($('body').hasClass('loading')) {
                    $('body').removeClass("loading");
                }
            }, 2500);
        }
    );
}

/*function exportaBase(){
    var filtro_sql = $("#filtro_sql").val();
    var formato = "xls";
    $("#sql").val(filtro_sql);
    $("#acao").val(formato);
    $("#frm_exportar").submit();
}*/

function exportaListaItem(){

    $('body').addClass("loading");

    var filtro_sql = $("#filtro_sql").val();
    var formato = "xls_item";
    $("#sql").val(filtro_sql);
    $("#acao").val(formato);
    $("#pag").val('1'); //TESTE

    $.post(x_nome_script_modelo_acao,
        $("#frm_exportar_lista_item").serialize(),
        function(data, textStatus, jqXHR)
        {
            $('#iframe_exportar_xls').attr('src', data.replaceAll('\n', ''));

            setTimeout(function(){

                $.post(x_nome_script_modelo_acao,
                    {acao:'xls_delete', path_filename:data.replaceAll('\n', '')},
                    function(datadel, textStatus, jqXHR)
                    {
                        $('body').removeClass("loading");
                    }
                );

            }, 1000);

            //Garante que o loader gif seja removido em casos de falha na requisição acima
            setTimeout(function(){
                if($('body').hasClass('loading')) {
                    $('body').removeClass("loading");
                }
            }, 2500);
        }
    );
}

/*function exportaListaItem(){
    var filtro_sql = $("#filtro_sql").val();
    var formato = "xls_item";
    $("#sql").val(filtro_sql);
    $("#acao").val(formato);
    $("#pag").val('1'); //TESTE
    $("#frm_exportar_lista_item").submit();
}*/

/*
* COMENTARIOS
* Configurar aqui as funções para manipular comentarios de usuarios quando necessario
*
* */

function dialogVerComentarios(id){

    $.Dialog({
        'title'      : 'Comentarios',
        'content'    : getComentarios(id),
        'draggable'  : true,
        'keepOpened' : true,
        'position'   : {
            'offsetY' : 5,
            'offsetX' : 5
        },
        'closeButton': true,
        'buttonsAlign': 'right',
        'buttons'    : {
            'OK' : {
                'action': function() {}
            }
        }
    });
}

function getComentarios(id){

    var clienteconfig_id = "40";

    var comentario = "" +
        "\t\t<div>\n" +
        "\t\t\t<div style='overflow: auto; width:800px'>\n" +
        "\t\t\t\t<div class='rows'>\n" +
        "\t\t\t\t\t<table class='striped bordered hovered'>\n" +
        "\t\t\t\t\t\t<thead>\n" +
        "\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t<th class='text-center' style='white-space: nowrap;'>Data</th>\n" +
        "\t\t\t\t\t\t\t\t<th class='text-center' style='white-space: nowrap;'>Postado por</th>\n" +
        "\t\t\t\t\t\t\t\t<th class='text-center' style='white-space: nowrap;'>Comentario</th>\n" +
        "\t\t\t\t\t\t\t\t<th class='text-center' style='white-space: nowrap;'>Status</th>\n" +
        "\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t</thead>\n" +
        "\t\t\t\t\t\t<tbody>\n" +
        "\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t<td class='text-center' style='width: 112px; min-width: 112px; text-align: center; padding-left: 3px; padding-right: 3px;' nowrap=''>2020-11-10</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;' nowrap=''>Suporte</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>PEDIDO CRIADO</td>\n" +
        "\t\t\t\t\t\t\t\t<td title='Coleta Solicitada' alt='Coleta Solicitada' style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>Coleta Solicitada</td>\n" +
        "\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t<td class='text-center' style='width: 112px; min-width: 112px; text-align: center; padding-left: 3px; padding-right: 3px;' nowrap=''>2020-11-10</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;' nowrap=''>Suporte</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>PEDIDO CRIADO</td>\n" +
        "\t\t\t\t\t\t\t\t<td title='Coleta Solicitada' alt='Coleta Solicitada' style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>Coleta Solicitada</td>\n" +
        "\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t\t<tr>\n" +
        "\t\t\t\t\t\t\t\t<td class='text-center' style='width: 112px; min-width: 112px; text-align: center; padding-left: 3px; padding-right: 3px;' nowrap=''>2020-11-10</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;' nowrap=''>Suporte</td>\n" +
        "\t\t\t\t\t\t\t\t<td style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>PEDIDO CRIADO</td>\n" +
        "\t\t\t\t\t\t\t\t<td title='Coleta Solicitada' alt='Coleta Solicitada' style='white-space: nowrap; padding-left: 3px; padding-right: 3px;'>Coleta Solicitada</td>\n" +
        "\t\t\t\t\t\t\t</tr>\n" +
        "\t\t\t\t\t\t</tbody>\n" +
        "\t\t\t\t\t</table>\n" +
        "\t\t\t\t</div>\t\n" +
        "\t\t\t</div>\n" +
        "\t\t</div>";

    /*$.ajax({
        type: "POST",
        data: {id:id,status_id:$filtros.status_id,clienteconfig_id:clienteconfig_id},
        async: false,
        url: 'os_controle_edicao.php?acao=comentario_geral',
        success: function(data) {
            comentario = data;
        }
    });*/

    return comentario;
}
