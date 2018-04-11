$(function() {
	var count = 0;
	var order = [];
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
		function randomsort(a, b) {  
        return Math.random()>0.5 ? -1 : 1;}  
		var arr = [0,1,2,3,4];
		order = [];
		var index = arr.sort(randomsort);
		_.times(5,function(i){order[i]=String.fromCharCode(index[i] + 65)});
		console.log(order);
		$('#info-bar').html('<div>'+order+'</div>');
		var callbacks=[];
		for (var i = 0; i < 4; i++) {
			(function(i) {
				callbacks[i] = function(err) {
					console.log(String.fromCharCode(index[i+1] + 65));
					setRandomNum($(circles[index[i+1]]), callbacks[i+1]);
				};
			})(i);
		}
		callbacks[4] = function(){add();};
		console.log(String.fromCharCode(index[0] + 65));
		setRandomNum($(circles[index[0]]), callbacks[0]);
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
		$('#info-bar').html($('#info-bar').html()+'<div>'+sum+'<div>').removeClass('abled').addClass('disabled');
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
				if(callback) callback(null);
			}
		});
	}
});