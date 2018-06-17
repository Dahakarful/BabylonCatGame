var Player = function (game) {
	GameObject.call(this, "player", game);
 
  this.scene = game.scene;
 	this.camera = game.scene.getCameraByName("camera");
 	this.camera.setTarget(new BABYLON.Vector3(0, 0, -20));
  this.camera.checkCollisions = true;
  this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

	this.fly = [0];
	this.rotationsY = [0,0];
	this.rotationsX = [0,0];
	this.power = 1;
  this.count = 0

	var _this = this;
 	this.getScene().registerBeforeRender(function() {
 		_this.move();
    if (_this.game.scene.getNodeByName("cat").intersectsPoint(_this.camera.position)){
      _this.count += 1;
      console.log("Touché " + _this.count + " fois");
    }
 	});

	// https://css-tricks.com/snippets/javascript/javascript-keycodes/
 	window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 39: // right
        _this.rotationsY[0] = 1;
        break;
      case 37: // left
        _this.rotationsY[1] = 1;
        break;
      case 38://bot:
        _this.rotationsX[0] = 1;
        break;
      case 40://top:
        _this.rotationsX[1] = 1;
        break;
      case 32://space
      	_this.power = 1;
      	_this.fly[0] = 1;
        break;
    }
  });

  window.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 39: // right
      case 37: // left
        _this.rotationsY = [0,0];
        break;
      case 38://bot:
      case 40://top:
        _this.rotationsX = [0,0];
        break;
      case 32://space
      	_this.fly[0] = 0;
      	break;
      case 13://enter
      	var cat =  game.scene.getNodeByName("cat");
      	_this.camera.setTarget(cat.position);
      	break;
    }
  });

  window.addEventListener("click", function (e) {	    
    var bullet = BABYLON.Mesh.CreateSphere('bullet', 3, 0.3, game.scene);
    var startPos = _this.camera.position;
    
    bullet.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
    bullet.material =  new BABYLON.StandardMaterial('texture1', game.scene);
    bullet.material.diffuseColor = new BABYLON.Color3(3, 2, 0);
    bullet.checkCollisions = true;

    var invView = new BABYLON.Matrix();
    _this.camera.getViewMatrix().invertToRef(invView);
    var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);
    
    direction.normalize();
      
    game.scene.registerBeforeRender(function () {
        bullet.position.addInPlace(direction);
        if (_this.game.scene.getNodeByName("cat").intersectsPoint(bullet.position)){
          _this.count += 1;
          console.log("Touché " + _this.count + " fois");
        }
    });
  });
};

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function() {
  if (this.rotationsX[0] != 0) {
    this._rotateXTo(-0.05);
  }
  if (this.rotationsX[1] != 0) {
    this._rotateXTo(0.05);
  }
  if (this.rotationsY[0]  != 0) {
    this._rotateYTo(0.05);
  }
  if (this.rotationsY[1]  != 0) {
    this._rotateYTo(-0.05);
  }
  if (this.fly[0] != 0) {
	if (this.power>0)  {
  		var direction = this.camera.getTarget().subtract(this.camera.position).multiplyByFloats(this.power, this.power, this.power);
  		this.camera.position = this.camera.position.add(direction);
	}
	this.power -= 0.01; 
  }
};

Player.prototype._rotateYTo = function(s) {
  this.camera.rotation.y += s;
};

Player.prototype._rotateXTo = function(s) {
  this.camera.rotation.x += s;
};