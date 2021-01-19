/*
'##################################################################################################'
'#  			Classe:      AnexoUI                                                                 #'
'																							                                                    #'
'##################################################################################################'
*/
function AnexoUI() {
	this.form	= null;
	this.titulo = "";
	this.titulo_link = "";
	this.descricao = "";
	this.descricao_link = "";
	this.anexo = "";
	
	this.objAnexoColecao	= new AnexoColecao();
}

/*
'##################################################################################################'
'#                                       Método: TotalAdicionados                                        																															#'
'##################################################################################################'
*/
AnexoUI.prototype.TotalAdicionados = function(){
	return this.AnexoColecao.length();
}

/*
'##################################################################################################'
'#                                       Método: Adicionar                                        #'
'##################################################################################################'
*/
AnexoUI.prototype.Adicionar = function(){

	var anexo_titulo = $('#info_titulo');
	var anexo_titulo_link  = "N";
	var texto_titulo_link = 'Não';
	var anexo_descricao = $("#info_descricao");
	var anexo_descricao_link = "N";
	var texto_titulo_descricao = 'Não';
	var info_anexo = $("#info_anexo");	

	if($('#titulo_link').is(":checked") == true){
   		anexo_titulo_link = "S";
   		texto_titulo_link = 'Sim';
  	}
  	
   
  	if($("#descricao_link").is(":checked") == true){
   		anexo_descricao_link = "S";
   		texto_titulo_descricao = 'Sim';
  	}
  	
  	if(info_anexo.val() == ''){
  		alert('Selecione o arquivo');
  		return false;
  		info_anexo.focus();
  	}

  	var objeAnexo = new Anexo();
  	var UniqueID = this.objAnexoColecao.uniqueID++;
  	
  	with(objeAnexo){
  		objeAnexo.titulo = anexo_titulo.val();
		objeAnexo.titulo_link = anexo_titulo_link;
		objeAnexo.descricao = anexo_descricao.val();
		objeAnexo.descricao_link =  anexo_descricao_link;
		objeAnexo.anexo =  info_anexo.val();
		objeAnexo.indc = UniqueID;
  	}
   	
   	this.objAnexoColecao.Adicionar(objeAnexo);	
    
	item  = "<tr>";
	item +=  "<td><input type='checkbox' class='checkboxRemove' name='checkboxAnexo[]' value='" + UniqueID +"' /></td>";
	item +=    "<td>" + anexo_titulo.val() + "</td>";
	item +=    "<td>" + texto_titulo_link + "</td>";
	item +=    "<td>" + anexo_descricao.val() + "</td>";
	item +=    "<td>" + texto_titulo_descricao + "</td>";
	item +=    "<td><a href=anexo/" + info_anexo.val() + " target='_black'>" + info_anexo.val() + "s</a></td>";
	item +=  "</tr>";
	
  $("#tbl_anexo").append(item);
	
	this.LimparCampos();
}

/*
'##################################################################################################'
'#                                       Método: Editar																																		                                         #'
'##################################################################################################'
*/

AnexoUI.prototype.Editar = function(){
  
	var objAnexoID = $("[name='checkboxAnexo[]']");
	

	if(objAnexoID == null) return;

    if(objAnexoID.filter(":checked").length == 0){
      alert("Selecione um item para editar.");
      return;
    }
	 
    if(objAnexoID.filter(":checked").length > 1){
      alert("Selecione apenas um item para editar.");
      return;
    }
	
    objAnexoID = this.objAnexoColecao.getItem(this.objAnexoColecao.getIndexById(objAnexoID.filter(":checked").val()));
    if(objAnexoID.titulo_link == 'S')
    	anexo_titulo_link = true;
    else
    	anexo_titulo_link = false;

    if(objAnexoID.descricao_link == 'S')
    	anexo_descricao_link = true;
    else
    	anexo_descricao_link = false;

	$('#info_titulo').val(objAnexoID.titulo);
	$('#titulo_link').attr('checked',anexo_titulo_link);
    $('#info_descricao').val(objAnexoID.descricao);
    $('#descricao_link').attr('checked',anexo_descricao_link);


	this.Remover();
	
}

