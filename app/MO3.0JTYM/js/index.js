webpackJsonp([1],{

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

// var Vue = require("vue");
// var slick = require("slick-carousel");
var $ = __webpack_require__(0);
var Slick = __webpack_require__(1);

$(document).ready(function () {
    $.popCtrl();

    var slick01 = $(".slick01").slick({
        arrows: false,
        dots: true,
        draggable: true,
        mobileFirst: true,
        swipe: true
    });
    var slick02 = $(".slick02").slick({
        arrows: false,
        dots: true,
        draggable: true,
        mobileFirst: true,
        swipe: true,
        centerMode: true,
        centerPadding: "18%"
    });

    // var RrogressCircle = (function () {
    //
    //     //
    //     function bgCircle(_this, color) {
    //         var ctx = _this.ctx;
    //         ctx.beginPath();
    //         ctx.arc(_this.cPosX, _this.cPosY, _this.r, 0, Math.PI * 2);
    //         ctx.closePath();
    //         ctx.lineCap = "round";
    //         ctx.lineWidth = _this.canvas.width / 2 / 25;
    //         ctx.strokeStyle = color;
    //         ctx.stroke();
    //     }
    //
    //     //
    //     function progCircle(_this, color) {
    //         var ctx = _this.ctx;
    //         ctx.beginPath();
    //         ctx.arc(_this.cPosX, _this.cPosY, _this.r, 0, 2 * Math.PI * _this.percent, true);
    //         ctx.lineCap = "round";
    //         ctx.lineWidth = _this.canvas.width / 2 / 25;
    //         ctx.strokeStyle = color;
    //         ctx.stroke();
    //         // console.log(_this.percent);
    //         // _this.circle.style.transform = "rotate(" + (94 - 360 * (1-_this.percent)) + "deg)";
    //     }
    //
    //     function proBg(_this) {
    //         var img = new Image();
    //         img.src = '../images/c_light.png';
    //         img.onload = function () {
    //             // 绘制图像
    //             _this.ctx.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);
    //         };
    //         _this.ctx.rotate(45);
    //     }
    //
    //     function _progressCircle(canvasId) {
    //         this.canvas = document.querySelector(canvasId);
    //         this.ctx = this.canvas.getContext("2d");
    //         this.percent = (100 - this.canvas.dataset.progress) / 100;
    //         this.canvas.width = Math.floor(document.documentElement.clientWidth);
    //         this.canvas.height = Math.floor(document.documentElement.clientWidth);
    //         this.cPosX = this.canvas.width / 2;
    //         this.cPosY = this.canvas.height / 2;
    //         this.r = Math.ceil(this.canvas.width / 2 - 18 * document.querySelector("html").dataset.dpr);
    //     }
    //
    //     _progressCircle.prototype.init = function () {
    //         bgCircle(this, "rgba(255,255,255,0.2)");
    //         progCircle(this, "#fff");
    //         //proBg(this);
    //     };
    //
    //     return _progressCircle;
    //
    // })();
    //
    // var rc01 = new RrogressCircle("#canvas");
    // rc01.init();
});
//
// var Progress = (function () {
//     function _progress() {
//         this.canvas = document.getElementById('c');
//         this.ctx = this.canvas.getContext('2d');
//         this.range = document.getElementById('r');
//
//         //range控件信息
//         this.rangeValue = this.range.value;
//         this.nowRange = 0;	//用于做一个临时的range
//
//         //画布属性
//         this.mW = this.canvas.width = 250;
//         this.mH = this.canvas.height = 250;
//         this.lineWidth = 2;
//
//         //圆属性
//         this.r = this.mH / 2; //圆心
//         this.cR = this.r - 16 * this.lineWidth; //圆半径
//
//         //Sin 曲线属性
//         this.sX = 30;
//         this.sY = this.mH / 2;
//         this.axisLength = this.mW; //轴长
//         this.waveWidth = 0.015;   //波浪宽度,数越小越宽
//         this.waveHeight = 6; //波浪高度,数越大越高
//         this.speed = 0.09; //波浪速度，数越大速度越快
//         this.xOffset = 0; //波浪x偏移量
//
//         this.ctx.lineWidth = this.lineWidth;
//
//         //画圈函数
//         this.IsdrawCircled = false;
//     }
//
//     _progress.prototype.drawCircle = function () {
//
//         this.ctx.beginPath();
//         this.ctx.strokeStyle = '#1080d0';
//         this.ctx.arc(r, r, this.cR + 5, 0, 2 * Math.PI);
//         this.ctx.stroke();
//         this.ctx.beginPath();
//         this.ctx.arc(r, r, this.cR, 0, 2 * Math.PI);
//         this.ctx.clip();
//
//     }
//
// //画sin 曲线函数
//     _progress.prototype.drawSin = function (xOffset) {
//         this.ctx.save();
//
//         var points = [];	//用于存放绘制Sin曲线的点
//
//         this.ctx.beginPath();
//         //在整个轴长上取点
//         for (var x = this.sX; x < this.sX + this.axisLength; x += 20 / this.axisLength) {
//             //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
//             var y = -Math.sin((this.sX + x) * this.waveWidth + this.xOffset);
//
//             var dY = this.mH * (1 - this.nowRange / 100 );
//
//             points.push([x, dY + y * this.waveHeight]);
//             console.log("dd");
//             this.ctx.lineTo(x, dY + y * this.waveHeight);
//         }
//
//         //封闭路径
//         this.ctx.lineTo(this.axisLength, this.mH);
//         this.ctx.lineTo(this.sX, this.mH);
//         this.ctx.lineTo(points[0][0], points[0][1]);
//         this.ctx.fillStyle = '#1c86d1';
//         this.ctx.fill();
//
//         this.ctx.restore();
//     };
//
// //写百分比文本函数
//     _progress.prototype.drawText = function () {
//         this.ctx.save();
//
//         var size = 0.4 * this.cR;
//         this.ctx.font = size + 'px Microsoft Yahei';
//         this.ctx.textAlign = 'center';
//         this.ctx.fillStyle = "rgba(06, 85, 128, 0.8)";
//         this.ctx.fillText(~~this.nowRange + '%', r, r + size / 2);
//
//         this.ctx.restore();
//     };
//
//     _progress.prototype.render = function () {
//         var _this = this;
//         // console.log(this.ctx);
//         this.ctx.clearRect(0, 0, this.mW, this.mH);
//
//         this.rangeValue = this.range.value;
//
//         if (this.IsdrawCircled == false) {
//             this.drawCircle();
//         }
//
//         if (this.nowRange <= this.rangeValue) {
//             var tmp = 1;
//             this.nowRange += tmp;
//         }
//
//         if (this.nowRange > this.rangeValue) {
//             var tmp = 1;
//             this.nowRange -= tmp;
//         }
//
//         this.drawSin(this.xOffset);
//         this.drawText();
//
//         this.xOffset += this.speed;
//         requestAnimationFrame(function () {
//             _this.render();
//         });
//     }
//
//     _progress.prototype.init = function () {
//         this.render();
//     };
//
//     return _progress;
//
// })();
//
// var progress = new Progress();
// progress.init();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var range = document.getElementById('range');
var statePoor = document.getElementById("statePoor");

//range控件信息
var rangeValue = range.value;
var nowRange = 0;	//用于做一个临时的range

var scale = document.documentElement.clientWidth / 750;

//画布属性
var mW = canvas.width = Math.ceil(300 * scale);
var mH = canvas.height = Math.ceil(300 * scale);
var lineWidth = 2 * scale;

//圆属性
var r = mH / 2; //圆心
var cR = r - Math.ceil(11 * lineWidth); //圆半径

//Sin 曲线属性
var sX = 0;
var sY = mH / 2;
var axisLength = mW; //轴长
var waveWidth = 0.02;   //波浪宽度,数越小越宽
var waveHeight = Math.ceil(16 * scale); //波浪高度,数越大越高
var speed = 0.02; //波浪速度，数越大速度越快
var xOffset = 0; //波浪x偏移量

ctx.lineWidth = lineWidth;

//画圈函数
var IsdrawCircled = false;
var drawCircle = function () {

    // ctx.beginPath();
    // ctx.strokeStyle = 'rgba(255,255,255,.2)';
    // ctx.arc(r, r, cR + Math.ceil(10 * scale), 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(r, r, cR, 0, 2 * Math.PI);
    // ctx.clip();

}

//画sin 曲线函数
var drawSin = function (xOffset) {
    ctx.save();

    var points = [];	//用于存放绘制Sin曲线的点

    ctx.beginPath();
    //在整个轴长上取点
    for (var x = sX; x < sX + axisLength; x += Math.ceil(20 * scale) / axisLength) {
        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        var y = -Math.sin((sX + x) * waveWidth + xOffset);

        var dY = mH * (nowRange / 100 );

        points.push([x, dY + y * waveHeight]);
        ctx.lineTo(x, dY + y * waveHeight);
    }
    //console.log(nowRange);
    //封闭路径
    ctx.lineTo(axisLength, mH);
    ctx.lineTo(sX, mH);
    ctx.lineTo(points[0][0], points[0][1]);
    (100-nowRange < 10) ? (ctx.fillStyle = 'rgba(255,57,57,1)',statePoor.className="statePoor active") : ctx.fillStyle = 'rgba(255,255,255,.2)';
    ctx.fill();

    ctx.restore();
};

//写百分比文本函数
var drawText = function () {
    ctx.save();

    var size = 0.4 * cR;
    ctx.font = size + 'px Microsoft Yahei';
    ctx.textAlign = 'center';
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText(~~nowRange + '%', r, r + size / 2);

    ctx.restore();
};

var render = function () {
    ctx.clearRect(0, 0, mW, mH);

    //rangeValue = range.value;

    if (IsdrawCircled == false) {
        drawCircle();
    }

    if (nowRange <= rangeValue) {
        var tmp = 1;
        nowRange += tmp;
    }

    if (nowRange > rangeValue) {
        var tmp = 1;
        nowRange -= tmp;
    }

    //console.log(100-nowRange);

    drawSin(xOffset);
    //drawText();

    xOffset += speed;
    requestAnimationFrame(render);
}

render();

/***/ })

},[6]);
//# sourceMappingURL=index.js.map