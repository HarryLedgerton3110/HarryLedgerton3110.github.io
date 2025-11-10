var myCar;
var myBullets = [];
var myTargets = [];
var myPuddles = [];
var targetAmount = 10;
var puddleAmount = Math.floor((Math.random() * 10) + 2);
var reloadTime = 60;
var reloadTimer = 0;
var canShoot = true;
var spriteSize = 32;
var tankSpriteSheet = new Image();
tankSpriteSheet.src = "TankSpriteSheet.png";
var gunSpriteSheet = new Image();
gunSpriteSheet.src = "GunSpriteSheet.png";
var puddleSprite = new Image();
puddleSprite.src = "Puddle.png";
var targetSprite = new Image();
targetSprite.src = "Target.png";
var bookSprite = new Image();
bookSprite.src = "Book.png";
var openBookSprite = new Image();
openBookSprite.src = "OpenBook.png";
var journalPageTitle = new Image();
journalPageTitle.src = "JournalPage_Title.png";
var journalPageDiss1 = new Image();
journalPageDiss1.src = "JournalPage_Dissertation1.png";
var journalPageDiss2 = new Image();
journalPageDiss2.src = "JournalPage_Dissertation2.png";
var journalPageUnreal = new Image();
journalPageUnreal.src = "JournalPage_Unreal.png";
var journalPageJavascript = new Image();
journalPageJavascript.src = "JournalPage_Javascript.png";
var journalPageTargets = new Image();
journalPageTargets.src = "JournalPage_Targets.png";
var journalPagePPT = new Image();
journalPagePPT.src = "JournalPage_PPT.png";
var leftArrowSprite = new Image();
leftArrowSprite.src = "LeftArrow.png";
var rightArrowSprite = new Image();
rightArrowSprite.src = "RightArrow.png";
var tankRow = 0;
var tankCol = 0;
var gunRow = 0;
var gunCol = 0;
var tick = 0;
var canMove = true;
var showBook = false;
var page = 0;
var canRead = false;
//var rect = document.getElementById("canvas");


function startGame(){
    myGameArea.start();
    myCar = new car(48,48, "#015708" , myGameArea.canvas.width/2,myGameArea.canvas.height/2);

    
}

function spritePostoImgPos(row,col){
    return {
        x:(col * spriteSize),
        y:(row * spriteSize)
    }
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        document.addEventListener("mousemove", function(e){
            var mousePos = getMousePos(myGameArea.canvas, e);
            myGameArea.mouseX = mousePos.x;
            myGameArea.mouseY = mousePos.y;
        })
        document.addEventListener('click', function(e) {
            var mousePos = getMousePos(myGameArea.canvas, e);
            myGameArea.mouseX = mousePos.x;
            myGameArea.mouseY = mousePos.y;
            console.log("X: ", myGameArea.mouseX, "Y: ", myGameArea.mouseY);
            if(myGameArea.mouseX > myGameArea.canvas.width/50 && myGameArea.mouseX < myGameArea.canvas.width/50 +64){
                if(myGameArea.mouseY >myGameArea.canvas.height - (myGameArea.canvas.height/15) && myGameArea.mouseX < myGameArea.canvas.height - (myGameArea.canvas.height/15) +64){
                    console.log("Clicked");
                    canMove = false;
                    showBook = true;
                
                }
            }

            if(myGameArea.mouseX > myGameArea.canvas.width / 5 + (myGameArea.canvas.width/1.767) && myGameArea.mouseX < myGameArea.canvas.width / 5 + myGameArea.canvas.width/1.5){
                if(myGameArea.mouseY > myGameArea.canvas.height - (myGameArea.canvas.height/1.01) && myGameArea.mouseY < myGameArea.canvas.height - (myGameArea.canvas.height/1.126)){ 
                    console.log("click2");
                    canMove = true;
                    showBook = false;
                    
                }
            }

            if(myGameArea.mouseX > myGameArea.canvas.width / 6 && myGameArea.mouseX<myGameArea.canvas.width/6 +64){
                if(myGameArea.mouseY > myGameArea.canvas.height/2 && myGameArea.mouseY < myGameArea.canvas.height/2 +64){
                    if((page > 0 && page <=2) && showBook == true){
                        page -= 1;
                    }
                }
            } 

            if(myGameArea.mouseX > myGameArea.canvas.width / 6 + myGameArea.canvas.width/1.425 && myGameArea.mouseX<myGameArea.canvas.width / 6 + myGameArea.canvas.width/1.425 +64){
                if(myGameArea.mouseY > myGameArea.canvas.height/2 && myGameArea.mouseY < myGameArea.canvas.height/2 +64){
                    if((page>=0 && page <2) && showBook == true){
                        page += 1;
                    }
                }
            }
            
            if(myGameArea.mouseX > myGameArea.canvas.width*0.657 && myGameArea.mouseX < myGameArea.canvas.width*0.745){
               if(myGameArea.mouseY > myGameArea.canvas.height*0.655 && myGameArea.mouseY < myGameArea.canvas.height*0.730){
                    if(page == 0){
                        console.log("Github");
                        window.open("https://github.com/HarryLedgerton3110/HarryLedgerton3110.github.io");
                    }
               }
            }
            if(myGameArea.mouseX > myGameArea.canvas.width*0.625 && myGameArea.mouseX < myGameArea.canvas.width*0.693){
               if(myGameArea.mouseY > myGameArea.canvas.height*0.66 && myGameArea.mouseY < myGameArea.canvas.height*0.733){
                    if(page == 1){
                        console.log("PDF");
                        window.open("HarrisonLedgertonDissertation.pdf");
                    }
               }
            }

            if(myGameArea.mouseX > myGameArea.canvas.width*0.711 && myGameArea.mouseX < myGameArea.canvas.width*0.781){
               if(myGameArea.mouseY > myGameArea.canvas.height*0.66 && myGameArea.mouseY < myGameArea.canvas.height*0.733){
                    if(page == 1){
                        window.open("https://www.youtube.com/watch?v=VRUABQEV_a0&t=9s");
                    }
               }
            }



            //if (myGameArea.mouseX > )

        })
    },
    clear : function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
}

