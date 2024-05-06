import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:6001/Getproducts')
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
      .delete(`http://localhost:6001/products/${id}`)
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
    <div style={{ textAlign: 'left' ,display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '10px'}}>
      <h2 style={{ fontSize: '3rem' }}>Product List</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description} (${product.price})
            <button style={{ width: '200px', height: '30px', marginLeft: '10px' }} onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;