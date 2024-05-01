import React, { useState } from 'react';
import axios from 'axios';

function ProductForm({ product = {}, onSuccess, onCancel }) {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price || '');
  const [stock, setStock] = useState(product.stock || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, description, price, stock };

    const url = product.id
      ? `http://localhost:3000/products/${product.id}` // Use correct update URL
      : 'http://localhost:3000/Addproducts'; // Use correct add URL

    const method = product.id ? 'PUT' : 'POST'; // Use correct HTTP method

    axios({
      method: method,
      url: url,
      data: data,
    })
      .then(() => {
        onSuccess();
      })
      .catch((error) => console.error('Error submitting form:', error));
  };

  return (
    <div>
      <h2>{product.id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
