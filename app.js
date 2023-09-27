const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const aws = require('aws-sdk');
const multer = require('multer');
const { UploadFile } = require('./function');
const multerS3 = require('multer-s3');
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express();
const ipAddress = '192.168.1.185'
app.use(cors());
app.use(fileUpload());


const port = process.env.PORT || 5001;

app.post('/uploadFile', UploadFile);

app.listen(port, ipAddress, () => {
    console.log(`Server is running on http://${ipAddress}:${port}`);
});
