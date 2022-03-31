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
    console.log("found!", code);
  }
}

function getCodeFromCapture(cap, g) {
  g.image(cap, 0, 0, cap.width, cap.height);
  const imgData = g.elt
    .getContext("2d")
    .getImageData(0, 0, cap.width, cap.height).data;

  return jsQR(imgData, cap.width, cap.height);
}
