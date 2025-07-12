const express = require('express');
const router = express.Router();
const multer = require('multer');
const cakeController = require('../controllers/cakeController');

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const types = ['image/jpeg', 'image/png', 'image/webp'];
    if (types.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files (jpeg, png, webp) allowed'));
  }
});

// Validation middleware
const validateCake = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ message: 'Invalid name or price' });
  }
  next();
};

// Routes
router.get('/', cakeController.getAllCakes);

router.post('/',
  upload.single('image'),
  (err, req, res, next) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  validateCake,
  cakeController.addCake
);

router.delete('/:id', cakeController.deleteCake);

router.put('/:id',
  upload.single('image'),
  validateCake,
  cakeController.updateCake
);

module.exports = router;
