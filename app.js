const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // default value;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  if(!painting){
      //console.log("creating path in ", x, y)
      ctx.beginPath();
      ctx.moveTo(x, y);     // 마우스를 canvas위에서 움직일때는 false라 색깔이칠해지지는 않지만 
      //console.log(ctx);                     캔버스 위에 위치해있다면 콘솔에는 계속 찍힘
  } else {      // 하지만 마우스를 클릭하고 move하면 그때부터 
      //console.log("createing line in ", x, y)
      ctx.lineTo(x, y);     // x,y 좌표에 색을 찍어줌(위에 정의한 strokeStyle이 검은색이므로 -생략)
      ctx.stroke();     // -> lineto와 stroke은 내가 마우스를 움직이는 내내 발생하는것이다
      //console.log(ctx);
  }
}

function handleColorClick(event){
    //console.log(event.target.style); // context 콘솔창에 잘 들어옴
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    //console.log(color); 색깔잘나옴
}

function handleRangeChange(event){
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){    
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill'
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}


function handleCM(event){
    // console.log(event);
    event.preventDefault(); // 이 키를 쓰니까 오른쪽키를 누르는게 안된다;대박;
}

function handleSaveClick(){
    const image = canvas.toDataURL('image/jpeg');
    // console.log(image); 이미지 링크가 나옴
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[🎨]';
    // console.log(link); -> <a download: link address>
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}           //contextmenu 오른쪽 마우스키 눌렀을때 일어나는 일들 (여기서는 save)
                // 다른이름으로 저장을 하기위함

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));



if(range){
    range.addEventListener('input', handleRangeChange)
}

if(mode){
    mode.addEventListener('click', handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}