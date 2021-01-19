(function( $ ){
	$.fn.ExportDoc = function(url, filename) {
		var newStyle = "<style id='ExportDoc_style'>" +
						"	.modalExportDoc {" +
						"		display:    none;" +
						"		position:   fixed;" +
						"		z-index:    1000;" +
						"		top:        0;" +
						"		left:       0;" +
						"		height:     100%;" +
						"		width:      100%;" +
						"		background: rgba( 255, 255, 255, .7 )" +
						"					url('images/ajax-loader.gif')" +
						"					50% 50%" +
						"					no-repeat;" +
						"	}	" +
						"	body.loading {" +
						"		overflow: hidden;" +
						"	}" +
						"	body.loading .modalExportDoc {" +
						"		display: block;" +
						"	}" +
						"</style>";
		var newDiv = '<div class="modalExportDoc" id="ExportDoc_div"></div>';
		$("head").append(newStyle);
		$("body").append(newDiv);
	
		var downloadToken = setFormToken();
		$(".modalExportDoc").show();
	
		downloadTimer = window.setInterval( function() {
			var token = getCookie( "downloadToken" );

			if( (token == downloadToken) || (attempts == 0) ) {
				unblockSubmit();
			}
	
			attempts--;
		}, 1000 );
	
		var a = document.createElement('a');
		a.id = "download_anchor";
		a.href = url+"&downloadToken="+downloadToken;
		a.download = filename;
		document.body.appendChild(a);
		
		a.click();
		
		return this;
	}; 

	function getCookie( name ) {
		var parts = document.cookie.split(name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
	
	function expireCookie( cName ) {
		document.cookie = 
			encodeURIComponent(cName) + "=deleted; expires=" + new Date( 0 ).toUTCString();
	}
	
	function setFormToken() {
		var downloadToken = new Date().getTime();
		return downloadToken;
	}
	
	var downloadTimer;
	var attempts = 180;
	
	function unblockSubmit() {
		document.body.removeChild(download_anchor);
		$(".modalExportDoc").hide();
		$("#ExportDoc_div").remove();
		window.clearInterval( downloadTimer );
		expireCookie( "downloadToken" );
		attempts = 180;
	}
})( jQuery );
