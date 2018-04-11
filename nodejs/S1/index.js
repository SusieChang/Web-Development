$(function() {
	var count = 0;
	$('#button').mouseenter(function(event) {
		event.stopPropagation();
		setUnreadHide();
		setInfobarDisable();
		setButtonAble();
		count = 0;
	});

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
		var span = $(event.target).children();
		span.show().text('...');
		setButtonDisable();
		$(event.target).removeClass('disabled').addClass('abled');
		$('#info-bar').removeClass('abled').addClass('disabled').unbind('click', add);
		$.post('/', function(data, status) {
			if (status == 'success') {
				setButtonAble();
				$(event.target).unbind('click', handleClick).removeClass('abled').addClass('disabled');
				$(event.target).children().text(data);
				console.log(data);
				count++;
				if (count >= 5) {
					showSum();
				}
			}
		});
	}
});