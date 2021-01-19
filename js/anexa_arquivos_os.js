/*
múltiplos uplods
*/
jQuery(document).ready(function(){
	// anexo
	if(!empty(jQuery(".anexo"))){
		var os_id = $("#os_id").val();
		new AjaxUpload('file-original', {
			action: 'manager_attach_os.php',
			data: {acao: 'upload', os_id: os_id},
			name: 'myfile',
			onSubmit: function(file, ext) {
				$("#file-falso").val(file);
				$(".span-anexo").show("fast");
				$(".submit btn_confirm").hide("fast");
			},
			onComplete : function(file,response){
				input = "<input name='panexo_arquivo[]' readonly='readonly' type='hidden' value='" + response + "' class='attach os' />";
				input2 = "<input name='panexo_arquivo_titulo[]' id='panexo_arquivo_titulo' readonly='readonly' type='text' value='" + file + "' class='attach' style='width: 200px;' />";
				button = "<input type='button' class='submit' value='Excluir' onclick='delete_attach(this, \"" + response + "\")'/>";
				img = "<img src='anexo/" + response + "' width='60px;'/>";
				descricao = "  <input type='text' style='width: 300px;' class='os_descricao' />";
				$('<li>' + input + ' '+ input2 +' ' + button + img + descricao + '</li>').appendTo($('ol.files'));
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
	  url: 'manager_attach_os.php',
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
