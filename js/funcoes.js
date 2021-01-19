//envio de anexos da ordem de servico
function dialogEnvioDocsEmail(os_id){
	var lista_os = "";
	if(os_id == undefined){
		var os_qtde = 0;		
		$('.lista_os').each(function(){
			if($(this).is(':checked')){
				os_qtde++;
				if (lista_os != '')	lista_os += ',';
				lista_os += $(this).val();
			}
		});
		if ((os_qtde < 1) || (os_qtde > 1)){
			alert('Seleciona apenas um item!');
			return false;
		}
	}else{
		lista_os = os_id;
	}

	$.Dialog({
		'title'      : 'Envio de documentos por e-mail',
		'content'    : getEnvioDocsEmail(lista_os),
		'draggable'  : true,
		'keepOpened' : true,
		'position'   : {
						'offsetY' : 30
		},																	
		'closeButton': true,
		'buttonsAlign': 'right',
		'buttons'    : {
			'OK'	: {
				'action': function() {
					var msg = "";
					var email_to = $("#os_solicitante_email").val();
					var msg = $("#email_assunto").val();

					var lista_anexo_os = "";
					$('.lista_anexo_os').each(function(){
						if($(this).is(':checked')){
							if (lista_anexo_os != '')	lista_anexo_os += ',';
							lista_anexo_os += $(this).val();
						}
					});

					$.ajax({
					  type: "POST",
					  data: {acao:'envio_docs_email', lista_itens:lista_anexo_os, email_to:email_to,os_id:lista_os},
					  async: false,
					  url: 'os_controle_acao.php',
					  success: function(data) {
						if(data==''){
							alert("E-mail enviado ao cliente com sucesso");
						}else{
							alert(data);
						}
					  }
					});														
				}
			},
			'Cancelar'	: {
				'action': function() {}
			}
		}
	});
}

function getEnvioDocsEmail(os_id){
	var notificacao_email = "";
	
	$.ajax({
	  type: "POST",
	  data: {acao: 'get_envio_docs_email', os_id:os_id},
	  async: false,
	  url: 'os_controle_edicao.php',
	  success: function(data) {
		notificacao_email = data;
	  }
	});
	return notificacao_email;
}

//envio de mail automatico da ordem de servico
function dialogReenvioEmailAutomatico(os_id){
	var lista_os = "";
	if(os_id == undefined){
		var os_qtde = 0;		
		$('.lista_os').each(function(){
			if($(this).is(':checked')){
				os_qtde++;
				if (lista_os != '')	lista_os += ',';
				lista_os += $(this).val();
			}
		});
		if ((os_qtde < 1) || (os_qtde > 1)){
			alert('Select Item!');
			return false;
		}
	}else{
		lista_os = os_id;
	}

	$.Dialog({
		'title'      : 'Resend Email',
		'content'    : getReenviomailAutomatico(lista_os),
		'draggable'  : true,
		'keepOpened' : true,
		'position'   : {
						'offsetY' : 30
		},																	
		'closeButton': true,
		'buttonsAlign': 'right',
		'buttons'    : {
			'OK'	: {
				'action': function() {
					var status_mail_id = $("#mail_id").val();

					if(mail_id=='')
						return false;
		    		$.ajax({
						url: 'os_controle_acao.php',
						type: 'POST',
						data: "acao_id=enviar_email&os_id="+lista_os+"&status_mail_id="+status_mail_id+"&reenvio=1",
						async: false,
						success: function(resposta){
							if(resposta != ''){
								alert(resposta);
							}
						}
					});

												
				}
			},
			'Close'	: {
				'action': function() {}
			}
		}
	});
}

//envio de mail automatico da ordem de servico
function dialogReenvioEmailEticket(os_id){

	var status_mail_id = '4';
	if(confirm("Resend Email to the consumer?")){

		$.ajax({
			url: 'os_controle_acao.php',
			type: 'POST',
			data: "acao_id=enviar_email&os_id="+os_id+"&status_mail_id="+status_mail_id+"&reenvio=1",
			async: false,
			success: function(resposta){
				if(resposta != ''){
					alert(resposta);
				}
			}
		});
	}
}

function getReenviomailAutomatico(os_id){
	var notificacao_email = "";
	
	$.ajax({
	  type: "POST",
	  data: {acao: 'get_envio_email_automatico', os_id:os_id},
	  async: false,
	  url: 'os_controle_edicao.php',
	  success: function(data) {
		notificacao_email = data;
	  }
	});
	return notificacao_email;
}