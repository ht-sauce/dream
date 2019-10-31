/*
使用模式
//传入canvas id
    var writeCanvas = new WriteFont("canvas", {
      borderWidth: 10, //方格写字模式笔触宽度
      writeWidth: 1, //签名模式笔触宽度
      borderColor: "#ff6666", //边框线颜色
      isWriteName: true //签名模式,false为方格写字模式
    });

    document.getElementById("clear").onclick = function() {
      writeCanvas.option.control.clearCanvas();
    };

    document.getElementById("save").onclick = function() {
      writeCanvas.saveAsImg(e => {
        console.log(e);
      });
    };

*/
function WriteFont(id, options) {
  var self = this;
  this.canvas = document.getElementById(id);
  var obj = {
    canvas: this.canvas,
    context: this.canvas.getContext("2d"),
    isWrite: false, //是否开始
    lastWriteTime: -1,
    lastWriteSpeed: 0,
    lastWriteWidth: 0,
    canvasWidth: 600, //canvas宽高
    canvasHeight: 600,
    isShowBorder: true, //是否显示网格
    bgColor: "#fff", //背景色
    borderWidth: options.borderWidth, // 网格线宽度
    borderColor: "#fff", //网格颜色
    lastPoint: {}, //
    writeWidth: 2, //基础轨迹宽度
    maxWriteWidth: 30, // 写字模式最大线宽
    minWriteWidth: 1, // 写字模式最小线宽
    writeColor: "#000", // 轨迹颜色
    isWriteName: false //签名模式
  };

  for (var name in options) {
    obj[name] = options[name];
  }

  /**
   * 轨迹宽度
   */
  this.setLineWidth = function() {
    var nowTime = new Date().getTime();
    var diffTime = nowTime - obj.lastWriteTime;
    obj.lastWriteTime = nowTime;
    var returnNum =
      obj.minWriteWidth +
      ((obj.maxWriteWidth - obj.minWriteWidth) * diffTime) / 30;
    if (returnNum < obj.minWriteWidth) {
      returnNum = obj.minWriteWidth;
    } else if (returnNum > obj.maxWriteWidth) {
      returnNum = obj.maxWriteWidth;
    }

    returnNum = returnNum.toFixed(2);
    //写字模式和签名模式
    if (obj.isWriteName) {
      obj.context.lineWidth = obj.writeWidth;
    } else {
      obj.context.lineWidth = obj.lastWriteWidth =
        (obj.lastWriteWidth / 4) * 3 + returnNum / 4;
    }
  };

  /**
   * 绘制轨迹
   */
  this.writing = function(point) {
    obj.context.beginPath();
    obj.context.moveTo(obj.lastPoint.x, obj.lastPoint.y);
    obj.context.lineTo(point.x, point.y);
    self.setLineWidth();
    obj.context.stroke();
    obj.lastPoint = point;
    obj.context.closePath();
  };

  /**
   * 轨迹样式
   */
  this.writeContextStyle = function() {
    obj.context.beginPath();
    obj.context.strokeStyle = obj.writeColor;
    obj.context.lineCap = "round";
    obj.context.lineJoin = "round";
  };

  /**
   * 写开始
   */
  this.writeBegin = function(point) {
    obj.isWrite = true;
    obj.lastWriteTime = new Date().getTime();
    obj.lastPoint = point;
    self.writeContextStyle();
  };

  /**
   * 写结束
   */
  this.writeEnd = function() {
    obj.isWrite = false;
  };

  /**
   * 清空画板
   */
  this.canvasClear = function() {
    obj.context.save();
    obj.context.strokeStyle = "#fff";
    obj.context.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);
    if (obj.isShowBorder && !obj.isWriteName) {
      obj.context.beginPath();
      var size = obj.borderWidth / 2;
      //画外面的框
      obj.context.moveTo(size, size);
      obj.context.lineTo(obj.canvasWidth - size, size);
      obj.context.lineTo(obj.canvasWidth - size, obj.canvasHeight - size);
      obj.context.lineTo(size, obj.canvasHeight - size);
      obj.context.closePath();
      obj.context.lineWidth = obj.borderWidth;
      obj.context.strokeStyle = obj.borderColor;
      obj.context.stroke();
      //画里面的框
      obj.context.moveTo(0, 0);
      obj.context.lineTo(obj.canvasWidth, obj.canvasHeight);
      obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
      obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
      obj.context.lineTo(0, obj.canvasHeight / 2);
      obj.context.lineTo(0, obj.canvasHeight);
      obj.context.lineTo(obj.canvasWidth, 0);
      obj.context.lineTo(obj.canvasWidth / 2, 0);
      obj.context.lineTo(obj.canvasWidth / 2, obj.canvasHeight);
      obj.context.stroke();
    }
    obj.context.restore();
  };

  /**
   * 保存图片 格式base64
   */
  this.saveAsImg = function(callback) {
    var image = new Image();
    image.src = this.canvas.toDataURL("image/png");
    if (image.src === this.emptyCanvas) {
      callback(false);
    } else {
      callback(image.src);
    }
  };

  /**
   * 初始化画板
   */
  this.canvasInit = function() {
    this.canvas.width = obj.canvasWidth;
    this.canvas.height = obj.canvasHeight;
    this.emptyCanvas = this.canvas.toDataURL("image/png");
  };

  /**======================事件绑定===========================**/

  this.canvas.addEventListener("mousedown", function(e) {
    var point = {
      x: e.offsetX || e.clientX,
      y: e.offsetY || e.clientY
    };
    self.writeBegin(point);
  });

  this.canvas.addEventListener("mouseup", function(e) {
    var point = {
      x: e.offsetX,
      y: e.offsetY
    };
    self.writeEnd(point);
  });

  this.canvas.addEventListener("mouseleave", function(e) {
    var point = {
      x: e.offsetX,
      y: e.offsetY
    };
    self.writeEnd(point);
  });

  this.canvas.addEventListener("mousemove", function(e) {
    if (obj.isWrite) {
      var point = {
        x: e.offsetX,
        y: e.offsetY
      };

      self.writing(point);
    }
  });

  //移动端
  this.canvas.addEventListener("touchstart", function(e) {
    var touch = e.targetTouches[0];
    var point = {
      x: touch.pageX || touch.clientX,
      y: touch.pageY || touch.clientY
    };
    self.writeBegin(point);
  });
  this.canvas.addEventListener("touchend", function(e) {
    var touch = e.changedTouches[0];
    var point = {
      x: touch.pageX,
      y: touch.pageY
    };
    self.writeEnd(point);
  });
  this.canvas.addEventListener("touchmove", function(e) {
    var touch = e.targetTouches[0];
    var point = {
      x: touch.pageX,
      y: touch.pageY
    };
    self.writeEnd(point);
  });
  this.canvas.addEventListener("touchmove", function(e) {
    var touch = e.targetTouches[0];
    var point = {
      x: touch.pageX,
      y: touch.pageY
    };
    self.writing(point);
  });

  this.canvasInit();
  this.canvasClear();

  this.option = obj;
  obj.control = {
    clearCanvas: self.canvasClear
  };
}

export default WriteFont;
