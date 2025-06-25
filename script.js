let stepSlider;
let palette = [];
let margin = 30;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  rectMode(CORNER);
  noLoop();

  stepSlider = select('#stepSlider');
  stepSlider.input(drawComposition);

  palette = [
    color(255),           // Bianco
    color(0),             // Nero
    color(255, 0, 0),     // Rosso
    color(0, 0, 255),     // Blu
    color(255, 255, 0),   // Giallo
    color(140, 140, 140), // Grigio
  ];

  drawComposition();
}

function draw() {
  // no drawing here
}

function drawComposition() {
  background(255);

  let step = stepSlider.value();
  let cols = int((width - 2 * margin) / step);
  let rows = int((height - 2 * margin) / step);

  stroke(0);
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y <= rows; y++) {
      let posX = margin + x * step;
      let posY = margin + y * step;

      strokeWeight(10);
      line(posX, posY, posX + step, posY + step);
      line(posX + step, posY, posX, posY + step);
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let posX = margin + x * step;
      let posY = margin + y * step;

      if (random(1) < 0.5) {
        let w = step;
        let h = step;

        if (random(1) < 0.3) {
          w = constrain(step * 2, 0, width - posX - margin);
        }
        if (random(1) < 0.3) {
          h = constrain(step * 2, 0, height - posY - margin);
        }

        let fillCol = palette[int(random(palette.length))];
        fill(fillCol);
        noStroke();
        rect(posX, posY, w, h);

        noFill();
        stroke(0);
        strokeWeight(10);
        rect(posX, posY, w, h);
      }
    }
  }
}

function mousePressed() {
  drawComposition();
}