function getMousePos(canvas, event){
    var canvArea = canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvArea.left,
        y: event.clientY - canvArea.top
    };
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
        ctx.translate(this.x + 24,this.y + 24);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc((this.width / -2)  , (this.height / -2) , this.width/3, 0,2 * Math.PI);
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
        ctx.drawImage(targetSprite, 0, 0, 32,32,this.x ,this.y,64, 64)
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function puddle(width, height, x ,y, angle){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = angle;
    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(this.angle);
        ctx.drawImage(puddleSprite, 0, 0, 32,32,this.width/-2 ,this.height/-2,64, 64);
        ctx.restore();
    }
}

function spawnTargets(){
    //console.log("test1");
    for(let i =0; i<targetAmount; i++){
        console.log("Game area", myGameArea.canvas.width);
        myTargets.push(new target(30,30, Math.floor(Math.random() * (myGameArea.canvas.width-50)) + 50, Math.floor( Math.random() * (myGameArea.canvas.height-100))+50,Math.random()*360));
    }
}

function spawnPuddles(){
    for(let i =0; i<puddleAmount; i++){
        myPuddles.push(new puddle(32,32, Math.random() * myGameArea.canvas.width, Math.random() * myGameArea.canvas.height, Math.random()*360));
    }
}


function getDist(X1,Y1,X2,Y2){
    var a = X1 - X2;
    var b = Y1 - Y2;
    var c = Math.sqrt((a*a)+(b*b));
    return c;
}

function car(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.turnSpeed = 0;
    this.x = x;
    this.y = y;
    this.gunAngle = 0;
   
    this.update = function(){
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x + this.width/2,this.y + this.height/2);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.drawImage(tankSpriteSheet, 0, 0, spriteSize,spriteSize,this.width/2 * (-1), this.height /2 *(-1), spriteSize*1.5, spriteSize*1.5);
        ctx.restore();  
    }
    this.gunUpdate = function(){
        //console.log("X: ", myGameArea.mouseX, "Y: ", myGameArea.mouseY);
        this.gunAngle = Math.atan2((myGameArea.mouseY - this.y - 24), (myGameArea.mouseX - this.x - 24)) + 90 * Math.PI /180;
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x + 24,this.y + 24);
        ctx.rotate(this.gunAngle);
        ctx.fillStyle = color;
        ctx.drawImage(gunSpriteSheet, 0, 0, spriteSize,spriteSize,this.width/-2, this.height/-2, spriteSize*1.5, spriteSize*1.5);
        ctx.restore(); 
    }
    this.move = function(){
        this.angle += this.turnSpeed * Math.PI /180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.shoot = function(){
        this.gunAngle = Math.atan2((myGameArea.mouseY - this.y - 24), (myGameArea.mouseX - this.x - 24  )) + 90 * Math.PI /180;  
        console.log("Shoot");
        myBullets.push(new bullet(10,10,this.x, this.y, this.gunAngle));

    }
    this.animate = function(){
        if (tankCol == 2){
            tankCol = 0;
            tankRow +=1;
        }
        if (tankRow ==2){
            tankRow=0;
        }

        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x + this.width/2,this.y + this.height/2);
        ctx.rotate(this.angle);
        var position = spritePostoImgPos(tankRow,tankCol);
        ctx.drawImage(tankSpriteSheet, position.x, position.y, spriteSize,spriteSize,this.width/2 * (-1), this.height /2 *(-1), spriteSize * 1.5, spriteSize* 1.5);
        //ctx.drawImage(gunSpriteSheet, 0, 0, spriteSize,spriteSize,(this.width/ -2) - 8, (this.height/-2) - 20, spriteSize*2, spriteSize*2);
        ctx.restore();
        tankCol +=1;

    }
    
}




