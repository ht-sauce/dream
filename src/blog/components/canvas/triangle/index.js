/* eslint-disable */
import Delaunator from 'delaunator';

class Thpace {
  constructor(canvas, settings) {
    if (!canvas) {
      console.log("Need a valid canvas element.");
      return;
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.triangles = [];
    this.particles = [];
    this.coordinateTable = {};
    this.baseCoordinateTable = {};
    this.settings = extend(
      {
        triangleSize: 130,
        bleed: 200,
        noise: 60,
        color1: "#360033",
        color2: "#0b8793",
        pointVariationX: 20,
        pointVariationY: 35,
        pointAnimationSpeed: 15,
        image: false,
        imageOpacity: 0.4
      },
      settings
    );

    // window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.gradientOpacity = 1;
  }

  animate() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    this.triangles.forEach(t => {
      ctx.beginPath();

      var coords = [];
      coords.push({ x: t[0][0], y: t[0][1] });
      coords.push({ x: t[1][0], y: t[1][1] });
      coords.push({ x: t[2][0], y: t[2][1] });

      var color = t[3];

      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      var dp = [0, 1, 2, 0];
      dp.forEach((el, ind) => {
        if (
          this.coordinateTable[coords[el].x] &&
          this.coordinateTable[coords[el].x][coords[el].y] != undefined
        ) {
          var c = { x: coords[el].x, y: coords[el].y };
          var change = this.coordinateTable[coords[el].x][coords[el].y];

          if (ind == 0) {
            ctx.moveTo(c.x + change.x, c.y + change.y);
          } else {
            ctx.lineTo(c.x + change.x, c.y + change.y);
          }
        }
      });

      ctx.fill();
      ctx.stroke();
    });

    this.particles.forEach(p => {
      p.update();
    });

    this.particles.forEach(p => {
      p.draw();
    });

    if (this.settings.image) {
      var pat = ctx.createPattern(this.settings.image, "repeat");
      ctx.globalAlpha = this.settings.imageOpacity;
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.globalAlpha = 1;
    }

    this.animateCoordinateTable();
    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    this.animate();
  }

  generateTriangles() {
    var points = [];
    var coordinateTable = {};
    points.push([0, 0]);
    points.push([0, this.height]);
    points.push([this.width, 0]);
    points.push([this.width, this.height]);

    var bleed = this.settings.bleed;
    var size = this.settings.triangleSize;
    var noise = this.settings.noise;

    for (var i = 0 - bleed; i < this.width + bleed; i += size) {
      for (var j = 0 - bleed; j < this.height + bleed; j += size) {
        var x = i + getRandomInt(0, noise);
        var y = j + getRandomInt(0, noise);
        points.push([x, y]);
      }
    }

    const delaunay = Delaunator.from(points);
    const triangleList = delaunay.triangles;

    var coordinates = [];

    for (let i = 0; i < triangleList.length; i += 3) {
      var t = [
        points[triangleList[i]],
        points[triangleList[i + 1]],
        points[triangleList[i + 2]]
      ];

      var coords = [];
      coords.push({ x: t[0][0], y: t[0][1] });
      coords.push({ x: t[1][0], y: t[1][1] });
      coords.push({ x: t[2][0], y: t[2][1] });

      var color = gradient(
        getCenter(coords),
        this.width,
        this.height,
        this.settings.color1,
        this.settings.color2
      );

      t.push(color);

      for (var j = 0; j <= 2; j++) {
        var p = points[triangleList[i + j]];
        var x = p[0];
        var y = p[1];
      }

      coordinates.push(t);
    }

    var baseCoordinateTable = {};
    coordinates.forEach(t => {
      t.forEach(p => {
        var x = p[0];
        var y = p[1];

        if (!coordinateTable[x]) {
          coordinateTable[x] = {};
        }

        var per = x / this.width;

        coordinateTable[x][y] = 0;

        if (!baseCoordinateTable[x]) {
          baseCoordinateTable[x] = {};
        }
        baseCoordinateTable[x][y] = per * 2 * Math.PI;
      });
    });

    this.triangles = coordinates;
    this.coordinateTable = coordinateTable;
    this.baseCoordinateTable = baseCoordinateTable;
  }

