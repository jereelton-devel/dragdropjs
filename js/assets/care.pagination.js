/**
 * Care Pagination
 */
 try {
		if (typeof jQuery === "undefined") {
			throw new Error(": Paginacao requer jQuery");
		}
		// if (typeof jQuery.ui === "undefined") {
			// throw new Error(": Paginacao requer jQuery.ui");
		// }
} catch(e) {
	alert(e.name + " " + e.message)
}

(function ($, window) {

 try {
	
		if (!$.care) {
	        $.care = {};
	    };
		
		$.care.disableElement = function (selector) {
	        return $(selector).each(function () {
	            $(this).addClass("disabled").attr("disabled", "disabled");
	        });
	    };

	    $.care.enableElement = function (selector) {
	        return $(selector).each(function () {
	            $(this).removeClass("disabled").removeAttr("disabled");
	        });
	    };
		
		$.care.grid = function (selector, options) {
			
			var defaults = $.extend(true, {
	            className: null,
				fieldPrefix: "Filter",
				useForm: true,
				async: true,
				load: true,
	            currentPage: 1,
				sizePagination: 5,
	            form: null,
	            formExport: null,
	            before: function () { },
	            success: function () { },
	            complete: function () { },
	            validate: function () { return true; }
	        }, $.care.grid.defaultOptions, options);

			var serialize = function () {
	            var $form = $(this);
				var fields = $("input,select,textarea", $form);			
	            var parameters = fields.serializeArray();
				
	            return $.param(parameters);
	        };

			var pagination = function (count) {

				var $grid = $(this);
				var $form = $grid.data("form");
				var page = parseInt($('input[name="' + makeFieldName("CurrentPage") + '"]').val());
				var pages = Math.ceil(parseInt(count) / parseInt($('input[name="' + makeFieldName("PageSize") + '"]').val()));
				var url = $form.attr('action');
				var $table = $grid.find("table");
				var countColumn = getCountColumnTable.call($grid);
				var sizePagination = parseInt(defaults.sizePagination);

				if (page === 0) page = 1;

				var center = parseInt((sizePagination / 2));
				if (sizePagination%2 != 0)
					center = parseInt(((sizePagination - 1) / 2) + 1);
				
				var arrPages = [];
				for (var i = 1; i <= pages; i++){
					var active = ''; 
					if(page === i)
						active = 'active';
					
					arrPages.push("<li class='" + active + "'><a class='care-grid-paged' href='" + url + "' data-page='"+ i +"'>" + i + "</a></li>");
				}

				var pageStart = 0;
				if (page > center)
					pageStart = (page - center);

				var pageEnd = sizePagination + pageStart;
				if (pageEnd > pages){
					pageEnd = pages;
					pageStart = ((pageEnd > 1) ? pageEnd - sizePagination : 0);
				}
				pageStart = pageStart < 0 ? 0 : pageStart;

				var footer = '<tfoot><tr><td colspan="' + countColumn + '">';
				
				footer += '<div class="care-pagination-count">' + count + (count > 1 ? ' registro(s) encontrado(s)' : ' registro encontrado' ) + '</div>';

				footer += '<div class="care-pagination-content"><ul class="care-pagination">';
				if(page == 1)
					footer += '<li class="disabled"><span class="care-grid-btn-left">Anterior</span></li>';
				else
					footer += '<li><a class="care-grid-btn-left care-grid-paged" href="' + url + '" data-page="'+ (page - 1) +'">Anterior</a></li>';

				if (pageStart > 0){
					footer += '<li><a class="care-grid-paged" href="' + url + '" data-page="1">1</a></li>';
					footer += '<li><div class="care-grid-space">...</div></li>';
				}

				for (i = pageStart; i < pageEnd; i++) { 
					footer += arrPages[i];
				}

				if (pageEnd !== pages){
					footer += '<li><div class="care-grid-space">...</div></li>';
					footer += '<li><a class="care-grid-paged" href="' + url + '" data-page="' + pages + '">' + pages + '</a></li>';
				}

				if (page === pages)
					footer += '<li class="disabled"><span class="care-grid-btn-right">Próximo</span></li>';
				else
					footer += '<li><a class="care-grid-btn-right care-grid-paged" href="' + url + '" data-page="'+ (page + 1) +'">Próximo</a></li>';

				if (pages > 1){
					footer += '<li><div class="page-jump"><input type="text" id="care-grid-page-go"><input type="hidden" id="care-grid-total-page" value="' + pages + '"><button id="care-grid-button-go" class="care-grid-btn-right tool-button">Ir</button></div></li>';
				}

				footer += '</ul></div>';

				footer += '<div class="care-pagination-count">página ' + page + ' de ' + pages + '</div>';
				
				footer += '</td></tr></tfoot>';
				
				$table.append(footer);
			}
			
			var makeFieldName = function (name) {
	            if (defaults.fieldPrefix !== null && defaults.fieldPrefix !== "") {
	                return defaults.fieldPrefix + "." + name;
	            }
	            return name;
	        };

	        var makeFormName = function (name) {
	            if (defaults.className !== null && defaults.className !== "") {
	                return defaults.className + "-" + name;
	            }
	            return name;
	        };
			
			var setCurrentPage = function (currentPage) {
	            $("." + defaults.className + "-current-page", this).val(currentPage);
	        };
			
			var getCountColumnTable = function (){
				
				var $grid = $(this);
				var $table = $grid.find("table");
				var $td = $table.find("thead tr:nth-child(1) th");
				
				var colCount = 0;
				$td.each(function () {
					if ($(this).attr('colspan')) {
						colCount += +$(this).attr('colspan');
					} else {
						colCount++;
					}
				});

				return colCount;
			}
			
			var loading = function () {
	            var $loading = $("<div></div>").addClass("care-pagination-loading");

	            for (var i = 1; i <= 8; i++) {
	                $loading.append($("<div></div>")
	                    .addClass("care-pagination-loading-item")
	                    .addClass("care-pagination-loading-item-" + i)
	                );
	            }

	            return $loading;
	        };
			
			var load = function () {
			
				var $grid = $(this);
	            //var $form = $grid.data("form");
				var $formName = $grid.data("form") != "" ? $grid.data("form") : "-form";
				var $form = $(defaults.form).length ? $(defaults.form) : $("." + makeFormName($formName));
				var $formExportName = $grid.data("form-export") != "" ? $grid.data("form-export") : "-form-export";
				var $formExport = $(defaults.formExport).length ? $(defaults.formExport) : $("." + makeFormName($formExportName));
	            var $loading = $grid.data("loading");
	            var $message = $grid.data("message");
	            var $content = $grid.data("content");
				
				$loading.hide();
	            //$message.hide();
				
				var dataSerialize = serialize.call($form);
				
				$.ajax({
					type: $form.attr("method"),
					url: $form.attr("action"),
					data: dataSerialize,
					async: defaults.async,
					dataType: 'json',
					encode: true,
					beforeSend: function() {
							$loading.show();
							$.care.disableElement($("input,select,textarea,button", $form));
							$.care.disableElement($("a,input,select,textarea,button", $grid));
					},
					complete: function() {
							$.care.enableElement($("input,select,textarea,button", $form));
							$.care.enableElement($("a,input,select,textarea,button", $grid));
							$loading.hide();
							//$loading.css('margin-top', ($grid.offset().top + ($grid.height() - 100)));
							var $top = ($grid.height() * .9);
							$loading.css('margin-top', $top - $grid.offset().top);

							if ($.isFunction(defaults.complete)) {
								defaults.complete.call($form);
							}
					},
					success: function(data){
						if (data.success){
							$content.html(data.lista);
							pagination.call($grid, data.contador);
							if ($formExport.length != 0 && $(".care-grid-export-sql", $formExport).length != 0) {
								$("." + defaults.className + "-export-sql", $formExport).val(data.sql);
							}
						}
						else {
							$content.html(data.lista);
						}
					}
				});
			};
			
			return $(selector).each(function() {
				
				var $grid = $(this);
				var $loading = $(defaults.loading);
				//var $form = $(defaults.form).length ? $(defaults.form) : $("." + defaults.className + "-form");
				var $formName = $grid.data("form") != "" ? $grid.data("form") : "-form";
				var $form = $(defaults.form).length ? $(defaults.form) : $("." + makeFormName($formName));
				var $formExportName = $grid.data("form-export") != "" ? $grid.data("form-export") : "-form-export";
				var $formExport = $(defaults.formExport).length ? $(defaults.formExport) : $("." + makeFormName($formExportName));
				//var $formExport = $(defaults.formExport).length ? $(defaults.formExport) : $("." + defaults.className + "-formExport");
				var $content = $("<div></div>");
				
				if ($grid.data("url") === undefined) {
					throw new Error("Data url attribute is empty in grid");
				}
				
				if ($form.length === 0 && $("." + makeFormName($formName), $grid).length === 0) {
					$grid.prepend($("<form></form>").addClass(makeFormName($formName)));
					$form = $("." + makeFormName($formName), $grid);
				}
				
				if ($("." + defaults.className + "-current-page", $form).length === 0) {
					$form.prepend($("<input/>").attr("type", "hidden").attr("name", makeFieldName("CurrentPage"))
					.val(defaults.currentPage).addClass(defaults.className + "-current-page"));
				}

				if ($("." + defaults.className + "-page-size", $form).length === 0) {
					$form.prepend($("<input/>").attr("type", "hidden").attr("name", makeFieldName("PageSize"))
						.val(defaults.pageSize).addClass(defaults.className + "-page-size"));
				}

				if ($formExport.length === 0 && $("." + defaults.className + makeFormName($formExportName), $grid).length === 0) {
					$grid.prepend(
						$("<form></form>")
						.addClass(makeFormName($formExportName))
						.attr("action", $grid.data("export-url"))
						.attr("method", defaults.httpMethod));
					$formExport = $("." + makeFormName($formExportName), $grid);
				}
				
				if ($("." + defaults.className + "-export-action", $formExport).length === 0) {
					$formExport.prepend($("<input/>").attr("type", "hidden").attr("name", "acao")
					.val("xls").addClass(defaults.className + "-export-action"));
				}

				if ($("." + defaults.className + "-export-sql", $formExport).length === 0) {
					$formExport.prepend($("<input/>").attr("type", "hidden").attr("name", "sql")
						.addClass(defaults.className + "-export-sql"));
				}
				
				if ($("." + defaults.className + "-content", $grid).length === 0) {
					$content = $content.addClass(defaults.className + "-content");
					$grid.append($content);
				}
				
				if ($loading.length === 0 && $("." + defaults.className + "-loading", $grid).length === 0) {
	                $loading = $("<div></div>").addClass("care-pagination-loading");

	                for (var i = 1; i <= 8; i++) {
	                    $loading.append($("<div></div>")
	                        .addClass("care-pagination-loading-item")
	                        .addClass("care-pagination-loading-item-" + i)
	                    );
	                }

	                $grid.prepend($loading);

	                $loading = $(".care-pagination-loading", $grid);

	                $loading.css('margin-top', 30);
	                
	            }
				
				$form.attr("action", $grid.data("url"))
				.attr("method", defaults.httpMethod)
				.on((defaults.useForm ? "submit" : "send"), function (event) {
					event.preventDefault();
					setCurrentPage.call(this, 0);
					load.call($grid);
				});
				
				$grid.data("loading", $loading)
	                //.data("message", $message)
	                .data("content", $content)
	                .data("form", $form);
				
				$grid.bind("reload", function () {
					$form.trigger("submit");
				});
				
				if (!defaults.useForm) {
					$("input:text", $form).on("keypress", function(e) {
						if (e.which === 13) {
							$form.trigger("send");
						}
					});

					$(defaults.buttonSubmit, $form).on("click", function (e) {
						e.preventDefault();
						$form.trigger("send");
					});
				}

				$grid.on("click", "#care-grid-button-go", function(event) {
					
					var $pageGo = $("#care-grid-page-go");
					var $pageGoVal = parseInt($pageGo.val());
					var $totalPage = parseInt($("#care-grid-total-page").val());

					event.preventDefault();

					if (!isNaN($pageGoVal) && !isNaN($totalPage)) {

						$pageGoVal = (parseInt($pageGoVal) > parseInt($totalPage)) ? $totalPage : $pageGoVal;

						setCurrentPage.call($form, $pageGoVal);
						load.call($grid);	

					}
					$pageGo.val("");

				});

				$grid.on("click", ".care-pagination li a", function(event) {
					var $link = $(this);

					event.preventDefault();
					
					if (!$link.is(".disabled") && !$link.parents("li:first").is(".disabled") && !$link.parents().hasClass("active")) {
						setCurrentPage.call($form, $link.data("page"));
						load.call($grid);
					}
				});
				
				if (defaults.load) {
					load.call($grid);
				}

				return $grid;

			});
		};
		
		$.care.grid.defaultOptions = {
	        className: "care-grid",
	        loading: null,
			//sizePagination: $(selector).data("pagination-size"),
	        httpMethod: "POST",
	        useForm: true,
	        pageSize: 5
	    }

	} catch(e) {
		alert(e.name + " " + e.message)
	}

}(window.jQuery, window));