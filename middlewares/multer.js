const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const assetFolder = `${req.body.imageType}`;
    console.log(file.originalname, assetFolder);
    return {
      folder: 'image/' + assetFolder,
      asset_folder: assetFolder,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      public_id: file.originalname.split('.')[0],
      // format: 'png',
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
