var myCar;
var myBullets = [];
var myTargets = [];
var targetAmount = 4;
var reloadTime = 60;
var reloadTimer = 0;
var canShoot = true;

function startGame(){
    myGameArea.start();
    myCar = new car(30,50, "#015708" , 100,100);
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.turnSpeedBackground = 0;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    background : function(){
        this.context.fillStyle = "green";
        this.context.translate(this.x + this.width/2,this.y + this.height/2);
        this.angle = this.turnSpeedBackground;
        this.context.rotate(this.angle * Math.PI/180);
        this.context.translate(-(this.x + this.width/2), -(this.y + this.height/2));
        this.context.fillRect(0,0, this.canvas.width * 5, this.canvas.height * 5);
    }
}

function car(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.turnSpeed = 0;
    this.x = x;
    this.y = y;
   
    this.update = function(){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fillRect(this.width / -2 + (this.width/2 - this.width/ 6), this.height / -2 - (this.height/8), this.width/ 3 , this.height * 0.75);
        ctx.restore();  
    }
    this.move = function(){
        this.angle += this.turnSpeed * Math.PI /180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.shoot = function(){
        console.log("Shoot");
        myBullets.push(new bullet(10,10,this.x, this.y, this.angle));
    }
    
}

function bullet(width, height, x,y, angle){
    this.width = width;
    this.height = height;
    this.speed = 20;
    this.angle = angle;
    this.x = x;
    this.y = y;

    this.update = function(){
        ctx  =myGameArea.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc((this.width / -2) + 5, (this.height / -2)-  30, this.width/3, 0,2 * Math.PI);
        ctx.fillStyle = "grey";
        ctx.fill()
        //ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.move = function(){
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function target(width, height, x ,y, angle){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.update = function(){
        ctx =  myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/3, 0,2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill()
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function spawnTargets(){
    console.log("test1");
    for(let i =0; i<targetAmount; i++){
        console.log("test" + i + Math.random()*400);
        myTargets.push(new target(30,30, Math.random() * 400, Math.random() * 400,Math.random()*360));
    }
}


function getDist(X1,Y1,X2,Y2){
    var a = X1 - X2;
    var b = Y1 - Y2;
    var c = Math.sqrt((a*a)+(b*b));
    return c;
}

for(let i = 0; i < myBullets.length; i++){
    for(let j =0; j<myTargets.length; j++){
            if(getDist())
    }
}


function updateGameArea(){
    myGameArea.clear();
    myCar.speed = 0;
    myCar.turnSpeed = 0;
    reloadTimer +=1;
    if (myGameArea.keys && myGameArea.keys[37]) {myCar.turnSpeed = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myCar.turnSpeed = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myCar.speed = 1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myCar.speed = -1; }  
    if (myGameArea.keys && myGameArea.keys[32]) {
        if(reloadTimer > reloadTime) {
            myCar.shoot(); 
            reloadTimer = 0;
        }
    }
    
    myCar.move();
    myCar.update();
    if (myBullets.length > 0){
        for (let i =0; i< myBullets.length; i++){
            myBullets[i].update();
            myBullets[i].move();
        }
    }

    if (myTargets.length > 0){
        for (let i =0; i< myTargets.length; i++){
            myTargets[i].update();
        }
    }

}

startGame();
spawnTargets();