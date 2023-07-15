var trex,trexcorrendo,chao,imagemChao,subchao,nuvem,imagemnuvem,cacto,imagemCacto1,imagemCacto2,imagemCacto3,imagemCacto4,imagemCacto5,imagemCacto6,escolhercacto,tempojogo,trexColidiu,fimDeJogo,reiniciar,imagemFim,imagemReiniciar,somPulo,somMorrendo,somCheckPoint;

const jogar = 1;
const encerrar = 0;
var estadojogo = jogar;

function preload(){
  
  trexcorrendo=loadAnimation("trex1.png","trex2.png","trex3.png")
  trexColidiu=loadAnimation("trex_collided.png")
  
  
  
  imagemChao=loadImage("ground2.png")
  imagemnuvem=loadImage("cloud.png")
  imagemCacto1=loadImage("obstacle1.png")
  imagemCacto2=loadImage("obstacle2.png")
  imagemCacto3=loadImage("obstacle3.png")
  imagemCacto4=loadImage("obstacle4.png")
  imagemCacto5=loadImage("obstacle5.png")
  imagemCacto6=loadImage("obstacle6.png")
  
  imagemFim=loadImage("gameOver.png")
  imagemReiniciar=loadImage("restart.png")
  somPulo=loadSound("jump.mp3")
  somMorrendo=loadSound("die.mp3")
  somCheckPoint=loadSound("checkPoint.mp3")
}




function setup(){
  createCanvas(600,200)
trex=createSprite(50,100,20,40)
  trex.addAnimation("correndo",trexcorrendo)
  trex.addAnimation("colidiu",trexColidiu)
  trex.scale=0.5
  chao=createSprite(200,180,500,10)
  chao.addAnimation("chao",imagemChao)
  
  subchao=createSprite(200,190,500,10)
  subchao.visible=false
  fimDeJogo=createSprite(300,80,30,30)
  fimDeJogo.addAnimation("fimdejogo",imagemFim)
  fimDeJogo.scale=0.5
  reiniciar=createSprite(300,120,30,30)
  reiniciar.addAnimation("reiniciar",imagemReiniciar)
  reiniciar.scale=0.5
  tempojogo=0;
  grupoDecactos=new Group();
  grupoDenuvens=new Group();
  
  
  
}
 





 function draw(){
   
   background(180)
   text("Tempo:"+tempojogo,500,30)
 
   
   if(estadojogo==jogar){
     if(tempojogo>0&&tempojogo%100==0){
       somCheckPoint.play()
       
     }
     
     
     
     if(grupoDecactos.isTouching(trex)){
        estadojogo=encerrar; 
        somMorrendo.play()
      }
     
     
     tempojogo=tempojogo+1
     fimDeJogo.visible=false
     reiniciar.visible=false
     chao.velocityX=-(3+tempojogo/100)
     if(chao.x<0){
     chao.x=chao.width/2
     }
          
     if(keyDown("space")&& trex.y>161){
     
     trex.velocityY=-11
     somPulo.play()
     }
       
     gerarNuvens()
     gerarCactos()
      
    
          
   }
   
   else if(estadojogo == encerrar){
    chao.velocityX=0
    fimDeJogo.visible=true
     reiniciar.visible=true
    grupoDenuvens.setVelocityXEach(0);
    grupoDecactos.setVelocityXEach(0);
     
    grupoDenuvens.setLifetimeEach(-1);
    grupoDecactos.setLifetimeEach(-1);
     
    trex.changeAnimation("colidiu",trexColidiu)
   
   }
   
    trex.velocityY=trex.velocityY+0.5
    trex.collide(subchao)
   
   if(mousePressedOver(reiniciar))
   restart()
   
   drawSprites()
 }
   function restart(){
   estadojogo=jogar
   fimDeJogo.visible=false;
   reiniciar.visible=false;
   grupoDecactos.destroyEach()
   grupoDenuvens.destroyEach()
   trex.changeAnimation("correndo",trexcorrendo)
     tempojogo=0
   }



   function gerarNuvens(){
  if(frameCount%60==0){   nuvem=createSprite(600,100,50,10)
     nuvem.velocityX=-3
     nuvem.addAnimation("nuvem passando",imagemnuvem) 
                       nuvem.y=Math.round(random(60,100))
     nuvem.depth=trex.depth
     nuvem.depth=trex.depth+1
     nuvem.scale=0.4
     nuvem.lifetime=300
 grupoDenuvens.add(nuvem);
     }
   }
   
 

   

  function gerarCactos(){
     if(frameCount%60==0){
     cacto=createSprite(600,165,10,40)
     cacto.velocityX=-(3 + tempojogo/100)
    escolhercacto=Math.round(random(1,6))
       switch(escolhercacto){
 case 1:cacto.addImage(imagemCacto1)
           break;
 case 2:cacto.addImage(imagemCacto2)
           break;
 case 3:cacto.addImage(imagemCacto3)
           break;
 case 4:cacto.addImage(imagemCacto4)
           break;
 case 5:cacto.addImage(imagemCacto5)
           break;
 case 6:cacto.addImage(imagemCacto6)
           break;
           default:break
    
       }
    cacto.scale=0.4
    cacto.lifetime=300
    grupoDecactos.add(cacto);
     }
  }
       
       
       
