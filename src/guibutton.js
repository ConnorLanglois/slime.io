function GUIButton(text, x, y, width, height, callback) {
	GUIButton.prototype.update = update;
	GUIButton.prototype.render = render;

	this.text = text;

	this.pos = [x, y];
	this.width = width;
	this.height = height;

	this.callback = callback;

	function update() {
		if (inputMap[0] && inputMap[0][0] >= this.pos[0] && inputMap[0][0] <= this.pos[0] + this.width && inputMap[0][1] >= this.pos[1] && inputMap[0][1] <= this.pos[1] + this.height) {
			this.callback();
		}
	}

	function render() {
		ctx.fillStyle = 'white';

		ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);

		ctx.fillStyle = 'black';
		ctx.font = 'bold 30px Arial';

		ctx.fillText(this.text, this.pos[0] + this.width / 2 - ctx.measureText(this.text).width / 2, this.pos[1] + 27);
	}
}
