const constraints = {
  audio: true,
  video: false,
};

handleSuccess = function(stream) {
 const audioTracks = stream.getAudioTracks();
 const video = document.querySelector('audio');
 video.srcObject = stream;
};

handleError = function(error) {
 console.log('error: ', error);
};

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
