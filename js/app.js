var gameStatus = {

};

var render = {

  //renders letters on bottom of board
  drawLetters: function(){
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    var squareX = 0;
    var letter = "";
    for(var i = 0; i < 6; i++){
      ctx.font = "30px Arial";
      if(i === 0){
        letter = "A";
      } else if(i === 1){
        letter = "S";
      }else if(i ===  2){
        letter = "D";
      }else if(i === 3){
        letter = "J";
      }else if(i === 4){
        letter = "K";
      }else if(i === 5){
        letter = "L"
      }
      ctx.fillText(letter, squareX + 68, 410);
      /*ctx.beginPath();
      ctx.rect(squareX, 370, 128, 80);
      ctx.fillStyle = "#990099";
      ctx.fill();
      ctx.closePath();*/
      squareX += 133;
    }
  },

  //goes through putting the foot down and up again
  drawFoot: function(){
    if(utilities.footCycle === true){
      var canvas = document.getElementById("gameCanvas");
      var ctx = canvas.getContext("2d");

      //gets foot coords
      var footX = utilities.footX;
      utilities.footY += 3;

      //draws foot
      drawing = new Image();
      drawing.src = "imgs\\foot.png";
      drawing.onload = function(){
        ctx.drawImage(drawing, footX, utilities.footY, 133, 400)
      };

      utilities.footFlyCollision();

      if(utilities.footY > 1){
        utilities.footCycle = false;
        utilities.footY = -450;
      }

    }
  },

  //renders fly
  drawFly: function(){
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(utilities.flyX, utilities.flyY, 8 , 8)
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
    //moves fly randomly
    setInterval(function(){
      utilities.moveFly();
    }, 500)
    utilities.flyX += utilities.dx;
    utilities.flyY += utilities.dy;
    //if the fly is out of bounds
    if(utilities.flyX > 750){
      utilities.flyX = 750;
    } else if (utilities.flyX < 50){
      utilities.flyX = 50;
    }
    if(utilities.flyY > 350){
      utilities.flyY = 350;
    } else if (utilities.flyY < 50){
      utilities.flyY = 50;
    }
  },

  drawGame: function (){
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawLetters();
    this.drawFoot();
    this.drawFly();
  }

};



var utilities = {
  //dx dy direction x direction y of fly
  dx: 0,
  dy: -0,
  //makes the fly move randomly
  moveFly: function(){
      var movement = [-15, -10, -5, -1, 0, 1 , 5, 10, 15];
      this.dx = movement[Math.floor(Math.random()*9)];
      this.dy = movement[Math.floor(Math.random()*9)];
    },
  flyY: Math.floor(Math.random()*400),
  flyX: Math.floor(Math.random()*800),
  footCycle: false,
  footY: -400,
  footX: 0,
  setFootX: function (letter){
    switch (letter){
      case "A":
        this.footX = 0;
        break;
      case "S":
        this.footX = 133;
        break;
      case "D":
        this.footX = 133*2;
        break;
      case "J":
        this.footX = 133*3;
        break;
      case "K":
        this.footX = 133*4;
        break;
      case "L":
        this.footX = 133*5;
        break;
    }
  },

  //function for win state
  win: function(){
    clearInterval(drawBoard);
    $("#gameWrapper").html("<div> \
    <p> YOU WIN!!! </p>  \
    <p onclick='function(){utilities.reset}'\
    > click here to play again </p> \
    </div>")
  },

  //detects if foot and fly collide
  footFlyCollision: function(){
    if(this.flyY < this.footY + 400 && this.flyX > this.footX && this.flyX < this.footX +133){
      this.win();
    }
  },
};

var drawBoard = setInterval(function(){render.drawGame();}, 10);

//key listeners
$( document ).ready(function() {
    window.onkeydown = function(e){
      var key = e.KeyCode ? e.KeyCode : e.which;
      //a
      if(key === 65 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("A");
      }
      //s
      else if(key === 83 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("S");
      }
      //d
      else if(key === 68 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("D");
      }
      //j
      else if(key === 74 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("J");
      }
      //k
      else if(key === 75 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("K");
      }
      //l
      else if(key === 76 && !utilities.footCycle){
        utilities.footCycle = true;
        utilities.setFootX("L");
      }
    };
});
