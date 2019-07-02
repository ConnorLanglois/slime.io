const keyUp = [87, 38];
const keyLeft = [65, 37];
const keyRight = [68, 39];

var ctx;
var clientWidth = 500;
var clientHeight = 300
var groundHeight = clientHeight / 10;

var guiCurrent;
var guiPrevious;
var guiMainMenu;

var net;
var ball;
var slimes;

var scores = [0, 0];

var inputMap = {};

var onMouseDown = onKeyDown = onMouseUp = onKeyUp = function (e) {
	if (e.button != undefined && !inputMap[e.button] || e.type == 'mouseup') {
		inputMap[e.button] = e.type == 'mousedown' ? [e.clientX, e.clientY] : false;
	} else {
		inputMap[e.keyCode] = e.type == 'keydown';
	}
}

main();

function main() {
	init();

	setInterval(run, 1000 / 60);
}

function init() {
	var canvas = document.createElement('canvas');

	canvas.id = 'canvas';
	canvas.tabIndex = 1;
	canvas.width = clientWidth;
	canvas.height = clientHeight;
	canvas.style = 'border: 1px solid #000000';

	ctx = canvas.getContext('2d');

	document.body.appendChild(canvas);

	document.getElementById('canvas').addEventListener('keydown', onKeyDown);
	document.getElementById('canvas').addEventListener('keyup', onKeyUp);
	document.getElementById('canvas').addEventListener('mousedown', onMouseDown);
	document.getElementById('canvas').addEventListener('mouseup', onMouseUp);

	guiCurrent = new GUIMainMenu();
}

function run() {
	update();
	render();
}

function update() {
	guiCurrent.update();
}

function render() {
	ctx.clearRect(0, 0, clientWidth, clientHeight);

	guiCurrent.render();
}
