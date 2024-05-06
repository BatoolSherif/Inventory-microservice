import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  max-width: 600px;
  margin: auto;
`;

const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function OrderList({ onEdit }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:6003/Getorders')
      .then((response) => {
        setOrders(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching orders, api not available , Please try again.');
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:6003/orders/${id}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== id));
        setError(null);
      })
      .catch((error) => {
        setError('Error deleting order, api not available , Please try again,');
        console.error('Error deleting order:', error);
      });
  };

  return (
    <ListContainer>
      <h2>Order List</h2>
      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <div>
              <strong>{order.id}</strong>: , Product ID: {order.productId}, Customer ID: {order.customerId}, Total Price: ${order.totalPrice} ,  Order date: ${order.orderDate} , Order status: ${order.status}
            </div>
            <ButtonGroup>
              <button onClick={() => onEdit(order)}>Edit</button>
              <button onClick={() => handleDelete(order.id)}>Delete</button>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
}

export default OrderList;
