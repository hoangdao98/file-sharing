const express = require('express')
const app = express();
const multer = require('multer');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const uploadDir = path.join(__dirname, 'strorage');
const connect = require('./src/database');
const fileModel = require('./src/modules/file');
const mongose = require('mongodb');
const cors = require('cors');
const Post = require('./src/modules/post');
var database = null;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({
  limit: '50mb'
}));

app.set('root', __dirname);

// Config upload file
const storageConfigs = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const uploads = multer({storage: storageConfigs});


// Routing
app.post('/api/upload', uploads.array('files'), (req, res, next) => {
    const files = req.files;
    let fileModels = [];

    files.forEach(file => {
      const newFile = new fileModel(app).initWithObject(file);
      fileModels.push(newFile);
    });

    if (fileModels.length) {
      // let save file to dabase
      database.collection('files').insertMany(fileModels, (err, result) => {
        if (err) {
          return res.status(503).json({ error: { messsage: err }});
        }

        const post = new Post(app).initWithObject({
          to: req.body.to,
          subject: req.body.subject,
          message: req.body.message,
          files: result.insertedIds
        });

        // let save post object to posts collection
        database.collection('posts').insertOne(post, (err, result) => {
          if (err) {
            return res.status(503).json({ error: { messsage: 'Your upload cloud can not be saved' } });
          }

          return res.status(200).json(post);
        });

        return res.json({ files: fileModels });
      });
    } else {
      return res.status(503).json({ error: { messsage: 'File upload is required' } });
    }
});

app.get('/api/download/:id', (req, res, next) => {
  const fileId = req.params.id;
  
  database.collection('files').find({_id: mongose.ObjectId(fileId)}).toArray((err, result) => {
    if (err) {
        return res.status(404).json({
          error: {
            messsage: 'File not found'
          }
        });
    }

    const fileName = result[0].name;
    const filePath = path.join(uploadDir, fileName);
    return res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(404).json({
          error: {
            messsage: 'File not found'
          }
        })
      }
  
      return res.json({
            success: 'Download success'   
      })
    });
  });

});

connect((err, db) => {
  if (err) {
    console.log('Error connecting database')
    throw err;
  }

  app.set('db', db);
  database = app.get('db');

  // Listen port
  app.listen(3000, () => {
    console.log('Listen on port 3000');
  });
})
