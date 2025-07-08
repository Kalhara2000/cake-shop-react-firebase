// CakeTable.js
import React from 'react';
import './CakeTable.css';

const CakeTable = ({ cakes, onDelete, onEdit }) => {
  if (cakes.length === 0) return <p>No cakes found.</p>;

  return (
<table className="cake-table">
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Price (Rs.)</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {cakes.map((cake) => (
      <tr key={cake.id}>
        <td data-label="Image">
          <img src={cake.imageUrl} alt={cake.name} />
        </td>
        <td data-label="Name">{cake.name}</td>
        <td data-label="Price">{parseFloat(cake.price).toFixed(2)}</td>
        <td data-label="Description">{cake.description}</td>
        <td data-label="Actions">
          <button onClick={() => onEdit(cake)}>Edit</button>
          <button onClick={() => onDelete(cake.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  );
};

export default CakeTable;