function GUIMainMenu() {
	GUIMainMenu.prototype.update = update;
	GUIMainMenu.prototype.render = render;

	this.guiGame = new GUIGame();
	
	this.guiButtonBot = new GUIButton('1P', clientWidth / 4 - clientWidth / 10, clientHeight / 2, clientWidth / 5, clientHeight / 10, function () {
		guiCurrent = new GUIGame();
	});
	this.guiButtonMultiplayer = new GUIButton('2P', 3 * clientWidth / 4 - clientWidth / 10, clientHeight / 2, clientWidth / 5, clientHeight / 10, function () {
		guiCurrent = new GUIGame(false);
	});

	function update() {
		this.guiButtonBot.update();
		this.guiButtonMultiplayer.update();
	}

	function render() {
		var title = 'Slime Volleyball';

		this.guiGame.render();

		ctx.fillStyle = 'white';
		ctx.font = 'bold 30px Arial';

		ctx.fillText(title, clientWidth / 2 - ctx.measureText(title).width / 2, clientHeight / 4);

		this.guiButtonBot.render();
		this.guiButtonMultiplayer.render();
	}
}
