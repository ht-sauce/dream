import SimplexNoise from "./simplex-noise";
let canvas, ctx;
let width, height, ratio;
let mousePos;
let TAU = Math.PI * 2;

let shapes = [];

let noise = new SimplexNoise();
let map = 400; // 300
let scale = 120; // 70
let size = 5;
let speed = 12;
let instances = 300;

function metrics() {
  ratio = window.devicePixelRatio || 1;
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  width = window.innerWidth * ratio;
  height = window.innerHeight * ratio;

  canvas.width = width * ratio;
  canvas.height = height * ratio;

  canvas.onclick = go;
  canvas.addEventListener(
    "mousemove",
    function(e) {
      mouseMove(e);
    },
    false
  );
}

function mouseMove(e) {
  let rect = e.target.getBoundingClientRect();
  mousePos = new Point(
    (e.clientX - rect.left) * ratio,
    (e.clientY - rect.top) * ratio
  );
}

function update() {
  // SHAPES //
  let l = shapes.length;
  for (let i = 0; i < l; i++) {
    shapes[i].update();
  }
}

function draw() {
  // BG //
  BG();

  // SHAPES //
  let l = shapes.length;
  for (let i = 0; i < l; i++) {
    shapes[i].draw();
  }
}

function BG() {
  // BG //
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}

function generate(n, x, y) {
  shapes = [];
  for (let i = 0; i < n; i++) {
    shapes.push(new Shape(x, y));
  }
  BG();
}

function Shape(ix, iy) {
  this.x = ix || Math.random() * width;
  this.y = iy || Math.random() * height;

  this.points = [];
  let x = this.x + noise.noise2D(this.x / map, this.y / map) * scale;
  let y = this.y + noise.noise2D(this.y / map, this.x / map) * scale;
  for (let h = 0; h < size; h++) {
    this.points.push(new Point(x, y));
  }

  this.xSpeed = mod(speed);
  this.ySpeed = mod(speed);

  let angle = Math.random() * TAU;
  let vector = vectorFromAngle(angle);
  let s = Math.random() * speed;

  this.xSpeed = vector.x * s;
  this.ySpeed = vector.y * s;

  this.energy = 0;
}

Shape.prototype.update = function() {
  // move //
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  // add noise offset //
  let xn = noise.noise2D(this.x / map, this.y / map) * scale;
  let yn = noise.noise2D(this.y / map, this.x / map) * scale;
  let x = this.x + xn;
  let y = this.y + yn;
  this.points[0].x = x;
  this.points[0].y = y;

  // memory trail //
  let sl = this.points.length;
  for (let h = sl - 1; h > 0; h--) {
    this.points[h].x = this.points[h - 1].x;
    this.points[h].y = this.points[h - 1].y;
  }

  // energy //
  this.energy = distance(this.points[1], this.points[2]) * 0.1;
};

Shape.prototype.draw = function() {
  ctx.strokeStyle = "white";
  ctx.lineCap = "round";
  ctx.lineWidth = this.energy * ratio;
  ctx.beginPath();

  let sl = this.points.length;
  for (let h = 0; h < sl; h++) {
    let x = this.points[h].x;
    let y = this.points[h].y;

    if (h === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
};

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function mod(n) {
  return Math.random() * n - n / 2;
}

function distance(p1, p2) {
  let a = p1.x - p2.x;
  let b = p1.y - p2.y;
  return Math.sqrt(a * a + b * b);
}

function vectorFromAngle(angle) {
  return new Point(Math.cos(angle), Math.sin(angle));
}

function go() {
  noise = new SimplexNoise();
  metrics();
  if (mousePos) {
    generate(instances, mousePos.x, mousePos.y);
  } else {
    generate(instances);
  }
}

function loop() {
  update();
  draw();
  window.requestAnimationFrame(loop);
}

/*go();
loop();*/
export default {
  go,
  loop
};
