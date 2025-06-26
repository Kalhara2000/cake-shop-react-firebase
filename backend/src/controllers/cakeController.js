//cakeController.js

const { db, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, serverTimestamp, collection } = require('../config/firebase');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');


const cakeController = {




  getAllCakes: async (req, res) => {
    try {
      const snapshot = await getDocs(collection(db, 'cakes'));
      const cakes = [];
      snapshot.forEach((doc) => {
        cakes.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          description: doc.data().description,
          imageUrl: doc.data().imageUrl,
          publicId: doc.data().publicId,
          createdAt: doc.data().createdAt
        });
      });
      res.json(cakes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },









  addCake: async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
        code: 'MISSING_IMAGE'
      });
    }

    // Upload image to Cloudinary
    const { url: imageUrl, publicId } = await uploadToCloudinary(image.buffer);

    // ✅ Store all values into a single variable
    const cakeData = {
      name,
      price: parseFloat(price),
      description: description || '',
      imageUrl,
      publicId,
      createdAt: serverTimestamp()
    };

    // 🔹 Print the cake data to console before saving
    // console.log("📝 Cake data to be saved:", cakeData);

    // Save to Firestore using a generated ID
    const newCakeRef = doc(collection(db, 'cakes'));
    await setDoc(newCakeRef, cakeData);

    // ✅ Include auto-generated ID in the response
    res.status(201).json({
      id: newCakeRef.id,
      ...cakeData,
      message: 'Cake added successfully'
    });

  } catch (error) {
    console.error('❌ Error in addCake:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to add cake',
      error: error.message
    });
  }
},









  deleteCake: async (req, res) => {
    try {
      const { id } = req.params;
      const cakeRef = doc(db, 'cakes', id);
      const cakeDoc = await getDoc(cakeRef);

      if (!cakeDoc.exists()) {
        return res.status(404).json({ error: 'Cake not found' });
      }

      if (cakeDoc.data().publicId) {
        await deleteFromCloudinary(cakeDoc.data().publicId);
      }

      await deleteDoc(cakeRef);
      res.json({ message: 'Cake deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },









  updateCake: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      const image = req.file;
      const cakeRef = doc(db, 'cakes', id);

      const updateData = {
        name,
        price: parseFloat(price),
        description: description || '',
        updatedAt: serverTimestamp()
      };

      if (image) {
        const cakeDoc = await getDoc(cakeRef);
        if (cakeDoc.exists() && cakeDoc.data().publicId) {
          await deleteFromCloudinary(cakeDoc.data().publicId);
        }

        const { url: imageUrl, publicId } = await uploadToCloudinary(image.buffer);
        updateData.imageUrl = imageUrl;
        updateData.publicId = publicId;
      }

      await updateDoc(cakeRef, updateData);
      res.json({ 
        message: 'Cake updated successfully',
        imageUrl: updateData.imageUrl
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = cakeController;