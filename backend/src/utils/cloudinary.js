const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'cakes', resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary stream error:', error);
          reject(error);
        } else {
          console.log('✅ Cloudinary upload success:', result.public_id);
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('✅ Deleted from Cloudinary:', result);
    return result;
  } catch (err) {
    console.error('❌ Deletion error:', err);
    throw err;
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
