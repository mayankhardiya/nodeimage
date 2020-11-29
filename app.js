const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const multer = require('multer');
const { pathToFileURL } = require('url');
const { extname } = require('path');

const app = express();

app.use(express.static(__dirname + "./public"));

app.set('view engine', 'ejs');

var storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + extname(file.originalname));
    }
});

var upload = multer({ storage: storage }).single('file');

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/upload", upload, (req, res, next) => {

    console.log('req.file.filename ', req.file.filename);

    // if (err) {
    //     return res.send("Someting gone wrong");
    // }
    res.send("Upload complete");

});

app.listen(4001, (req, res) => {
    console.log('server start');
});
