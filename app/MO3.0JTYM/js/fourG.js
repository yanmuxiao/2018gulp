webpackJsonp([2],{

/***/ 5:
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

    var RrogressCircle = (function () {

        //
        function bgCircle(_this, color) {
            var ctx = _this.ctx;
            ctx.beginPath();
            ctx.arc(_this.cPosX, _this.cPosY, _this.canvas.width / 2 - 20, 0, Math.PI * 2);
            ctx.closePath();
            ctx.lineCap = "round";
            ctx.lineWidth = _this.canvas.width / 2 / 25;
            ;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        //
        function progCircle(_this, color) {
            var ctx = _this.ctx;
            ctx.beginPath();
            ctx.arc(_this.cPosX, _this.cPosY, _this.canvas.width / 2 - 20, 0, 2 * Math.PI * _this.percent, true);
            ctx.lineCap = "round";
            ctx.lineWidth = _this.canvas.width / 2 / 25;
            ctx.strokeStyle = color;
            ctx.stroke();
            // console.log(_this.percent);
            // _this.circle.style.transform = "rotate(" + (94 - 360 * (1-_this.percent)) + "deg)";
        }

        function proBg(_this) {
            var img = new Image()
            img.src = '../images/c_light.png';
            img.onload = function () {
                // 绘制图像
                _this.ctx.drawImage(img, 0, 0, _this.canvas.width, _this.canvas.height);
            }
            _this.ctx.rotate(45);
        }

        function _progressCircle(canvasId) {
            this.canvas = document.querySelector(canvasId);
            this.ctx = this.canvas.getContext("2d");
            // this.circle = this.canvas.parentNode.querySelector("img");
            this.percent = (100 - this.canvas.dataset.progress) / 100;
            this.canvas.width = this.canvas.parentNode.offsetWidth;
            this.canvas.height = this.canvas.parentNode.offsetHeight;
            this.cPosX = this.canvas.width / 2;
            this.cPosY = this.canvas.height / 2;
        }

        _progressCircle.prototype.init = function () {
            bgCircle(this, "rgba(255,255,255,0.2)");
            progCircle(this, "#fff");
            //proBg(this);
        };

        return _progressCircle;

    })();

    var rc01 = new RrogressCircle("#canvas");
    rc01.init();
});

/***/ })

},[5]);
//# sourceMappingURL=fourG.js.map