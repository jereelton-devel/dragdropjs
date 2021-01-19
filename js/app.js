$(document).ready(function(){
	
	try {
	
		$("[data-control=\"grid\"]").each(function () {

			var $grid = $(this);
			var options = {
				form: $grid.data("form") || "grid-filter",
				load: true,
				fieldPrefix: $grid.data("field-prefix") || "Filter",
				pageSize: $grid.data("page-size") || 20,
				sizePagination: $grid.data("pagination-size") || 5,
			};

			if ($grid.data("load") !== undefined) {
				options.load = $grid.data("load") === "true";
			}

			$.care.grid($grid, options);
			
		});

		$(".date, .dateNotpicker").mask("99/99/9999");
		$(".cnpj").mask("99.999.999/9999-99");
		$(".cpf").mask("999.999.999-99");
		$(".phone").focusout(function () {
			var element = $(this);
			element.unmask();
			var phone = element.val().replace(/\D/g, '');
			if (phone.length > 10) {
				element.mask("(99) 99999-999?9");
			} else {
				element.mask("(99) 9999-9999?9");
			}
		}).trigger("focusout");

		$(".numeric").on("keydown", function (event) {
			if (!(event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 13)) {
				if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
					event.preventDefault();
				}
			}
		});


	}
    catch(e) {
        alert(e.name + " " + e.message)
    }
	
});