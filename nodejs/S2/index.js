$(function() {
	var count = 0;
	$('#button').mouseenter(function(event) {
		event.stopPropagation();
		setUnreadHide();
		setInfobarDisable();
		setButtonAble();
		listenApb();
		count = 0;
	});

	function listenApb() {
		$('.apb').unbind('click').bind('click',handleApbClick);
	}

	function handleApbClick(event) {
		event.stopPropagation();
		var circles = $.makeArray($('.circle'));
		var callbacks = [];
		for (var index = 0; index < 4; index++) {
			(function(index) {
				callbacks[index] = function(err) {
					setRandomNum($(circles[index+1]), callbacks[index+1]);
				};
			})(index);
		}
		callbacks[4] = function(){add();};
		setRandomNum($(circles[0]), callbacks[0]);
	}

	function setButtonAble() {
		$('.circle').unbind('click').bind('click', handleClick).removeClass('disabled').addClass('abled');
	}

	function setButtonDisable() {
		$('.circle').unbind('click').removeClass('abled').addClass('disabled');
	}

	function setUnreadHide(){
		$('.unread').hide();
	}

	function setInfobarDisable() {
		$('#info-bar').text('').unbind('click').removeClass('abled').addClass('disabled');
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

	function handleClick(event) {
		setRandomNum(event.target,null);
	}

	function setRandomNum(target,callback) {
		var span = $(target).children();
		span.show().text('...');
		setButtonDisable();
		$(target).removeClass('disabled').addClass('abled');
		$('#info-bar').removeClass('abled').addClass('disabled').unbind('click');
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
				if(callback) callback(null);
			}
		});
	}
});