song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
  song = loadSound("HLO2156255.mp3");
}

function setup() {
  canvas = createCanvas(500, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function draw() {
  image(video, 0, 0, 500, 500);
  fill("#FF0000");
  stroke("#FF0000");
  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 && rightWrist <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWrist <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1);
    } else if (rightWristY > 200 & rightWrist <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 & rightWrist <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    } else if (rightWristY > 400) {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }

  }

  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY * 2);
    leftWristY_divide_1000 = new_leftWristY / 1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
    song.setVolume(leftWristY_divide_1000);
  }
}


function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modelLoaded() {
  console.log("poseNet is initialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
  }
}