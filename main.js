function preload() {
   classifier = ml5.imageClassifier("DoodleNet")
}

function setup() {
  canvas = createCanvas(400, 400)
  canvas.center()
  background("white")
  canvas.mouseReleased(release)
  synth = window.speechSynthesis
}

function draw() {
  strokeWeight(13)
  stroke(0)
  if (mouseIsPressed) {
     line(pmouseX, pmouseY, mouseX, mouseY)
  }
}

function release() {
  classifier.classify(canvas, gotResult)
}

function gotResult(error, results) {
   if (error) {
     console.log(error)
   }
   document.getElementById("name").innerHTML = "Label: " + results[0].label
   document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100)
   utterThis= new SpeechSynthesisUtterance(results[0].label)
   synth.speak(utterThis)
}

function clearcanvas() {
    background("white")
}