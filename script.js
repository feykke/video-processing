const video = document.getElementById("video-input");

async function startVideo () {

    const stream = await navigator.mediaDevices.getUserMedia({video: true});
    

    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture(video);

    video.srcObject = stream;

    function processVideo() {
        const FPS = 30;
        
        let begin = Date.now();

        cap.read(src);
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.imshow("canvas-output", gray);

        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }

    setTimeout(processVideo, 0);

};

window.addEventListener("DOMContentLoaded", startVideo);