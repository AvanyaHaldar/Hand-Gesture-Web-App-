Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "'>";
    });
}

console.log("ml5 version = " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FQ1qOXm8e/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model is Loaded");
}

prediction = "";

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label == "Victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Wow! You Won The Drawing Competition, Congratulations";
        }

        if(results[0].label == "Thumbs Up"){
            document.getElementById("result_emoji").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "Thank You! I Am Going To Attend The Exam Today";
        }
        
        if(results[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Oh! The Food Is Delicious";
        }
    }
}

    