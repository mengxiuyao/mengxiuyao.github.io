var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;           //小圆点的半径
var MARGIN_TOP = 40;
var MARGIN_LEFT = 30;     //间距

// //自适应
// var WINDOW_WIDTH = document.body.clientWidth;
// var WINDOW_HEIGHT = document.body.clientHeight;
// var RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;           //小圆点的半径
// var MARGIN_TOP = Math.round(WINDOW_HEIGHT/8);
// var MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);     //间距

//因为小时这只有2位，所以最多倒计时4天
const endTime = new Date(2015,0,11,18,47,52);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#F70303", "#E305F7", "#2C05F7", "#05AAF7", "#05F752","#52F705", "#D0F705", "#F79605", "#F73505", "#8D05F7"];

window.onload = function(){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
        render(context);
        update(context);
    },50);
}

function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    // var ret = endTime.getTime() - curTime.getTime();
    // ret = Math.round(ret/1000);
    var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret >= 0 ? ret : 0;
}

function update(cxt){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;
    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours*3600)/60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {
        if ( parseInt(curHours/10) != parseInt(nextHours/10) ) {
            addBalls(MARGIN_LEFT+0,  MARGIN_TOP,  parseInt(curHours/10));
        }
        if ( parseInt(curHours%10) != parseInt(nextHours%10) ) {
            addBalls(MARGIN_LEFT+15*(RADIUS+1),  MARGIN_TOP,  parseInt(curHours%10));
        }
        if ( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ) {
            addBalls(MARGIN_LEFT+39*(RADIUS+1),  MARGIN_TOP,  parseInt(curMinutes/10));
        }
        if ( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ) {
            addBalls(MARGIN_LEFT+54*(RADIUS+1),  MARGIN_TOP,  parseInt(curMinutes%10));
        }
        if ( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ) {
            addBalls(MARGIN_LEFT+78*(RADIUS+1),  MARGIN_TOP,  parseInt(curSeconds/10));
        }
        if ( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ) {
            addBalls(MARGIN_LEFT+93*(RADIUS+1),  MARGIN_TOP,  parseInt(curSeconds%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
        cxt.fillStyle = colors[ Math.floor(Math.random()*colors.length)];
        cxt.fill();
    }

    updateBalls();
}

function updateBalls(){

    for (var i=0; i<balls.length; i++) {
        balls[i].x += balls[i].vx;
        // y = vy*(vy+g)
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        //碰撞检测
        if (balls[i].y >= WINDOW_HEIGHT-RADIUS) {
            balls[i].y = WINDOW_HEIGHT-RADIUS
            balls[i].vy = -balls[i].vy*0.75;
        }
    }

    //检测小球是否在画面内
    var count = 0;
    for (var i=0; i<balls.length; i++) {
        if (balls[i].x+RADIUS > 0 && balls[i].x-RADIUS < WINDOW_WIDTH) {
            balls[count++] = balls[i];
        }
    }
    //超出范围的小球抛出
    while(balls.length>count){
        balls.pop();
    }
}

function addBalls(x, y, num){

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),    //加速度
                    vx: Math.pow( -1, Math.ceil(Math.random()*1000) )*4,
                    vy:-5,
                    color: colors[ Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function render(cxt){

    //对画布刷新
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds % 60;

    //小时的十位和个位
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
    //冒号
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, cxt);
    //分钟
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
    //冒号
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, cxt);
    //秒钟
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

    for (var i=0; i<balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.fill();
    };
}

function renderDigit(x, y, num, cxt){

    // cxt.fillStyle = "rgb(165, 12, 179)";

    //第(i,j)个圆的圆心位置：
    //CenterX：x+j*2*(R+1)+(R+1)
    //CenterY：y+i*2*(R+1)+(R+1)
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}