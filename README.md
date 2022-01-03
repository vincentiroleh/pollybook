## BookPolly

BookPolly is an API as a Service that allows you convert your pdf files into Audio.

### Tools Used

- AWS Polly
- Node.js / Express.js

---
## Testing

> Pollybook can only process files less than or equal to `1500 characters` - We're still `under development`

**Using curl**

```bash
curl -X POST -F 'file=@<FILEPATH>' https://pollybook.herokuapp.com/upload
```

**Example on a Windows Machine:**

    `curl -X POST -F 'file=@/c/Users/Iroleh/Desktop/sample.pdf' https://pollybook.herokuapp.com/upload`

**Example on a Linux Machine:**

    `curl -X POST -F 'file=@/home/iroleh/sample.pdf' https://pollybook.herokuapp.com/upload`

**Response Sample:**

`{"link":"https://bookbank.s3.amazonaws.com/sample.pdf.mp3"}`

> Use the returned response link to listen to your audio

## Setup the Environment Locally

* Install Node.js / NPM
* Run `npm install` to install the necessary dependencies
* Create `.env` file and update the info with the example at ['.env.example']('https://github.com/vincentiroleh/bookbank/blob/main/.env.example')

### Running `app.py`

1. Standalone:  `npm start`
2. Run in nodemon:  `npm run dev`

### Contribution / Report 

Found an issue or need help with Pollybook send a mail to irolehiroleh@gmail.com 