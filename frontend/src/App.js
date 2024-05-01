import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
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
        <div>
          <button onClick={() => setEditingProduct({})}>Add Product</button>
          <ProductList onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}

export default App;
