(async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('https://github.com/atulsharma1202112/face-api-facial-expression-recognition/blob/main/models/ssd_mobilenetv1_model-weights_manifest.json');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    
    const image = document.querySelector('img');
    const canvas = faceapi.createCanvasFromMedia(image);
    const detection = await faceapi.detectAllFaces(image)
                                    .withFaceLandmarks()
                                    .withFaceExpressions();

    const dimensions = {
        width: image.width,
        height: image.height
    };

    const resizedDimensions = faceapi.resizeResults(detection, dimensions);

    document.body.append(canvas);

    faceapi.draw.drawDetections(canvas, resizedDimensions);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
    faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
})();
