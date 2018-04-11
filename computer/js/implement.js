/*将算式以字符串相加的形式保存并更新显示*/
function operate(op) {
	/*保留上一次的计算结果*/
	if(document.getElementById('result').value != "" && document.getElementById('equ').value == "")
		document.getElementById('equ').value = document.getElementById('result').value;
	document.getElementById('equ').value = document.getElementById('equ').value + op;
}

/*清除当前算术表达式*/
function clearall() {
	document.getElementById('equ').value = "";
	document.getElementById('result').value = "";
}

/*清除前一字符串*/
function stepback() {
	document.getElementById('result').value = "";
	var str = document.getElementById('equ').value;
	var n = str.length;
	document.getElementById('equ').value = str.substring(0,n-1);
}
/*判断输入算式是否有效，并处理错误*/
function compute() {
	document.getElementById('result').value = document.getElementById('equ').value;
	var str = String(document.getElementById('result').value);
	try {
		if(document.getElementById('result').value = eval(str)) {
			document.getElementById('equ').value = "";
		}
		else throw(error);
	} catch(error) {
		alert(error);
		document.getElementById('equ').value = "";
		document.getElementById('result').value = "";
	}
}

