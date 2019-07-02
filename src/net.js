function Net() {
	Net.prototype.render = render;

	this.width = clientWidth / (500 / 6);
	this.height = clientHeight / (300 / 50);
	this.pos = [clientWidth / 2 - this.width / 2, clientHeight - groundHeight - this.height];

	function render() {
		ctx.fillStyle = 'white';

		ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
	}
}
