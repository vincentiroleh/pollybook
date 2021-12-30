const express = require('express');
const pdfUtil = require('pdf-to-text');

const app = express();
const pdf_path = "sample.pdf";

app.get('/text', (req, res) => {
    // extract text from the pdf file
    pdfUtil.pdfToText(pdf_path, (err, data) => {
        if (err) throw (err);
        res.send(data);
    });
});


app.get('/info', (req, res) => {
    // extract text from the pdf file
    pdfUtil.info(pdf_path, (err, info) => {
        if (err) throw (err);
        res.send(info)
    });
});



port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


// return info about the pdf
pdfUtil.info(pdf_path, function (err, info) {
    if (err) throw (err);
    return (info);
});


