const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileService = require('./convert');

router.post('/upload', upload.single('file'), fileService.convert);

module.exports = router;