function Slime(player, keyUp, keyLeft, keyRight, isBot = true) {
	Slime.prototype.update = update;
	Slime.prototype.render = render;

	this.player = player;
	this.keyUp = keyUp;
	this.keyLeft = keyLeft;
	this.keyRight = keyRight;
	this.isBot = isBot;

	this.pos = [clientWidth / 2 + player * clientWidth / 4, clientHeight - groundHeight];
	this.r = (clientWidth + clientHeight) / 20;
	this.velX = 0;
	this.velY = 0;
	this.accelY = 0.3 * (clientHeight / 300);

	function update() {
		if (!this.isBot) {
			if (inputMap[this.keyUp] && this.pos[1] == clientHeight - groundHeight) {
				this.velY = -5;
			}

			if (!(inputMap[this.keyLeft] && inputMap[this.keyRight])) {
				if (inputMap[this.keyLeft]) {
					this.velX = -2;
				} else if (inputMap[this.keyRight]) {
					this.velX = 2;
				} else {
					this.velX = 0;
				}
			}
		} else if (ball.pos[0] > net.pos[0] + net.width) {
			let randomVelX = Math.random() * 3 + 2;
			let randomYMult = Math.random() * 4 + 2;

			this.velX = this.pos[0] - ball.pos[0] <= 0 ? randomVelX : -randomVelX;
			this.velY = this.pos[1] - ball.pos[1] <= randomYMult * this.r / 2 && this.pos[1] == clientHeight - groundHeight ? -5 : this.velY;
		}

		this.pos[0] = Math.max(this.player == -1 ? this.r : net.pos[0] + net.width + this.r, Math.min(this.pos[0] + this.velX, this.player == -1 ? net.pos[0] - this.r : clientWidth - this.r));
		this.pos[1] = Math.max(this.r, Math.min(this.pos[1] + this.velY, clientHeight - groundHeight));
		this.velY = this.pos[1] != clientHeight - groundHeight ? this.velY + this.accelY : 0;
	}

	function render() {
		const eyeR = this.r / 5;
		const eyeX = this.pos[0] - this.player * (this.r - 17);
		const eyeY = this.pos[1] - eyeR - this.r / 5;
		const pupilR = 0.6 * eyeR;

		const theta = ball.pos[0] - eyeX > 0 ? Math.atan((ball.pos[1] - eyeY) / (ball.pos[0] - eyeX)) : ball.pos[0] - eyeX < 0 ? Math.atan((ball.pos[1] - eyeY) / (ball.pos[0] - eyeX)) + Math.PI : -Math.PI / 2;

		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI, true);

		ctx.fillStyle = this.player == -1 ? 'red' : 'lime';

		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(eyeX, this.pos[1] - eyeR - this.r / 5, eyeR, 0, 2 * Math.PI, true);

		ctx.fillStyle = '#FFFFFF';
		ctx.strokeStyle = this.player == -1 ? 'red' : 'lime';

		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(eyeX + Math.cos(theta) * (eyeR - (pupilR + 1)), this.pos[1] - pupilR - 1.4 * eyeR + Math.sin(theta) * (eyeR - (pupilR + 1)), pupilR, 0, 2 * Math.PI, true);

		ctx.fillStyle = '#000000';
		ctx.strokeStyle = '#FFFFFF';

		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}
