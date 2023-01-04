
const canvas = document.querySelector("#canvas");
const body = document.querySelector("#bodyx");
const ctx = canvas.getContext("2d");

const mq = window.matchMedia( "(min-width: 768px)" );

window.addEventListener("load", () => {
    var mousePos = { x:0, y:0 };
    var lastPos = mousePos;

    function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
        };
    }

    canvas.addEventListener("mousedown", function (e) {
            painting = true;
            lastPos = getMousePos(canvas, e);
            draw();

    }, false);

    canvas.addEventListener("mouseup", function (e) {
            painting = false;
            ctx.beginPath();
    }, false);

    canvas.addEventListener("mousemove", function (e) {
            draw();
            mousePos = getMousePos(canvas, e);
    }, false);

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }
    body.addEventListener('mouseover',finishedPosition);

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

    function draw(e){

        if(!painting) return;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';

        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;

        // ctx.lineTo(lastPos.x, lastPos.y);
        // ctx.stroke();
        //
        // ctx.beginPath();
        // ctx.moveTo(mousePos.x, mousePos.y);
        // lastPos = mousePos;

    }


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
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //() will be default png
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function save(){
    var canvas = document.getElementById('canvas'); document.getElementById('hiddenform').value = canvas.toDataURL('image/png');

}
