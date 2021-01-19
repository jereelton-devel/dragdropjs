/*
'##################################################################################################'
'#  			Classe:      ItemUI                                                                 #'
'																							                                                    #'
'##################################################################################################'
*/
function VarejoUI() {
	this.form	= null;
	this.empresa_id = 0;
	this.codigo = "";	
	this.descricao = "";		
	this.objVarejoColecao	= new VarejoColecao();
}

/*
'##################################################################################################'
'#                                       Método: TotalAdicionados                                        																															#'
'##################################################################################################'
*/
VarejoUI.prototype.TotalAdicionados = function(){
	return this.VarejoColecao.length();
}

/*
'##################################################################################################'
'#                                       Método: Adicionar                                        #'
'##################################################################################################'
*/
VarejoUI.prototype.Adicionar = function(){

	var varejo_empresa_id  = $('#varejo_empresa_id');
	var varejo_codigo  = $('#varejo_codigo');
	var varejo_descricao  = $('#varejo_descricao');
	

	if(varejo_empresa_id.val() == ''){
   		alert('Selecione o varejo');
    	varejo_empresa_id.focus();
    	return false;
  	}

  	if(varejo_codigo.val() == ''){
    	alert('Informe o código do varejo');
    	varejo_codigo.focus();
    	return false;
  	}

  	
  	var objeVarejo = new Varejo();
  	var UniqueID = this.objVarejoColecao.uniqueID++;
  	
    objeVarejo.empresa_id = varejo_empresa_id.val();
	objeVarejo.codigo = varejo_codigo.val();
	objeVarejo.descricao = varejo_descricao.val();

	this.objVarejoColecao.Adicionar(objeVarejo);	
    
	item  = "<tr>";
	item +=  "<td><input type='checkbox' class='checkboxRemove' name='checkboxVarejo[]' value='" + varejo_empresa_id.val()+'-'+varejo_codigo.val() +"' /></td>";
	item +=    "<td>" + varejo_empresa_id.children(':selected').text() + "</td>";
	item +=    "<td>" + varejo_codigo.val() + "</td>";
	item +=    "<td>" + varejo_descricao.val() + "</td>";	
	item +=  "</tr>";
	
  $("#tbl_varejo").append(item);
	
	this.LimparCampos();
}

/*
'##################################################################################################'
'#                                       Método: Editar																																		                                         #'
'##################################################################################################'
*/

VarejoUI.prototype.Editar = function(){
  
	var objVarejoID = $("[name='checkboxVarejo[]']");
	

	if(objVarejoID == null) return;

    if(objVarejoID.filter(":checked").length == 0){
      alert("Selecione um item para editar.");
      return;
    }
	 
    if(objVarejoID.filter(":checked").length > 1){
      alert("Selecione apenas um item para editar.");
      return;
    }
	
    objVarejoID = this.objVarejoColecao.getItem(this.objVarejoColecao.getIndexById(objVarejoID.filter(":checked").val()));

	$('#varejo_empresa_id').val(objVarejoID.empresa_id);
	$('#varejo_codigo').val(objVarejoID.codigo);
   $('#varejo_descricao').val(objVarejoID.descricao);
	this.Remover();
	
}

/*
'##################################################################################################'
'#                                       Método: Remover																																		                                         #'
'##################################################################################################'
*/

VarejoUI.prototype.Remover = function(){
	var objVarejoID = $("[name='checkboxVarejo[]']");
	if(objVarejoID == null) return;
	
	if(objVarejoID.filter(":checked").length == 0){
		alert("Selecione no minimo um item para remover.");
		return;
  }	 
	 
	 colecao = this.objVarejoColecao;
	 objVarejoID.filter(":checked").each(function(){
	    if($(this).val() != 'on'){
			$(this).parent().parent().remove();
			colecao.Remover(colecao.getIndexById(this.getItem(indx).empresa_id+"--"+this.getItem(indx).codigo));
			// alert(colecao.getIndexById($(this).val()));
		}	
		$(this).attr("checked",false);
	 });
}


/*/
'##################################################################################################'
'#                                       Método: LimparCampos																																                                         #'
'##################################################################################################'
*/

VarejoUI.prototype.LimparCampos = function(){
    
	$("#varejo").find(":input").each(function(){
	  switch(this.type) {
		case 'select-one':
		case 'text':
	    case 'textarea':
	        $(this).val('');
	        break;
	     case 'radio':
	     	$(this).attr("checked",false);
	  }
	});
}


/*
'##################################################################################################'
'#                                       Método: Processar																																	                                         #'
'##################################################################################################'
*/

VarejoUI.prototype.Processar = function(){
	all_varejo = $("#AllVarejo");
	all_varejo.val('');
	var valor = '';

	for(indx=0;indx< this.objVarejoColecao.length();indx++){
		objeVarejo = this.objVarejoColecao.getItem(indx);
		
		valor += '[campo]'+  objeVarejo.empresa_id;
		valor += '[campo]'+  objeVarejo.codigo;
		valor += '[campo]'+  objeVarejo.descricao;

		if(indx<this.objVarejoColecao.length()-1)
			valor += '[varejo]';
	}
	all_varejo.val(valor);
}

/*'##################################################################################################'
'#                                       Método: ReloadFromText																															                                         #'
'##################################################################################################'
*/

VarejoUI.prototype.ReloadFromText = function(text){
	var arraVarejo, arraVarejoCampos;

	if(text != ""){
		arraVarejo = text.split("[varejo]");

		for(var indx=0;indx< arraVarejo.length;indx++){
			
      		if(arraVarejo[indx] != ''){
        		arraVarejoCampos = arraVarejo[indx].split("[campo]");

        		$("#varejo_empresa_id").val(arraVarejoCampos[1]);
        		$("#varejo_codigo").val(arraVarejoCampos[2]);
				$("#varejo_descricao").val(arraVarejoCampos[3]);        		
        				this.Adicionar();
	      	}
		}
	}
}