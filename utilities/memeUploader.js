const multer = require('multer');

// Upload Meme with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/memes');
  },

  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fullName = `meme-${Date.now()}.${ext}`;
    req.body.url = 'memes/' + fullName;
    cb(null, fullName);
  },
});

const memeFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: memeFilter,
});

exports.memeUploader = upload.single('meme');
