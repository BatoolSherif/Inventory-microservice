// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const Shipping = () => {
  // State for creating orders
  const [createForm, setCreateForm] = useState({ origin: '', destination: '', weight: '', carrier: '' });
  const [createMessage, setCreateMessage] = useState('');

  // State for estimating shipping
  const [estimateForm, setEstimateForm] = useState({ origin: '', destination: '', weight: '' });
  const [estimate, setEstimate] = useState(null);

  // State for retrieving an order
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  // Handlers for creating orders
  const handleCreateChange = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/shipping/order', createForm);
      setCreateMessage(`Order created successfully`);
    } catch (error) {
      setCreateMessage('Failed to create order');
      console.error(error); // Log the error to the console
    }
  };

  // Handlers for estimating shipping
  const handleEstimateChange = (e) => {
    setEstimateForm({ ...estimateForm, [e.target.name]: e.target.value });
  };

  const handleEstimateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/shipping/estimate', estimateForm);
      setEstimate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handlers for retrieving an order
  const handleGetOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/shipping/order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      setOrder(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '50px', paddingLeft: '100px' }}>
    <h1 style={{ fontSize: '3rem' }}>Shipping Application</h1>
      <div style={{ textAlign: 'left' }}>
        <h2>Create Shipping Order</h2>
        <form onSubmit={handleCreateSubmit}>
          <input
            type="text"
            name="origin"
            placeholder="Origin"
            value={createForm.origin}
            onChange={handleCreateChange}
            required
            style={{ marginRight: '10px',marginButton: '20px', width: '200px', height: '30px'  }} 
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={createForm.destination}
            onChange={handleCreateChange}
            required
            style={{ marginRight: '10px', width: '200px', height: '30px'  }} 
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={createForm.weight}
            onChange={handleCreateChange}
            required
            style={{ marginRight: '10px', width: '200px', height: '30px'  }} 
          />
          <input
            type="text"
            name="carrier"
            placeholder="Carrier"
            value={createForm.carrier}
            onChange={handleCreateChange}
            required
            style={{ marginRight: '10px', width: '200px', height: '30px'  }} 
          />
          <button type="submit" style={{ width: '200px', height: '30px', marginTop: '10px' }}>Create Order</button>
        </form>
        {createMessage && <p>{createMessage}</p>}
      </div>

      {/* Estimate Shipping Section */}
      <div style={{ textAlign: 'left' }}>
        <h2>Estimate Shipping</h2>
        <form onSubmit={handleEstimateSubmit}>
          <input
            type="text"
            name="origin"
            placeholder="Origin"
            value={estimateForm.origin}
            onChange={handleEstimateChange}
            required
            style={{ marginRight: '10px',marginButton: '20px', width: '200px', height: '30px'  }} 
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={estimateForm.destination}
            onChange={handleEstimateChange}
            required
            style={{ marginRight: '10px', width: '200px', height: '30px'  }} 
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={estimateForm.weight}
            onChange={handleEstimateChange}
            required
            style={{ marginRight: '10px', width: '200px', height: '30px'  }}
          />
          <button type="submit"  style={{ width: '200px', height: '30px' }}>Estimate</button>
        </form>
        {estimate && (
          <div>
            <h3>Estimated Shipping Rate</h3>
            <p>Estimated Rate: {estimate.estimatedRate} {estimate.currency}</p>
          </div>
        )}
      </div>

      {/* Retrieve Order Section */}
      <div style={{ textAlign: 'left' }}>
        <h2>Get Shipping Order</h2>
        <form onSubmit={handleGetOrderSubmit}>
          <input
            type="number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID"
            required
            style={{ marginRight: '10px',marginButton: '20px', width: '200px', height: '30px'  }} 
          />
          <button type="submit"  style={{ width: '200px', height: '30px' }}>Get Order</button>
        </form>
        {order && (
          <div>
            <h3>Order Details</h3>
            <p>Origin: {order.origin}</p>
            <p>Destination: {order.destination}</p>
            <p>Weight: {order.weight}</p>
            <p>Carrier: {order.carrier}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipping;
