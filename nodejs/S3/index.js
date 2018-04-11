	var count = 0;
	$(function() {
	$('#button').mouseenter(function(event) {
		setUnreadHide();
		setInfobarDisable();
		$('.circle').removeClass('disabled').addClass('abled').unbind('click').bind('click', handleClick);
		listenApb();
		count = 0;
	});
});
	function setUnreadHide(){
		$('span').hide();
	}

	function setInfobarDisable() {
		$('#info-bar').text('').unbind('click').removeClass('abled').addClass('disabled');
	}

	function setRandomNum(target,callback) {
		var span = $(target).children();
		span.show().text('...');
		setButtonDisable();
		$(target).removeClass('disabled').addClass('abled');
		$('#info-bar').removeClass('abled').addClass('disabled').unbind('click', add);
		$.post('/', function(data, status) {
			if (status == 'success') {
				setButtonAble();
				$(target).unbind('click', handleClick).removeClass('abled').addClass('disabled');
				$(target).children().text(data);
				console.log(data);
				count++;
				if (count >= 5) {
					showSum();
				}
				if(callback) callback(null,count);
			}
		});
	}

	function handleClick(event) {
		setRandomNum(event.target,null);
	}

	function handleApbClick(event) {
		event.stopPropagation();
		count = 0;
		event.stopPropagation();
		var circles = $.makeArray($('.circle'));
		function callback(err,num) {
			if(num==5) add();
		}
		for (var index = 0; index < 5; index++) {
			(function(index) {
				setRandomNum($(circles[index]), callback);
		})(index);
	}
}

	function setButtonDisable() {
		$('.circle').unbind('click').removeClass('abled').addClass('disabled');
	}

	function add(event) {
		var sum = 0;
		for (var i = 1; i <= 5; i++) {
			sum += parseInt($('.circle:nth-child('+i+')').children().text());
		}
		$('#info-bar').text(sum).removeClass('abled').addClass('disabled');
		setButtonAble();
	}

	function showSum() {
		$('#info-bar').removeClass('disabled').addClass('abled').unbind('click').bind('click', add);
	}

	
	function setButtonAble() {
		$('.circle').unbind('click').bind('click', handleClick).removeClass('disabled').addClass('abled');
	}

	function listenApb() {
		$('.apb').unbind('click').bind('click',handleApbClick);
	}