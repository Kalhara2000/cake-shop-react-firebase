const {
  db, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc,
  serverTimestamp, collection
} = require('../config/firebase');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const cakeController = {

  getAllCakes: async (req, res) => {
    try {
      const snapshot = await getDocs(collection(db, 'cakes'));
      const cakes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
        return res.status(400).json({ message: 'Image is required' });
      }

      const { url: imageUrl, publicId } = await uploadToCloudinary(image.buffer);

      const newCake = {
        name,
        price: parseFloat(price),
        description: description || '',
        imageUrl,
        publicId,
        createdAt: serverTimestamp()
      };

      const cakeRef = doc(collection(db, 'cakes'));
      await setDoc(cakeRef, newCake);

      res.status(201).json({ id: cakeRef.id, ...newCake });

    } catch (error) {
      console.error('❌ Error in addCake:', error);
      res.status(500).json({ message: 'Failed to add cake', error: error.message });
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
      res.json({ message: 'Cake updated successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  },

  deleteCake: async (req, res) => {
    try {
      const { id } = req.params;
      const cakeRef = doc(db, 'cakes', id);
      const cakeDoc = await getDoc(cakeRef);

      if (!cakeDoc.exists()) return res.status(404).json({ message: 'Cake not found' });

      if (cakeDoc.data().publicId) {
        await deleteFromCloudinary(cakeDoc.data().publicId);
      }

      await deleteDoc(cakeRef);
      res.json({ message: 'Cake deleted successfully' });

    } catch (error) {
      res.status(500).json({ message: 'Delete failed', error: error.message });
    }
  }
};

module.exports = cakeController;
