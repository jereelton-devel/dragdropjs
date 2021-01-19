/*
'##################################################################################################'
'#                                       CLASS: Anexo	                                        																																    #'
'##################################################################################################'
*/	

function Anexo(){
	this.id = 0;
	this.titulo = "";
	this.titulo_link = "";
	this.descricao = "";
	this.descricao_link = "";
	this.anexo = "";

}

/*
'##################################################################################################'
'#                                       CLASS: EstoqueColecao                                  																																    #'
'##################################################################################################'
*/		

function AnexoColecao(){
	this.colecao = new Array();
	this.uniqueID = 0;
}

AnexoColecao.prototype.Adicionar = function(objItem){
    this.uniqueID++;
	objItem.id = this.uniqueID;	
	return this.colecao.push(objItem);
	
}

AnexoColecao.prototype.Remover = function(indice){
	this.colecao.splice(indice,1);
}

AnexoColecao.prototype.length = function(){
	return this.colecao.length;
}

AnexoColecao.prototype.getItem = function(index){
	return this.colecao[index];
}

AnexoColecao.prototype.setItem = function(index, Atributo){
	this.colecao[index] = Atributo;
}



AnexoColecao.prototype.getIndexById = function(id){
	for(var indx=0;indx<this.length();indx++){
	    if(parseInt(id,10) == parseInt(this.getItem(indx).indc,10)){
			return indx;
		}
	} 
	
}

AnexoColecao.prototype.RemoverTodos = function(){
	this.colecao = this.colecao.splice(0);
}