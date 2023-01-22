let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
let form = document.getElementById('options');
let painter = new Paint(c);
let paintMode = 1; //[1: "free",2: "rect", "circle", "squre", "es"];
let draw;
let options = form.children;


[...options].forEach(function (item) {
    if (item.type === 'button') {
        item.addEventListener('click', e => {
            if (e.target.name === 'clear') {
                c.clearRect(0, 0, canvas.width, canvas.height);
            } else if (e.target.name === 'free') {
                paintMode = 1;
            } else if (e.target.name === 'rect') {
                paintMode = 2;
            } else if (e.target.name === 'circle') {
                paintMode = 3;
            } else if (e.target.name === 'squre') {
                paintMode = 4;
            } else if (e.target.name === 'es') {
                paintMode = 5;
            }
        })
    } else {
        item.addEventListener('change', e => {
            if (e.target.name === 'size') {
                painter.radius = e.target.value;
            } else if (e.target.name === 'color') {
                painter.color = e.target.value;
            }
        })
    }
});

let o = {
    startX : 0,
    endX : 0,
    startY: 0,
    endY: 0
};

canvas.addEventListener('mousedown', function (e) {
    painter.start();
    o.startX= e.pageX - canvas.offsetLeft;
    o.startY= e.pageY - canvas.offsetTop;

    if (paintMode === 1) {
        freeMode(e, o, "start");
    } else if (paintMode === 2) {
        rectMode(e, o, "start");
    }else if (paintMode === 3) {
        circleMode(e,o,"start");
    } else if (paintMode === 5) {
        esMode(e, o, "start");
    }
});

document.addEventListener('mouseup', function (e) {
    o.endX = e.pageX - canvas.offsetLeft;
    o.endY = e.pageY - canvas.offsetTop;
    if (paintMode === 1) {
        freeMode(e, o, "end");
    } else if (paintMode === 2) {
        rectMode(e, o, "end");
    }else if (paintMode === 3) {
        circleMode(e,o,"end");
    } else if (paintMode === 5) {
        esMode(e, o, "end");
    }
    painter.stop();
});

canvas.addEventListener('mousemove', function (e) {
    if (paintMode === 1) {
        freeMode(e, o);
    } else if (paintMode === 2) {
        rectMode(e, o);
    }else if (paintMode === 3) {
        circleMode(e,o);
    } else if (paintMode === 5) {
        esMode(e, o);
    }
});

function freeMode(e, o, start) {
    let x = e.pageX;
    let y = e.pageY;
    if(start === "start"){
        x = o.startX;
        y = o.startY;
    }else{
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
    }

    painter.painting && painter.line(x, y)
};

function circleMode(e, o, start) {
    if (start === "end"){
        c.beginPath();
        c.fillStyle = document.getElementById("color").value;
        painter.painting && c.arc(o.endX,o.endY,Math.abs(o.endX-o.startX),0,Math.PI*2,false);
        c.fill();
    }
};

function esMode(e, o, start) {
    let x = e.pageX;
    let y = e.pageY;
    if(start === "start"){
        x = o.startX;
        y = o.startY;
    }else{
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        c.beginPath();
        c.fillStyle = "white";
        painter.painting && c.arc(x,y,20,0,Math.PI*2,false);
        c.fill();
    }
};
function rectMode(e, o, start) {
    if (start === "end"){
        console.log(o);
        c.beginPath();
        c.fillStyle = document.getElementById("color").value;
        painter.painting && c.fillRect(o.startX, o.startY, o.endX - o.startX, o.endY - o.startY);
    }
};