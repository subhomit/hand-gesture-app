prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function start_capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result_image").innerHTML = "<img id='capturedImg' src = '" + data_uri + "'>";
    });
}
console.log("ml5 version :",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wNBLIf1jN/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    synth = window.speechSynthesis;
    speakSynth1 = "The first Prediction is " + prediction_1;
    speakSynth2 = "The second Prediction is " + prediction_2;
    tts = new SpeechSynthesisUtterance(speakSynth1 + speakSynth2);
    synth.speak(tts);
}
function compare(){
    img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotions1").innerHTML = results[0].label;
        document.getElementById("emotions2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(prediction_1 == "Amazing"){
            document.getElementById("emojies1").innerHTML = "&#128076;"
        }
        if(prediction_1 == "Best"){
            document.getElementById("emojies1").innerHTML = "&#128077;"
        }
        if(prediction_1 == "Victory"){
            document.getElementById("emojies1").innerHTML = "&#128079;"
        }
        if(prediction_2 == "Amazing"){
            document.getElementById("emojies2").innerHTML = "&#128076;"
        }
        if(prediction_2 == "Best"){
            document.getElementById("emojies2").innerHTML = "&#128077;"
        }
        if(prediction_2 == "Victory"){
            document.getElementById("emojies2").innerHTML = "&#128079;"
        }
    }
}

