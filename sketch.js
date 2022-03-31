let captureGraphic;

function setup() {
  createCanvas(640, 480);
  captureGraphic = createGraphics(640, 480);

  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0);

  const code = getCodeFromCapture(capture, captureGraphic);
  if (code) {
    print(code.data);

    // QRコードを囲むように線を引く
    const pos = code.location;
    noFill();
    stroke(255, 0, 0);
    strokeWeight(10);
    beginShape();
    vertex(pos.topLeftCorner.x, pos.topLeftCorner.y);
    vertex(pos.topRightCorner.x, pos.topRightCorner.y);
    vertex(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
    vertex(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
    endShape(CLOSE);

    // ついでにテキスト
    stroke(0);
    strokeWeight(1);
    text(code.data, pos.topLeftCorner.x, pos.topLeftCorner.y);
  }
}

function getCodeFromCapture(cap, g) {
  g.image(cap, 0, 0, cap.width, cap.height);
  const imgData = g.elt
    .getContext("2d")
    .getImageData(0, 0, cap.width, cap.height).data;

  return jsQR(imgData, cap.width, cap.height);
}
