import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const imageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model('Image', imageSchema);

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  const newImage = new Image({
    name: req.body.name,
    img: {
      data: fs.readFileSync(path.join(__dirname, './uploads/' + req.file.filename)),
      contentType: 'image/png',
    },
  });
  newImage.save()
    .then(() => res.send('Image uploaded successfully'))
    .catch(err => res.status(400).send('Error uploading image: ' + err.message));
});

app.get('/images', (req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).send('Error fetching images: ' + err.message));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
