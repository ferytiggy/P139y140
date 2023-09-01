//se crean 7 variables con distintos valores
var paddle2 =10,paddle1=10;
var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;
var score1 = 0, score2 =0;
var paddle1Y;
var  playerscore =0;
var pcscore =0;

//se crea el arreglo de ball con las etiquetas de x, y ,r, dx, dy con sus valores
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

//se crean las variables de rightwristY rightWristX y la variable de scoreRightWrist = 0
rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

//se crea la variable game_status vacia
game_status = "";


//se crea la función preload
 function preload() {
    //en las variables de ball touch paddel y la variable missed se cargan sus audios correspondientes
  ball_touch_paddel = loadSound("ball_touch_paddel.wav");
  missed = loadSound("missed.wav");
}

// se crea la función setup
function setup(){
    //se crea el canvas con tamaño de ancho 700 y alto 600
var canvas =  createCanvas(700,600);
//se le asigna el canvas al canvas
canvas.parent('canvas');

//se activa la camara en vivo
video = createCapture(VIDEO);
// se pone el tamaño del video en vivo del mismo tamaño del canvas
video.size(700, 600);
// se esconde el video
video.hide();

// se carga el modelo y de manda a llamar la función de modelloaded
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

//se crea la función modelloaded
function modelLoaded() {
    //se manda a la consola el texto de PoseNet se ha inicializado
  console.log('PoseNet se ha inicializado');
}

//se crea la función de gotPoses con el parametro results
function gotPoses(results)
{
    //si results.lenth es mayor a 0
  if(results.length > 0)
  {

    //se guarda en las variables la posición más actual
    rightWristY = results[0].pose.rightWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    //se guarda la puntuación más actual de la paleta de pingpong
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    //se manda a la consola la variable de scorerightwrist
    console.log(scoreRightWrist);
  }
}

//se crea la función startgame
function startGame()
{
    //la variable de game_status es igual al start
  game_status = "start";
  // se muestra en el elemento de h3 el texto de el juego esta cargando
  document.getElementById("h3").innerHTML = "El juego está cargado";
}

//se crea la función
function draw(){
    //si la variable gamestatus es igual a start
    if(game_status == "start")
    {
        //el fondo se vuelve negro
      background(0);
      //se empieza a mostrar el video en las coordenadas x0 y0 ancho700 alto600
      image(video, 0, 0, 700, 600);
    
    //se rellena de blanco
      fill("black");
      //se pone el borde blanco
      stroke("black");
      // se hace un cuadrado/rectangulo en esas coordenadas y tamaños
      rect(680,0,20,700);
    
    //se rellena de blanco
      fill("black");
      //se pone el borde blanco
      stroke("black");
      //se crea un cuadrado/rectangulo
      rect(0,0,20,700);
    
    //si scorerightwrist es mayor a 0.2
      if(scoreRightWrist > 0.2)
      {
        fill("red");
        stroke("red");
        //se crea un circulo
        circle(rightWristX, rightWristY, 30);
      }
    
    
    
    
        //Llamar a la función paddleInCanvas
        paddleInCanvas();
           
        //Paleta izquierda
        fill(250,0,0);
        stroke(0,0,250);
        strokeWeight(0.5);
        paddle1Y = rightWristY;
        rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
    
    
    
    
        //Paleta de la computadora
        fill("#FFA500");
        stroke("#FFA500");
        var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
       
        //Llamar a la función  midline
        midline();
       
        //Llamar a la función drawScore
        drawScore();
    
    
        //Llamar a la función models  
        models();
    
    
        //Llamar a la función move, la cual es muy importante
        move();
    
    
        }
    
    
      }
    
    
    
    
    


