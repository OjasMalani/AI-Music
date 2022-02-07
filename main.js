song1= "";
song2= "";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
 if(results.length>0){
    console.log(results);

    scoreLeftWrist= results[0].pose.keypoints[9].score;
    scoreRightWrist= results[0].pose.keypoints[10].score;
    console.log("Score left wrist="+scoreLeftWrist+", score right wrist= "+scoreRightWrist);

    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log("Left wrist x="+leftWristX+",Left wrist y= "+leftWristY);

    rightWristX= results[0].pose.rightWrist.x;
    rightWristY= results[0].pose.rightWrist.y;
    console.log("right wrist x="+rightWristX+",right wrist y= "+rightWristY);
}
}

function draw(){
    image(video,0,0,600,500);
}

