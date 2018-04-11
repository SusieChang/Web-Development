var Mole = {
	'count' : 30,
	'sign' : 0,
	'random' : 0,
	'pause': 0
};
	
$(document).ready(function(){
	//创建moles
	_.times(60,function() {
		var map = $("#map");
		var hole = document.createElement("div");	
		map.append(hole);
		$("#map div").addClass("white");
	});
	var grid = $(".white");
	var current_time = $("#Time");
	var current_score = $("#Score");
	var state = $("#state");
//绑定事件
	$("#change").click(changeState);
	$("#pause").click(pauseGame);
	$("#map div").bind('click',hit);
//按钮改变状态
	function changeState(){
		_.times(grid.length,function() {
			grid.find("div").removeClass("black").addClass("white");});
		if(Mole.sign == '0' && Mole.pause == '0') {
			startGame();
		} else {endGame();} 
		}

//开始游戏
	function startGame() {
		state.val("Playing");
		Mole.random =_.random(0,59);
		grid.eq(Number(Mole.random)).removeClass("white").addClass("black");
		Mole.count = 30;
		Mole.pause = 0;
		Mole.sign = 1;
		time = setInterval(timeCount,1000);
		current_time.val(Mole.count);
	}
//结束游戏
	function endGame() {
		grid.eq(Mole.random).removeClass("black").addClass("white");
		window.clearInterval(time);
		alert("Game Over.\nYour Score: "+ current_score.val());
		state.val("Game Over");
		Mole.count = 30;
		Mole.sign = 0;
		Mole.pause = 0;
		current_score.val(0);
		current_time.val(30);
	}
//暂停游戏
	function pauseGame() {
		if(Mole.pause == '0') {
			window.clearInterval(time);
			state.val("Pause");
			Mole.pause = 1;
			Mole.sign = 0;
		} else {
			time = setInterval(timeCount,1000);
			state.val("Playing");
			Mole.pause = 0;
			Mole.sign = 1;
		}
	}
//打地鼠
	function hit() {
		if(Mole.sign == 1) {
			if(this == grid[Mole.random]) {
			current_score.val(Number(current_score.val()) + 1);
			$(this).removeClass("black").addClass("white");
			Mole.random = _.random(0,59);
			grid.eq(Mole.random).removeClass("white").addClass("black");
		} else {
			current_score.val(Number(current_score.val()) - 1);
		}
		}
	}
//定时器
	function timeCount() {
		current_time.val(Mole.count);
		if(Mole.count > 0) {
			Mole.count=Mole.count-1;
		} else {
			endGame();
		}
	}
});