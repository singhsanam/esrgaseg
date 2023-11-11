
let turn = 'red'
let stopEvent = false

document.getElementById('red').style.transform = `0vmin`
document.getElementById('red').style.transform = `0vmin`
document.getElementById('blue').style.transfrom = `0vmin`
document.getElementById('blue').style.transform = `0vmin`




function roll(){
    // return new Promise(async(resolve,reject)=>{
    let diceNum = Math.floor(Math.random() * 6)+1
    let values = [[0,-360],[-180,-360],[-180,270],[0,-90],[270,180],[90,90]]
    new Audio('./images/diceRoll.mp3').play()
    document.getElementById('cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`
    // await new Promise(resolve => setTimeout(resolve,750))
    document.getElementById('cube_inner').style.transform = `rotateX(${values[diceNum-1][0]}deg) rotateY(${values[diceNum-1][1]}deg)`
    // await new Promise(resolve => setTimeout(resolve,750))
    // console.log(document.querySelector('#cube_inner'))
    console.log(diceNum)
    return diceNum
    // })
}


function run(diceNum){
    console.log("fhuct"+diceNum)
    // return new Promise(async(resolve,reject)=>{
        for(i=1;i<=diceNum;i++){
            console.log("ihndfvn")
            let direction = getDirection()
            console.log("directions => "+direction)
            move(direction)
            del();
        }
        checkLadderAndSnake()
        // resolve()
    // })    

}

function checkLadderAndSnake()
{
    let froms = [[]]
    let tos = [[]]

    for(let i=0;i<tos.lengthl;i++){
        if(marginLeft()==froms[i][0] && marginTop()==froms[i][1]){
            new Audio("./images/move.mp3").play();

            document.querySelector(`#${turn}`).style.marginLeft = `${tos[i][0]}vmin`
            document.querySelector(`#${turn}`).style.marginTop = `${tos[i][1]}vmin`
        }
    }

}

async function delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  async function del() {
    await delay(500); // Wait for 1 second (1000ms)
  }
function move(direction)
{
    console.log("marginleft before =>"+document.querySelector(`#${turn}`).style.marginLeft);
    x = document.querySelector(`#${turn}`).style.marginLeft;
    if(x == '') console.log(0);
    return new Promise(async(resolve,reject)=>{
    new Audio('./images/move.mp3').play()
    if(direction == 'up'){
        document.querySelector(`#${turn}`).style.marginTop = String(marginTop()-9.8)+'vmin'
    }
    else if(direction == 'right'){
        document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft()+9.8)+'vmin'
        console.log("marginleft after =>"+document.querySelector(`#${turn}`).style.marginLeft)
    }
    else if(direction == 'left'){
        document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft()-9.8)+'vmin'
    }
    

    
    // await new Promise(resolve => setTimeout(resolve,400))
    // resolve()
})

}


function getDirection(){
    let direction
    if(marginLeft()==88.2 && ((((marginTop()*10)%(-19.6*10)/10)==0))||(marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10!=0)))){
        direction = 'up'
    }
    else if((((marginTop()*10)%(-19.6*10))/10)==0)
    {
    direction = 'right'    
    }
    else{
        direction = 'left'
    }
    return direction;
}

function changeTurn(){
    if(turn=='blue'){
        document.getElementById('p_turn').innerHTML = "Red Player's turn"
        turn = 'red'
    }
    else if(turn == 'red'){
        document.getElementById('p_turn').innerHTML = "Blue Player's turn"
        turn = 'blue'
    }
}


function checkRange(diceNum){
let isOutOfRange = false;
if(marginTop()==-88.2 && (marginLeft()+Number((diceNum*-9.8).toFixed(1)))<0){
    isOutOfRange=true
}
return isOutOfRange
}


function checkWin(){
    if(marginTop()==-88.2 && marginLeft()==0){
        document.getElementById('p_turn').innerHTML = `${turn} player wins`
        new Audio("./images/win.mp3").play()
        return turn
    }
    return 'none'
}


document.addEventListener('keydown',async(e)=>{
    // keyCode 

    // console.log("marginleft =>"+document.querySelector(`#${turn}`).style.marginLeft)

    if(e.key==='8' && !stopEvent){
        stopEvent  = true
        let diceNum =  roll();
        let isOutOfRange = checkRange(diceNum)
        // await new Promise(resolve => setTimeout(resolve,400))
       
       if(!isOutOfRange){
        run(diceNum)
       }
        // await new Promise(resolve => setTimeout(resolve,400))
        //  console("ru=n ")
        let wonBy = checkWin()
        if(wonBy=='none'){
            changeTurn()
            stopEvent = false
        }
    }
    
    console.log(e.code)
    console.log(e+" "+e.key)

})



function marginLeft()
{
    console.log("numL => "+ Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0]))
    return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0])
}

function marginTop(){
    console.log("numL => "+ Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0]))
    return Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0])
}


boxNumbers()


function boxNumbers(){
    let boxes = document.getElementsByClassName("box");
    // let boxes2 = document.getElementsById("box");

    let z1 = boxes.length;//100
    let z2 = parseInt(Math.sqrt(z1));//10
    for(let i = 0;i<boxes.length;i++){
        let x = parseInt(i/z2);
        let y = (i+1)%z2;
        if(y==0) y = z2;
        if(x%2==0){
            boxes[i].innerHTML = z1+1-(y + z2*x);
        }
        else{
            boxes[i].innerHTML = z1+1-((z2-y+1) + z2*x);
        }
        // boxes[i].style.backgroundColor = "red";
    }   
}