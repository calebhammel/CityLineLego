var song;
var amp;
var button;
var mic;

var volhistory = [];
var volmichistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('audio.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  button = createButton('Toggle Song Playing');
  button.position(19, 19);
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
}

function touchStarted() { getAudioContext().resume(); } 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  var micvol = mic.getLevel();
  volhistory.push(vol);
  volmichistory.push(micvol);
  stroke(255);
  noFill();

  translate(width /2, height/2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    //var r = map(volhistory[i], 0, 1, 100, 1000);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volmichistory[i], 0, 1, 100, 1000);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volmichistory.length > 360) {
    volmichistory.splice(0, 1);
}
}