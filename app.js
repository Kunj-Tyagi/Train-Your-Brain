let gameseq=[],userseq=[];

let btns=["yellow","pink","green","purple"];

let level=0;
let maxi=0;
let started=false;

let h2=document.querySelector("h2");

// Step 1-- Start a game.
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started");
        started=true;
    }

    levelUp();
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250); 
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250); 
}

// Step 2-- Flash btn and level
function levelUp(){

    userseq=[];

  level++;
  h2.innerHTML=`Level ${level} <br><br> Highest Score: <b>${maxi}</b> `;

  let randIdx=Math.floor(Math.random()*3);
  let randColor=btns[randIdx];
  let randBtns=document.querySelector(`.${randColor}`);

//   console.log(randIdx);
//   console.log(randColor);
//   console.log(randBtns);

  gameseq.push(randColor);
  console.log(gameseq);
  
  gameFlash(randBtns);
}

function checkAns(idx){
    
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        maxi=Math.max(level,maxi);
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.<br><br> Highest Score achieved: <b>${maxi}</b> `;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },10);
        reset();
    }
}

function btnPress(){
    console.log(this);
    let btn=this;
    userflash(btn);

    userColor=btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}