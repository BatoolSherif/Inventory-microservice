import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function Product() {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSuccess = () => {
    setEditingProduct(null);  // Reset editing state after success
  };

  const handleCancel = () => {
    setEditingProduct(null);  // Reset editing state on cancel
  };

  return (
    <div>
      {editingProduct ? (
        <ProductForm product={editingProduct} onSuccess={handleSuccess} onCancel={handleCancel} />
      ) : (
    <div style={{ textAlign: 'left' ,paddingTop: '10px', paddingLeft: '100px'}}>
      <button
        style={{
          width: '200px',
          height: '30px',
          marginTop: '10px',
        }}
        onClick={() => setEditingProduct({})}
      >
        Add Product
      </button>
      <ProductList onEdit={handleEdit} />
    </div>
      )}
    </div>
  );
}

export default Product;