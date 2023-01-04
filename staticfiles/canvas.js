
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
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        ctx.stroke();

    /*    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
         */

        ctx.beginPath();

        if (e.type == 'touchmove'){
            ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.type == 'mousemove'){
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
/*        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
                */
    }

    // Event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    body.addEventListener('mouseover',finishedPosition);
    /*
    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //() will be default png
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function save(){
    var canvas = document.getElementById('canvas'); document.getElementById('hiddenform').value = canvas.toDataURL('image/png');

}