function updateGameArea(){
    tick +=1;
    myGameArea.clear();
    myCar.speed = 0;
    myCar.turnSpeed = 0;
    reloadTimer +=1;
    isAnimating = false;
    myGameArea.context.font = "30px Arial";
    myGameArea.context.fillText("Controls: ", 20,30);
    myGameArea.context.fillText("WASD - Move", 20, 65);
    myGameArea.context.fillText("Space - Shoot", 20, 100);
    myGameArea.context.fillText("Mouse - Aim", 20, 135);
    if (myGameArea.keys && myGameArea.keys[65]) {myCar.turnSpeed = -1; isAnimating = true;}
    if (myGameArea.keys && myGameArea.keys[68]) {myCar.turnSpeed = 1; isAnimating = true;}
    if (myGameArea.keys && myGameArea.keys[87]) {myCar.speed = 1; isAnimating = true;}
    if (myGameArea.keys && myGameArea.keys[83]) {myCar.speed = -1; isAnimating = true;}
    if (myGameArea.keys && myGameArea.keys[32]) {
        if(reloadTimer > reloadTime) {
            myCar.shoot(); 
            reloadTimer = 0;
        }
    }

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

    if (myPuddles.length > 0){
        for (let i =0; i< myPuddles.length; i++){
            myPuddles[i].update();
        }
    }

    for(let i = 0; i < myBullets.length; i++){
        for(let j =0; j<myTargets.length; j++){
            if(getDist(myBullets[i].x, myBullets[i].y, myTargets[j].x,myTargets[j].y) < myTargets[j].width){
                myBullets.splice(i,1);
                myTargets.splice(j,1);
            };
        }
    }

    if(myTargets.length == 0){
        canRead = true;
    }
  

    if (canMove == true){
        myCar.move();
    }
    if (isAnimating == true){
        myCar.animate();
    }else{
        myCar.update();
    }
    myCar.gunUpdate();

    if(showBook == true){
        console.log("test");
        ctx.drawImage(openBookSprite, 0, 0, 512,512, myGameArea.canvas.width / 5 ,0 ,myGameArea.canvas.width/1.5, (myGameArea.canvas.width/1.5));
        ctx.drawImage(leftArrowSprite,0,0,32,32,myGameArea.canvas.width / 6,myGameArea.canvas.height/2,64,64 );
        ctx.drawImage(rightArrowSprite,0,0,32,32,myGameArea.canvas.width / 6 + myGameArea.canvas.width/1.425,myGameArea.canvas.height/2,64,64 );
        if(page == 0 && canRead == true){
            ctx.drawImage(journalPageTitle, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.063) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
            ctx.drawImage(journalPageJavascript, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.4) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
        }
        if(page == 1 && canRead == true){
            ctx.drawImage(journalPageDiss1, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.063) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
            ctx.drawImage(journalPageDiss2, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.4) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
        }
        if(page == 2 && canRead == true){
            ctx.drawImage(journalPageUnreal, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.063) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
            ctx.drawImage(journalPagePPT, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.4) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
        }
        if(canRead == false){
            ctx.drawImage(journalPageTargets, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.063) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
            ctx.drawImage(journalPageTargets, 0, 0, 787,1117, (myGameArea.canvas.width / 5) + (myGameArea.canvas.width*0.4) ,myGameArea.canvas.height - (myGameArea.canvas.height * 0.709),myGameArea.canvas.width/4.968, (myGameArea.canvas.width/3.5));
        }

    }

    ctx.drawImage(bookSprite, 0, 0, 32,32,myGameArea.canvas.width/50 ,myGameArea.canvas.height - (myGameArea.canvas.height/15),64, 64)
    //console.log(myTargets.length);
    

}

startGame();
spawnTargets();
spawnPuddles();