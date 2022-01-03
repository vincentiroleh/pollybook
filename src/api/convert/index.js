const pdf = require('pdf-parse');
const AWS = require("aws-sdk");


// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

const s3 = new AWS.S3();

const fileService = {
  async convert(req, res, next) {

    try {
      pdf(req.file.buffer)
        .then(data => {
          let params = {
            Text: data.text,
            OutputFormat: 'mp3',
            TextType: "text",
            VoiceId: 'Joanna'
          };

          Polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
              res.send(err.message)
            } else if (data) {
              let s3params = {
                Body: data.AudioStream,
                Bucket: "bookbank",
                Key: req.file.originalname+".mp3",
                ACL: "public-read",
                ContentType: "audio/mpeg"
              };

              s3.upload(s3params, function (err, data) {
                if (err) {
                  res.send(err);
                } else {
                  res.send({ link: data.Location });
                }
              });
            }
          })
        }).catch(err => res.send(err))

    } catch (err) { throw err }
  }
}

module.exports = fileService;