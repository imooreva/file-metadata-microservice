//require modules
const express = require('express');
const path = require('path');
const multer = require('multer');

//configure multer to use memory buffer instead of disk storage for files
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//set constants for express
const port = process.env.PORT || 3000; //port used for Heroku, otherwise 3000
const publicPath = path.join(__dirname, '.././public'); //helps middleware work properly

//configure express and start listening
var app = express();
app.use(express.static(publicPath));
if (!module.parent) { app.listen(port, () => console.log(`Started up on port ${port}`)) };

app.post('/post-file', upload.single('form-upload'), (req,res) => {
    res.json({
        'File Name': req.file.originalname,
        'Encoding': req.file.encoding,
        'MIME type': req.file.mimetype,
        'Size (bytes)': Number(req.file.size)
    });
});