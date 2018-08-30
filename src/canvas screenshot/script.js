/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';
// const constraints = window.constraints = {
//   audio: false,
//   video: true
// };
const qvgaConstraints = {
  // video: {width: {exact: 320}, height: {exact: 240}}
  video: {width: {exact: 40}, height: {exact: 40}}
};

const vgaConstraints = {
  // video: {width: {exact: 640}, height: {exact: 480}}
  video: {width: {exact: 40}, height: {exact: 40}}
};

const hdConstraints = {
  // video: {width: {exact: 1280}, height: {exact: 720}}
  video: {width: {exact: 40}, height: {exact: 40}}
};

const fullHdConstraints = {
  // video: {width: {exact: 1920}, height: {exact: 1080}}
  video: {width: {exact: 40}, height: {exact: 40}}
};

const fourKConstraints = {
  // video: {width: {exact: 4096}, height: {exact: 2160}}
  video: {width: {exact: 40}, height: {exact: 40}}
};

const eightKConstraints = {
  video: {width: {exact: 7680}, height: {exact: 4320}}
  // video: {width: {exact: 40}, height: {exact: 40}}
};

let constraints = vgaConstraints;
let stream;


const video = document.querySelector('video');
const button = document.querySelector('button');
const filterSelect = document.querySelector('select#filter');
const resolutionSelect = document.querySelector('select#resolution');

function handleSuccess(mediaStream) {
  const videoTracks = mediaStream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  stream = window.stream = mediaStream; // make variable available to browser console
  video.srcObject = mediaStream;
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    let v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.log(error);
  }
}
filterSelect.onchange = function() {
  video.className = filterSelect.value;
};

resolutionSelect.onchange = function() {
  constraints = eval(resolutionSelect.value + 'Constraints');

  console.log('cosntraints', constraints);
  startStreaming(constraints);
};


button.onclick = function(){
  let x = document.createElement('canvas');
  x.width = 100;
  x.height = 90;
  x.className = filterSelect.value;
  x.getContext('2d').drawImage(video, 0, 0, x.width, x.height);
  let y = document.getElementById('canvas-container');
  y.append(x);
};

function startStreaming(constraints) {
  if (stream) {
    console.log('video already streaming');
    stream.getTracks()[0].stop();
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);
}

