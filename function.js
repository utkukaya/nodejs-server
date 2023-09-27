const AWS = require('aws-sdk'); 

// const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com'); 
// const s3 = new AWS.S3({
//     endpoint: spacesEndpoint,
//     accessKeyId: 'DO00CGJ47LMATWZYMBQT',
//     secretAccessKey: "cf9ZtcZwWanMOm490OBoqy4/EMrmFObShV9UKzXGSps",
//     region: 'nyc3', 
//     signatureVersion: 'v4',
// });

require('dotenv').config();

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com'); 
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'nyc3', 
    signatureVersion: 'v4',
});


function Check(req, res) {
    return res.send({ isSuccess: 'true' });
}

function UploadFile(req, res) {
    if (!req.files || !req.files.file) { 
        return res.status(400).send('No files were uploaded.');
      }
    const uploadedFile = req.files.file; 

    if (!uploadedFile) {
        return res.status(400).send('No files were uploaded.');
    }

    const fileName = uploadedFile.name;
    const fileBuffer = uploadedFile.data;

    const params = {
        Bucket: 'onurtest/UploadedFiles', 
        Key: fileName,
        Body: fileBuffer,
    };


    s3.upload(params, (err, data) => {
        if (err) {
            console.error('S3 Upload Hatası:', err);
            return res.status(500).send('Error uploading file to DigitalOcean Spaces.');
        }
        const fileUrl = `https://onurtest.nyc3.digitaloceanspaces.com/${fileName}`;
        res.send({isSuccess: true, fileUrl: fileUrl})
    });
    
}


module.exports = { Check, UploadFile };
