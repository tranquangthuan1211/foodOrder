require('dotenv').config();
const express = require('express')
const router = express.Router()
const ProfileController = require('../Controller/Profile/index')
const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params:{
        folder:'restaurant'
    }
  });
const upload = multer({ storage: storage });

router.get('/:id',ProfileController.getUser)
router.post('/',upload.single('file'),ProfileController.handleUpload)
router.put('/:id',ProfileController.handleProfile)

module.exports = router;