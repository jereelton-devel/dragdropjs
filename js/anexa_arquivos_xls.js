/*
múltiplos uplods
*/
jQuery(document).ready(function(){
	// anexo
	if(!empty(jQuery(".anexo"))){
		new AjaxUpload('file-original', {
			action: 'manager_attach_os_planilha.php',
			data: {acao: 'upload'},
			name: 'myfile',
			onSubmit: function(file, ext) {
				$("#file-falso").val(file);
				$(".span-anexo").show("fast");
				$(".submit btn_confirm").hide("fast");
			},
			onComplete : function(file,response){
				input = "<input name='panexo_arquivo[]' readonly='readonly' type='hidden' value='" + response + "' class='attach' />";
				input2 = "<input name='panexo_arquivo_titulo[]' id='panexo_arquivo_titulo' readonly='readonly' type='text' value='" + file + "' class='attach xls' style='width: 600px;' />";
				button = "<input type='button' class='submit' value='Excluir' onclick='delete_attach(this, \"" + response + "\")'/>";
				$('<li>' + input + ' '+ input2 +' ' + button + '</li>').appendTo($('ol.files'));
				$(".submit btn_confirm").show("fast");
				$(".span-anexo").hide("fast");
				$("#file-falso").val("");
			}	
		});
	}
});	

function delete_attach(obj, file){
	$.ajax({
	  type: "POST",
	  url: 'manager_attach_os_planilha.php',
	  data: {acao: 'delete', arquivo: file},
	  async: false,
	  success: function(data) {
		linha = jQuery(obj).parent();
		linha.hide('fast');
		linha.remove();
	  }
	});
}

function empty(valor)
{
 if(valor == "" || valor == 0 || valor == null || valor == undefined)
  return true;
 else
  return false;
}
