const textToSpeech = require('@google-cloud/text-to-speech');

/**
* A function that wraps around the Google Cloud Text-to-Speech API to
* generate binary audio content from an array of strings.
*
* @param {Array} text array of strings
* @returns {Object}
*/
module.exports = (text = [], context, callback) => {
  const client = new textToSpeech.TextToSpeechClient();
  const textToSynthesize = text.join(',');
  const request = {
    input: { text: textToSynthesize },
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'}
  };

  client.synthesizeSpeech(request, (err, response) => {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, response.audioContent);
  });
};
