// ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
  background: #f9f9f9;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

function OrderForm({ order = {}, onSuccess, onCancel }) {
  const [productId, setProductId] = useState(order.productId||'');
  const [customerId, setCustomerId] = useState(order.customerId||'');
  const [totalPrice, setTotalPrice] = useState(order.totalPrice||'');
  const [status, setStatus] = useState(order.status||'pending');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { productId, customerId, totalPrice, status };
    const url = order.id
      ? `http://localhost:6003/orders/${order.id}`
      : 'http://localhost:6003/AddOrders'; // Corrected endpoint name
    const method = order.id ? 'PUT' : 'POST';
    
    setIsLoading(true);
    setError(null);
    console.log(data)
    console.log(method)
    console.log(url)
    axios({  method: method,
      url: url,
      data: data, })
      .then(onSuccess)
      .catch((error) => {
        setError('Error submitting form, api not available ,Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <FormContainer>
      <h2>{order.id ? 'Edit Order' : 'Add Order'}</h2>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label>Product ID:</Label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(parseInt(e.target.value, 10))}
            required
            style={{ width: '100%' }}
          />
        </Field>
        <Field>
          <Label>Customer ID:</Label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(parseInt(e.target.value, 10))}
            required
            style={{ width: '100%' }}
          />
        </Field>
        <Field>
          <Label>Total Price:</Label>
          <input
            type="number"
            step="0.01"
            value={totalPrice}
            onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
            required
            style={{ width: '100%' }}
          />
        </Field>
        <Field>
          <Label>Status:</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={{ width: '100%' }}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="denied">Denied</option>
          </select>
        </Field>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ButtonGroup>
          <button type="submit" disabled={isLoading}>Submit</button>
          <button type="button" onClick={onCancel} disabled={isLoading}>Cancel</button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default OrderForm;
