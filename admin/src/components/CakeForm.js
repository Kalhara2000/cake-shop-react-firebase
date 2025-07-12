import React, { useState, useEffect } from 'react';
import './CakeForm.css';

const CakeForm = ({ onSubmit, loading, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        image: null
      });
      setImagePreview(initialData.imageUrl || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files?.[0]) {
      const file = files[0];

      // ✅ Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, or WEBP images are allowed.');
        return;
      }

      // ✅ Validate size (< 4MB)
      if (file.size > 4 * 1024 * 1024) {
        setError('Image must be smaller than 4MB.');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image && !initialData) {
      setError('Image is required.');
      return;
    }
    setError('');
    onSubmit({ ...formData, id: initialData?.id });
  };

  return (
    <form className="cake-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Cake Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price (Rs.)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>{initialData ? 'New Image (optional)' : 'Image'}</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!initialData}
        />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Cake' : 'Add Cake'}
      </button>
    </form>
  );
};

export default CakeForm;
