'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {fileSize: 300000000}})
// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// This is just a pointless comment to test Git Flow
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({ name: file.originalname, type: file.mimetype, size: file.size })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Node.js listening ...');
});
