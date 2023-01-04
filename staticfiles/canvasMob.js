
const canvas = document.querySelector("#canvas");
const body = document.querySelector("#bodyx");
const ctx = canvas.getContext("2d");

const mq = window.matchMedia( "(min-width: 768px)" );

window.addEventListener("load", () => {

    if (mq.matches) {

        //Resizing
        canvas.height = window.innerWidth * (1/4); // window.innerHeight
        canvas.width = window.innerWidth * (1/4);
    } else {
      // window width is less than 500px
      //Resizing
      canvas.height = window.innerWidth; // window.innerHeight
      canvas.width = window.innerWidth ;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let painting = false;
    var drawing = false;
    var mousePos = { x:0, y:0 };
    var lastPos = mousePos;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';

/*
    function startPosition(e){
        //if(oncanvas) return;
        painting = true;
        console.log('P',painting)
        draw(e);
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }
    function draw(e){

        if(!painting) return;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';

        if (e.type == 'touchmove'){
            ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.type == 'mousemove'){
            ctx.lineTo(e.clientX , e.clientY);
        }
        ctx.stroke();

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);


        ctx.beginPath();

        if (e.type == 'touchmove'){
            ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.type == 'mousemove'){
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }

        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    }

    // Event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    body.addEventListener('mouseover',finishedPosition);
*/
    canvas.addEventListener("mousedown", function (e) {
            drawing = true;
            lastPos = getMousePos(canvas, e);
    }, false);

    canvas.addEventListener("mouseup", function (e) {
            drawing = false;
    }, false);

    canvas.addEventListener("mousemove", function (e) {
            mousePos = getMousePos(canvas, e);
    }, false);

    function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
        };
    }

    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
        window.setTimeout(callback, 1000/60);
           };
     })();

     function renderCanvas() {
          if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
          }
        }

        // Allow for animation
        (function drawLoop () {
          requestAnimFrame(drawLoop);
          renderCanvas();
        })();


        // Set up touch events for mobile, etc
    canvas.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(canvas, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function (e) {
      var mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }
/*
    body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

*/

});

const dlImage = document.querySelector('#dlImage');
dlImage.addEventListener('click', function(){
    //IE/Edge Support (PNG Only)
    if(window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(),'canvas-image.png');
    } else {
        const a = document.createElement('a');

        document.body.appendChild(a); //needed for firefox
        a.href = canvas.toDataURL();
        a.download = 'canvas-image.png';
        a.click();
        document.body.removeChild(a);//needed for firefox
    }

});

const resetImage = document.querySelector('#resetImage');
resetImage.addEventListener('click', function(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);  //() will be default png
    //ctx.fillStyle = "black";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //canvas.width = canvas.width;
    location.reload();
});

function save(){
    var canvas = document.getElementById('canvas'); document.getElementById('hiddenform').value = canvas.toDataURL('image/png');

}
