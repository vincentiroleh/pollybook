const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require("path");

// Load the SDK
const AWS = require("aws-sdk");

const app = express();

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});

// const pdf_path = path.resolve("./books/sample.pdf");


app.get('/', (req, res) => {
    // const pdf_path = path.resolve("./books/sample.pdf");
    let dataBuffer = fs.readFileSync('./books/sample.pdf');
    // extract text from the pdf file
   pdf(dataBuffer).then(function(data) {
        res.send(data.text)
    })
    .catch(function(error){
        throw (error)
})
});

app.get('/polly', (req, res) => {
    const pdf_path = path.resolve("./books/sample.pdf");
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
                        fs.writeFile("./book.mp3", data.AudioStream, function(err) {
                            if (err) {
                                return console.log(err)
                            }
                            res.send("The file was saved!")
                        })
                    }
                }
            })
        }).catch(err => console.log(err))
    
})


const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});