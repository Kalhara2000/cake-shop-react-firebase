//cakeRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cakeController = require('../controllers/cakeController');

// Enhanced Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB file size limit
    files: 1, // Allow only 1 file
    fields: 10, // Allow up to 10 non-file fields
    parts: 20 // Total parts (files + fields) limit
  },
  fileFilter: (req, file, cb) => {
    // Verify file is an image with allowed extension
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const allowedExtensions = ['.jpeg', '.png', '.jpg', '.webp'];
    
    const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);
    const isExtensionValid = allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));
    
    if (isMimeTypeValid && isExtensionValid) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only ${allowedExtensions.join(', ')} files are allowed.`), false);
    }
  }
});

// Enhanced error handling middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    const response = {
      success: false,
      message: err.message,
      code: err.code || 'UPLOAD_ERROR'
    };

    if (err instanceof multer.MulterError) {
      // Handle specific Multer errors
      response.code = err.code;
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          response.message = 'File size exceeds 5MB limit';
          break;
        case 'LIMIT_FILE_COUNT':
          response.message = 'Only one file is allowed';
          break;
        case 'LIMIT_FIELD_COUNT':
          response.message = 'Too many form fields';
          break;
      }
      return res.status(400).json(response);
    }
    
    // Handle other upload errors
    return res.status(500).json(response);
  }
  next();
};

// Request validation middleware
const validateCakeRequest = (req, res, next) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Name and price are required fields',
      code: 'MISSING_REQUIRED_FIELDS'
    });
  }
  
  if (isNaN(parseFloat(price))) {
    return res.status(400).json({
      success: false,
      message: 'Price must be a valid number',
      code: 'INVALID_PRICE'
    });
  }
  
  next();
};

// Get all cakes
router.get('/', cakeController.getAllCakes);

// Add new cake with image upload
router.post('/',
  upload.single('image'),
  handleUploadErrors,
  validateCakeRequest,
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
        code: 'MISSING_IMAGE'
      });
    }
    next();
  },
  cakeController.addCake
);

// Delete a cake
router.delete('/:id', cakeController.deleteCake);

// Update a cake with optional image update
router.put('/:id',
  upload.single('image'),
  handleUploadErrors,
  validateCakeRequest,
  cakeController.updateCake
);

module.exports = router;