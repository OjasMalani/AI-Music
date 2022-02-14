song1= "";
song2= "";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1status= "";
song2status= "";

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(500,600);
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
    image(video,0,0,500,600);

    song1status= song1.isPlaying();
    song2status= song2.isPlaying();

    fill("orange")
    stroke("orange");

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();

        if(song1status== false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Stronger- by The Score";
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2status== false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan song";
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

