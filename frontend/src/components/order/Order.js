// App.js
import React, { useState } from 'react';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 30px;
  text-align: center;
`;

function Order() {
  const [editingOrder, setEditingOrder] = useState(null);

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSuccess = () => {
    setEditingOrder(null);
  };

  const handleCancel = () => {
    setEditingOrder(null);
  };

  return (
    <AppContainer>
      {editingOrder ? (
        <OrderForm
          order={editingOrder}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <h1>Order Management</h1>
          <button onClick={() => setEditingOrder({})}>Add Order</button>
          <OrderList onEdit={handleEdit} />
        </div>
      )}
    </AppContainer>
  );
}

export default Order;
