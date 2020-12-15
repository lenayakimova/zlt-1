/* Отсчет количества введенных символов*/

test.oninput = test.onkeyp = test.onchange = function () {
	var len = this.value.length;
	if (len > this.max) {
		this.value = this.value.substr(0, this.max);
		return false;
	}
	document.getElementById('max-' + this.id).innerHTML = 'Осталось: ' + (+this.max - len) + ' символов';
};

comment.oninput = comment.onkeyp = comment.onchange = function () {
	const max = +this.getAttribute("max"); // ключевой момент 
	var lin = this.value.length;
	if (lin > max) {
		this.value = this.value.substr(0, max);
		return false;
	}
	document.getElementById("max-" + this.id).innerHTML =
		`Осталось: ${max - lin}  символов`;
	// "Осталось: " + (max - lin) + " символов";
};

/* Проверка на заполненность полей*/

$('[name="title"]').on("blur", function () {
	if ($(this).val().length < 10) {
		$(this).attr('style', 'border: 1px solid #CC0000;');
	} else {
		$(this).attr('style', 'border: 1px solid #D9D9D9;');
	}
});

$('[name="comment"]').on("blur", function () {
	if ($(this).val().length < 10) {
		$(this).attr('style', 'border: 1px solid #CC0000;');
	} else {
		$(this).attr('style', 'border: 1px solid #D9D9D9;');
	}
});

$('[name="spec"]').on("blur", function () {
	if ($(this).val().length < 10) {
		$(this).attr('style', 'border: 1px solid #CC0000;');
	} else {
		$(this).attr('style', 'border: 1px solid #D9D9D9;');
	}
});

$('[name="pro"]').on("blur", function () {
	if ($(this).val().length < 3) {
		$(this).attr('style', 'border: 1px solid #CC0000;');
	} else {
		$(this).attr('style', 'border: 1px solid #D9D9D9;');
	}
});


/* Скрытые блоки*/

$(document).ready(function () {
	$(".btn").click(function () {
		$(".deliv-block-2").slideToggle();
	});
});

$(document).ready(function () {
	$(".btn-2").click(function () {
		$(".politics-2").slideToggle();
	});
});

/* Фиксированное меню*/

jQuery("document").ready(function ($) {

	var nav = $('.tabs-menu');

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	});

});

var sections = $('.section'),
	nav = $('.tabs-menu'),
	nav_height = nav.outerHeight();

$(window).on('scroll', function () {
	var cur_pos = $(this).scrollTop();

	sections.each(function () {
		var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();

		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			sections.removeClass('active');

			$(this).addClass('active');
			nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
		}
	});
});

nav.find('a').on('click', function () {
	var $el = $(this),
		id = $el.attr('href');

	$('html, body').animate({
		scrollTop: $(id).offset().top - nav_height
	}, 1000);

	return false;
});

/* Блокировка полей*/

$(document).ready(function () {

	$("#checkbox").click(function () {
		$("#pro").attr("disabled", this.checked);
	});
});

$(document).ready(function () {
	$("disabled").attr('style', 'background-color: #D9D9D9;');
});

$(document).ready(function () {

	$("#check").click(function () {

		$("#prog").attr("disabled", this.checked);
	});
});

$(document).ready(function () {

	$("#checkboxes").click(function () {

		$("#number").attr("disabled", this.checked);
	});
});

$(document).ready(function () {

	$("#checkbox2").click(function () {

		$("#place").attr("disabled", this.checked),
		$("#place2").attr("disabled", this.checked);
	});
});


 function up(e) {
 	if (e.value.indexOf(".") != '-1') {
 		e.value = e.value.substring(0, e.value.indexOf(".") + 3);
 }
}



/* Бургер меню*/
function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.burger-menu__button');
	let links = menu.find('.burger-menu__link');
	let overlay = menu.find('.burger-menu__overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu();
	});

	links.on('click', () => toggleMenu());
	overlay.on('click', () => toggleMenu());

	function toggleMenu() {
		menu.toggleClass('burger-menu_active');
		if (menu.hasClass('burger-menu_active')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', 'visible');
		}
	}
}

burgerMenu('.burger-menu');









