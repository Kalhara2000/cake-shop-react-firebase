//cloudinary.js

require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with debug logging

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});







console.log('🔹 Cloudinary Config:');
console.log(`- Cloud Name: ${cloudinary.config().cloud_name ? '✅ Set' : '❌ Missing'}`);
console.log(`- API Key: ${cloudinary.config().api_key ? '✅ Set' : '❌ Missing'}`);
console.log(`- API Secret: ${cloudinary.config().api_secret ? '✅ Set' : '❌ Missing'}`);

const uploadToCloudinary = async (fileBuffer) => {
  try {
    console.log('🔹 Starting Cloudinary upload...');
    const b64 = Buffer.from(fileBuffer).toString("base64");
    const dataURI = "data:image/jpeg;base64," + b64;
    
    console.log('🔹 File converted to base64, uploading...');
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "cakes",
      resource_type: "auto"
    });
    
    console.log('✅ Cloudinary upload successful!');
    console.log(`- Public ID: ${result.public_id}`);
    console.log(`- Secure URL: ${result.secure_url}`);
    console.log(`- Format: ${result.format}`);
    console.log(`- Size: ${result.bytes} bytes`);
    
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    console.log(`🔹 Deleting Cloudinary asset: ${publicId}`);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('✅ Cloudinary deletion result:', result);
    return result;
  } catch (error) {
    console.error('❌ Cloudinary deletion error:', error.message);
    throw error;
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };