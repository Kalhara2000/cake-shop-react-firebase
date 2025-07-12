import React, { useState, useEffect } from 'react';
import './CakeForm.css';

const CakeForm = ({ onSubmit, loading, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        image: null // new image to be uploaded
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          step="0.01"
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
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Cake' : 'Add Cake'}
      </button>
    </form>
  );
};

export default CakeForm;