/*
'##################################################################################################'
'#                                       Método: Remover																																		                                         #'
'##################################################################################################'
*/

AnexoUI.prototype.Remover = function(){
	var objAnexoID = $("[name='checkboxAnexo[]']");
	if(objAnexoID == null) return;
	
	if(objAnexoID.filter(":checked").length == 0){
		alert("Selecione no minimo um item para remover.");
		return;
  }	 
	 
	colecao = this.objAnexoColecao;
	objAnexoID.filter(":checked").each(function(){
	    if($(this).val() != 'on'){
			$(this).parent().parent().remove();
			anexo_id = colecao.getIndexById($(this).val());
			// alert(colecao.getIndexById($(this).val()));			
			objAnexo = colecao.getItem(anexo_id+1);//Remover Arquivo
			//if(objAnexo != undefined){
				$.ajax({
      				type: "POST",
      				data: {acao:'excluir_arquivo',info_anexo: objAnexo.anexo},
      				url:  'produto_controle_acao.php',
     				async: false,
     				success: function(response) {
     					//alert(response);

     				}

	  			});
			}			
			colecao.Remover(anexo_id);			
		//}	
		$(this).attr("checked",false);
	});
}


/*
'##################################################################################################'
'#                                       Método: LimparCampos																																                                         #'
'##################################################################################################'
*/

AnexoUI.prototype.LimparCampos = function(){
    
	$("#anexo").find(":input").each(function(){
	  switch(this.type) {
		case 'select-one':
		case 'text':
	    case 'textarea':
	    case 'file':
	    case 'hidden':
	        $(this).val('');
	        break;
	     case 'radio':
	     case 'checkbox':
	     	$(this).attr("checked",false);
	  }
	});
}


/*
'##################################################################################################'
'#                                       Método: Processar																																	                                         #'
'##################################################################################################'
*/

AnexoUI.prototype.Processar = function(){

	all_anexo = $("#AllAnexo");
	all_anexo.val('');
	var valor = '';

	for(indx=0;indx< this.objAnexoColecao.length();indx++){
		objeAnexo = this.objAnexoColecao.getItem(indx);
		
		valor += '[campo]'+  objeAnexo.titulo;
		valor += '[campo]'+  objeAnexo.titulo_link;
		valor += '[campo]'+  objeAnexo.descricao;
		valor += '[campo]'+  objeAnexo.descricao_link;
		valor += '[campo]'+  objeAnexo.anexo;

		if(indx<this.objAnexoColecao.length()-1)
			valor += '[anexo]';
	}

	all_anexo.val(valor);

}

/*'##################################################################################################'
'#                                       Método: ReloadFromText																															                                         #'
'##################################################################################################'
*/

AnexoUI.prototype.ReloadFromText = function(text){
	var arraAnexo, arraAnexoCampos;

	if(text != ""){
		arraAnexo = text.split("[anexo]");

		for(var indx=0;indx< arraAnexo.length;indx++){
			
      		if(arraAnexo[indx] != ''){
        		arraAnexoCampos = arraAnexo[indx].split("[campo]");


        	if(arraAnexoCampos[2] == 'S')
    			titulo_link = true;
    		else
    			titulo_link = false;

    		if(arraAnexoCampos[4] == 'S')
    			descricao_link = true;
    		else
    			descricao_link = false;

      		$("#info_titulo").val(arraAnexoCampos[1]);
       		$("#titulo_link").attr("checked",titulo_link);
       		$("#info_descricao").val(arraAnexoCampos[3]);        		
       		$("#descricao_link").attr("checked",descricao_link);
       		$("#info_anexo").val(arraAnexoCampos[5]);


        		this.Adicionar();
	      	}
		}
	}
}