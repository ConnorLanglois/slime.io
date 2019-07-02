function GUIPause() {
	GUIPause.prototype.update = update;
	GUIPause.prototype.render = render;

	this.guiButtonBack = new GUIButton('Back', clientWidth / 2 - clientWidth / 5 / 2, clientHeight / 5, clientWidth / 5, clientHeight / 10, function () {
		 guiCurrent = guiPrevious;
		 guiCurrent.isPaused = false;
	});
	this.guiButtonQuit = new GUIButton('Quit', clientWidth / 2 - clientWidth / 5 / 2, clientHeight / 3, clientWidth / 5, clientHeight / 10, function () {
		guiCurrent = new GUIMainMenu();
		scores = [0, 0];
	});

	function update() {
		this.guiButtonBack.update();
		this.guiButtonQuit.update();
	}

	function render() {
		guiPrevious.render();
		this.guiButtonBack.render();
		this.guiButtonQuit.render();
	}
}
