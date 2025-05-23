let facemesh;
let video;
let predictions = [];
const points = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
  76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, () => {
    console.log("Camera initialized");
  });
  video.size(640, 480);

  // 將相機視窗放置在畫布的最上方
  video.style('position', 'absolute');
  video.style('top', '0px');
  video.style('left', '0px');
  video.style('z-index', '1'); // 確保相機在最上層

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  // 在畫布上繪製紅色線條
  stroke(255, 0, 0); // 紅色線條
  strokeWeight(15); // 線條粗細
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
