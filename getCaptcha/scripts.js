let audioCaptcha;
let captchaElements; 
let captchaElement;
let siteKey;

window.onload = () => {
  captchaElements = document.getElementsByClassName('audioCaptcha');
  captchaElement = captchaElements[0];

  siteKey = captchaElement.getAttribute('data-sitekey');

  audioCaptcha = new Audio();
  console.log(siteKey);

  //updateCaptcha();               // UNCOMMENT
  audioCaptcha = new Audio('default.mp3'); // DELETE
  
  captchaElement.innerHTML = '<form onsubmit="validateInput(audioCaptchaInput)">Guess: '
    + '<input type="type" name="audioCaptchaInput"><input type="submit" value="Submit"></form>'
    + '<button onclick="playCaptcha()">PLAY</button>'
    + '<button onclick="updateCaptcha()">RETRY</button>';
}

/*
let siteKeys = [];

console.log(captchaElement[0]);
captchaElements.forEach((captchaElement) => {
  siteKeys.push(captchaElement.getAttribute('data-sitekey');
});
*/

function validateInput(inputFieldName) {
  let input = document.getElementsByName(inputFieldName.name)[0].value;

  // Hello world is always the answer
  if (input == "Hello, World!") {
    console.log("success"); // run callback provided by user
  } else {
    console.log("failure"); // run failure function if provided
  }
  alert("CHECK");
}

function updateAnalytics() {
  // updateUserRequestData(siteKey);
  // --> Records number of requests and number of 
}

function updateCaptcha() {
  // Get words + other sounds --> Combine
  // Validate effective distortion
  audioCaptcha = new Audio('mystery.mp3');
  updateAnalytics(siteKey);
}

function playCaptcha() {
  audioCaptcha.play();
}
