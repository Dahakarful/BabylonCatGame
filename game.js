var Game = function(canvasId) {
	var canvas = document.getElementById(canvasId);
	this.engine = new BABYLON.Engine(canvas, true);
	this.scene = this._initScene(this.engine);
	this.scene.collisionsEnabled = true;
	this.player = null;
	this.cat = null;
	this._initGame();

	var _this = this;
	this.engine.runRenderLoop(function () {
		_this.scene.render();
	});
};

Game.prototype._initScene = function(engine) { 
	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0,-2,-10), scene);
	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0), scene);
	light.intensity = 1;
    
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:4096.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
	skybox.checkCollision = true;
	
	return scene;
};

Game.prototype._initGame = function() {
	this.player = new Player(this);
	this.cat = new Cat(this);
};