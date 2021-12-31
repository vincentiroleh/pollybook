const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require("path");
const logger = require('morgan')

// Load the SDK
const AWS = require("aws-sdk");

const app = express();

app.use(logger('dev'));

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});

app.get('/', (req, res) => {
    // const pdf_path = path.resolve("./books/sample.pdf");
    let dataBuffer = fs.readFileSync('./books/sample.pdf');
    // extract text from the pdf file
   pdf(dataBuffer).then(function(data) {
        res.send(data)
    })
    .catch(function(error){
        throw (error)
})
});

app.get('/polly', (req, res) => {
    const pdf_path = path.resolve("./books/sample.pdf");
    const filename = pdf_path.replace(/^.*?([^\\\/]*)$/, '$1');
    pdf(pdf_path)
        .then(data => {
            let params = {
                'Text': data.text,
                'OutputFormat': 'mp3',
                'VoiceId': 'Kimberly'
            };
            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        fs.writeFile(`./audio/${filename}.mp3`, data.AudioStream, function(err) {
                            if (err) {
                                return console.log(err)
                            }
                            res.send("The file was saved!")
                        })
                    }
                }
            })
        }).catch(err => console.log(err))
    
});


const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});