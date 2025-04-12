// Fish coordinates
let fishTemplate = [
  [-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], 
  [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]
];
let fishes = [];
let colors = ["#03045E", "#90E0EF", "#0077B6", "#00B4D8", "#ffc8dd", "#fcbf49"];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3');
}

function setup() {
  //畫布充滿視窗
  createCanvas(windowWidth, windowHeight);//建立畫布 畫布寬為視窗寬 高為視窗高

  for (let i = 0; i < 50; i++) {
    let scale = random(0.25, 3);
    fishes.push({
      x: width / 2,
      y: height / 2,
      dx: random(-2, 2) * scale / 2,
      dy: random(-2, 2) * scale / 2,
      points: fishTemplate.map(p => [p[0] * scale / 4, p[1] * scale / 4]),
      color: random(colors)
    });
  }

  amplitude = new p5.Amplitude();
  song.loop();
}

function draw() {//畫圖
  background("#fb8500");//背景

  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.8, 1.2);

  for (let fish of fishes) {
    fish.x += fish.dx;
    fish.y += fish.dy;
    if (fish.x < 0 || fish.x > width) fish.dx *= -1;
    if (fish.y < 0 || fish.y > height) fish.dy *= -1;

    stroke("#03071e");//邊框顏色 黑色
    fill(fish.color);//填充顏色 隨機顏色

    beginShape();
    for (let i = 0; i < fish.points.length; i++) {
      let x = map(fish.points[i][0] * sizeFactor, -10, 10, 0, width) + fish.x - width / 2;
      let y = map(fish.points[i][1] * sizeFactor, -10, 10, height, 0) + fish.y - height / 2;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}