  generateParticles() {
    var particles = [];
    for (var i = 0; i < 250; i++) {
      var pSet = {
        ctx: this.ctx,
        width: this.width,
        height: this.height
      };
      particles.push(new Particle(pSet));
    }
    this.particles = particles;
  }

  animateCoordinateTable() {
    Object.keys(this.coordinateTable).forEach(x => {
      Object.keys(this.coordinateTable[x]).forEach(y => {
        this.baseCoordinateTable[x][y] +=
          this.settings.pointAnimationSpeed / 1000;

        // console.log(this.baseCoordinateTable[x][y]);

        var changeX =
          Math.cos(this.baseCoordinateTable[x][y]) *
          this.settings.pointVariationX;
        var changeY =
          Math.sin(this.baseCoordinateTable[x][y]) *
          this.settings.pointVariationY;

        this.coordinateTable[x][y] = {
          x: changeX,
          y: changeY
        };
      });
    });
  }

  resize() {
    var p = this.canvas.parentElement;
    this.canvas.width = p.clientWidth;
    this.canvas.height = p.clientHeight;
    this.width = p.clientWidth;
    this.height = p.clientHeight;

    this.generateTriangles();
    this.generateParticles();
  }
}

class Particle {
  constructor(pSet) {
    this.ctx = pSet.ctx;
    this.x = getRandomInt(0, pSet.width);
    this.y = getRandomInt(0, pSet.height);
    this.ox = this.x;
    this.oy = this.y;

    this.interval = getRandomInt(1000, 5000);
    this.limit = getRandomInt(5, 15);
    this.opacity = getRandomFloat(0.1, 0.7);
    this.r = getRandomFloat(1, 2);
  }
  update() {
    this.x = this.ox + Math.cos(performance.now() / this.interval) * this.limit;
    this.y =
      this.oy + (Math.sin(performance.now() / this.interval) * this.limit) / 2;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(255,255,255, " + this.opacity + ")";
    this.ctx.fill();
  }
}

function gradient(coords, width, height, leftColor, rightColor) {
  var x = coords.x;
  var y = coords.y;

  var per = 0;

  per = x / width;

  var per2 = 0;

  per2 = y / height;

  per = (per2 + per) / 2;

  if (per > 1) {
    per = 1;
  } else if (per < 0) {
    per = 0;
  }

  var color1 = leftColor;
  var color2 = rightColor;
  var hex = function(x) {
    x = x.toString(16);
    return x.length == 1 ? "0" + x : x;
  };

  var r = Math.ceil(
    parseInt(color1.substring(1, 3), 16) * per +
      parseInt(color2.substring(1, 3), 16) * (1 - per)
  );
  var g = Math.ceil(
    parseInt(color1.substring(3, 5), 16) * per +
      parseInt(color2.substring(3, 5), 16) * (1 - per)
  );
  var b = Math.ceil(
    parseInt(color1.substring(5, 7), 16) * per +
      parseInt(color2.substring(5, 7), 16) * (1 - per)
  );

  var middle = "#" + hex(r) + hex(g) + hex(b);

  // if (up) {
  //     offset += 6;
  // }
  // if (offset > width * 2) {
  //     offset = 0;
  // }
  // if (debug) {

  //     //console.log(per);
  // }

  return middle;
}

function getPointBetweenPoints(p1, p2, d) {
  var dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  var t = d / dist;
  return {
    x: (1 - t) * p1.x + t * p2.x,
    y: (1 - t) * p1.y + t * p2.y
  };
}

function getCenter(coords) {
  var sumX = 0;
  var sumY = 0;

  coords.forEach(p => {
    sumX += p.x;
    sumY += p.y;
  });

  return { x: sumX / coords.length, y: sumY / coords.length };
}

var extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i]) continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
    }
  }

  return out;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function rgbaFromHex(hex, a) {
  var rgb = hexToRgb(hex);

  return getRGBA(rgb.r, rgb.g, rgb.b, a);
}

function getRGBA(r, g, b, a) {
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

/*let canvas = document.getElementById("canvas");

let spaceboi = new Thpace(canvas);

spaceboi.start();*/
export default Thpace;
