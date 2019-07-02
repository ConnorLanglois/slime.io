function GUIGame(isBot = true) {
	GUIGame.prototype.setup = setup;
	GUIGame.prototype.update = update;
	GUIGame.prototype.render = render;

	this.isBot = isBot;

	this.isPaused = false;

	this.guiButtonPause = new GUIButton('||', clientWidth / 2 - clientWidth / 12 / 2, 0, clientWidth / 12, clientHeight / 8, function () {
		this.isPaused = !this.isPaused;
		guiPrevious = guiCurrent;
		guiCurrent = new GUIPause();
	}.bind(this));

	this.setup();

	function setup() {
		net = new Net();
		ball = new Ball();
		slimes = [new Slime(-1, keyUp[0], keyLeft[0], keyRight[0], false), new Slime(1, keyUp[1], keyLeft[1], keyRight[1], this.isBot)];
	};

	function update() {
		this.guiButtonPause.update();

		if (!this.isPaused) {
			ball.update();

			for (slime of slimes) {
				slime.update();
			}
		}
	}

	function render() {
		ctx.beginPath();
		ctx.rect(0, 0, clientWidth, clientHeight);	

		ctx.fillStyle = 'blue';
		
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.rect(0, clientHeight - groundHeight, clientWidth, clientHeight);	

		ctx.fillStyle = 'gray';
		
		ctx.fill();
		ctx.closePath();

		this.guiButtonPause.render();

		for (var i = 0; i < scores.length; i++) {
			if (slimes[i] != undefined) {
				ctx.font = 'bold 30px Arial';
				ctx.fillStyle = slimes[i].player == -1 ? 'red' : 'lime';
				ctx.fillText(scores[i], clientWidth / 2 * (slimes[i].player + 1) + (slimes[i].player == 1 ? -ctx.measureText(scores[i]).width - 5 : 5), 30);
			}
		}

		ball.render();
		net.render();

		for (slime of slimes) {
			slime.render();
		}
	}
}
