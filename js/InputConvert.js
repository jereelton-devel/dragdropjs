(function( $ ){
	$.fn.InputConvert = function(settings) {
		settings = $.extend({
			SemAcento: true,
			UpperCase: true,
			LowerCase: false,
			SoNumero: false
		}, settings);

		return this.each(function() {
			if ($(this).attr("readonly")) {
				return true;
			}
			
			if ($(this).hasClass("tabledit-input")) {
				return true;
			}
			
			var input = $(this);
			
			function keypressEvent(e) {
				var chars_dest = "AEIOUAEIOUAEIOUAOAEIOUaeiouaeiouaeiouaoaeiouCc".split("");
				var chars_orig = "ÁÉÍÓÚÄËÏÖÜÀÈÌÒÙÃÕÂÊÎÔÛáéíóúäëïöüàèìòùãõâêîôûÇç".split(""); 
				var chars_numb = "0123456789".split(""); 
				e = e || window.event;
				var evt = e.which || e.charCode || e.keyCode;
				var charStr = String.fromCharCode(evt);
				
				if (settings.SoNumero) {
					if (chars_numb.indexOf(charStr) < 0) {
						return false;
					}
				}
				
				var transformedChar = transformTypedChar(charStr, chars_orig, chars_dest);
				
				if (transformedChar != charStr) {
					charStr = transformedChar;
				}
				
				var sel = getInputSelection(this), val = this.value;
				this.value = val.slice(0, sel.start) + charStr + val.slice(sel.end);
			
				// Move o caret
				setInputSelection(this, sel.start + 1, sel.start + 1);
				return false;
			}
			
			function transformTypedChar(charStr, chars_orig, chars_dest) {
				var pos = chars_orig.indexOf(charStr);
				var charRet = charStr;
				
				if ((pos >= 0) && (settings.SemAcento)) {
					charRet = chars_dest[pos];
				}
				
				if (settings.UpperCase) {
					charRet = charRet.toUpperCase();
				} else {
					if (settings.LowerCase) {
						charRet = charRet.toLowerCase();
					}
				}
				
				return charRet;
			}
		
			function getInputSelection(el) {
				var start = 0, end = 0, normalizedValue, range,
					textInputRange, len, endRange;
			
				if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
					start = el.selectionStart;
					end = el.selectionEnd;
				} else {
					range = document.selection.createRange();
			
					if (range && range.parentElement() == el) {
						len = el.value.length;
						normalizedValue = el.value.replace(/\r\n/g, "\n");
			
						// Texto range
						textInputRange = el.createTextRange();
						textInputRange.moveToBookmark(range.getBookmark());
			
						// Checa seleção
						endRange = el.createTextRange();
						endRange.collapse(false);
			
						if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
							start = end = len;
						} else {
							start = -textInputRange.moveStart("character", -len);
							start += normalizedValue.slice(0, start).split("\n").length - 1;
			
							if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
								end = len;
							} else {
								end = -textInputRange.moveEnd("character", -len);
								end += normalizedValue.slice(0, end).split("\n").length - 1;
							}
						}
					}
				}
			
				return {
					start: start,
					end: end
				};
			}
		
			function offsetToRangeCharacterMove(el, offset) {
				return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
			}
		
			function setInputSelection(el, startOffset, endOffset) {
				el.focus();
				if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
					el.selectionStart = startOffset;
					el.selectionEnd = endOffset;
				} else {
					var range = el.createTextRange();
					var startCharMove = offsetToRangeCharacterMove(el, startOffset);
					range.collapse(true);
					if (startOffset == endOffset) {
						range.move("character", startCharMove);
					} else {
						range.moveEnd("character", offsetToRangeCharacterMove(el, endOffset));
						range.moveStart("character", startCharMove);
					}
					range.select();
				}
			}
			
			input.unbind('.InputConvert');
			input.bind('keypress.InputConvert', keypressEvent);
		})
	}
})( jQuery );
