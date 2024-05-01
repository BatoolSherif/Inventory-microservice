import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/Getproducts')
      .then((response) => {
        setProducts(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching products. Please try again.');
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        setError(null);
      })
      .catch((error) => {
        setError('Error deleting product. Please try again.');
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <h2>Product List</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description} (${product.price})
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
