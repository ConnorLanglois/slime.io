function Ball() {
	Ball.prototype.update = update;
	Ball.prototype.render = render;

	this.pos = [clientWidth / 2 + (Math.random() < 0.5 ? -clientWidth / 4 : clientWidth / 4), (clientHeight - groundHeight) / 2];
	this.r = (clientWidth + clientHeight) / 100;
	this.velX = 0;
	this.velY = 0;
	this.accelY = 0.15 * (clientHeight / 300);
	this.e = 0.7;

	function update() {
		if (this.pos[1] + this.r == clientHeight - groundHeight) {
			scores[+(this.pos[0] < clientWidth / 2)] += 1;

			guiCurrent.setup();
		}

		var distance;
		
		this.velY += this.accelY;

		for (slime of slimes) {
			distance = Math.sqrt(Math.pow(this.pos[0] - slime.pos[0], 2) + Math.pow(this.pos[1] - slime.pos[1], 2));

			if (distance - (Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) + Math.sqrt(Math.pow(slime.velX, 2) + Math.pow(slime.velY, 2))) / 2 <= this.r + slime.r /* && distance >= this.r + slime.r - Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2)) - Math.sqrt(Math.pow(slime.velX, 2) + Math.pow(slime.velY, 2)) */ && this.pos[1] - slime.pos[1] < 0 && this.velY > 0) {
				let theta = this.pos[0] - slime.pos[0] > 0 ? Math.atan((this.pos[1] - slime.pos[1]) / (this.pos[0] - slime.pos[0])) : this.pos[0] - slime.pos[0] < 0 ? Math.atan((this.pos[1] - slime.pos[1]) / (this.pos[0] - slime.pos[0])) + Math.PI : -Math.PI / 2;

				this.velX = 6 * Math.cos(theta) + this.e * slime.velX;
				this.velY = 6 * Math.sin(theta) + this.e * slime.velY;

				break;
			}
		}

		if (this.pos[0] >= net.pos[0] && this.pos[0] <= net.pos[0] + net.width && this.pos[1] + this.r >= net.pos[1] && this.velY > 0) {
			this.velY = -this.e * this.velY
		} else if ((this.pos[0] + this.r >= net.pos[0] && this.pos[0] + this.r <= net.pos[0] + net.width / 4 + this.velX && this.velX > 0 || this.pos[0] - this.r <= net.pos[0] + net.width && this.pos[0] - this.r >= net.pos[0] + net.width - net.width / 4 + this.velX && this.velX < 0) && this.pos[1] + this.r >= net.pos[1]) {
			this.velX = -this.e * this.velX;
		}

		this.pos[0] = Math.max(this.r, Math.min(this.pos[0] + this.velX, clientWidth - this.r));
		this.pos[1] = Math.max(this.r, Math.min(this.pos[1] + this.velY, clientHeight - groundHeight - this.r));
		this.velX = this.pos[0] - this.r <= 0 || this.pos[0] + this.r >= clientWidth ? -this.velX : this.pos[1] + this.r >= clientHeight - groundHeight ? 0 : this.velX;
		this.velY = this.pos[1] - this.r <= 0 ? -this.velY : this.pos[1] + this.r >= clientHeight - groundHeight ? 0 : this.velY;
	}

	function render() {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI);

		ctx.fillStyle = 'yellow';

		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}
