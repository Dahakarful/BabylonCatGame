var Cat = function (game) {
	GameObject.call(this, "cat", game);
 
	var vertexData = BABYLON.VertexData.CreateSphere(1, BABYLON.Mesh.DEFAULTSIDE);
	vertexData.applyToMesh(this);
	vertexData.checkCollisions = true;
	
	this.startTime = new Date().getTime();
	this.lastTime = new Date().getTime();
	this.deltaTime = 0;

	this.chooseDirection();

	var _this = this;
 	this.getScene().registerBeforeRender(function() {
 		_this.move();
 	});
};

Cat.prototype = Object.create(GameObject.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.chooseDirection = function() {
	this.speedRandom = Math.random();
	// this.speed = (this.speedRandom>0.85 ? (this.speedRandom<0.25 ? 0.02 : 0.025) : 0.35);
	this.speed = 0.02;
	this.signX = (Math.random() >0.75 ? -1 : 1);
	this.moveX = Math.random() * this.speed;
	this.signY = (Math.random() >0.75 ? -1 : 1);
	this.moveY = Math.random() * this.speed;
	this.signZ = (Math.random() >0.75 ? -1 : 1);
	this.moveZ = Math.random() * this.speed;
}

Cat.prototype.move = function() {
	this.deltaTime = this.lastTime - this.startTime;
	// change de direction toutes les 5 secondes
	if (this.deltaTime >= 5000) {
		this.chooseDirection();
		this.startTime = new Date().getTime();
	}
	                                               
	this.position.x += this.moveX;
	this.position.y += this.moveY;
	this.position.z += this.moveZ;

	this.lastTime = new Date().getTime();
};