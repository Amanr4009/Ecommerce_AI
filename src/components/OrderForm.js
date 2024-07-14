import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderForm.css';

const OrderForm = ({ cartItems, totalAmount }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();

    const order = {
      customerName,
      address,
      products: cartItems.map(item => ({ product: item.uid, quantity: item.quantity })),
      totalAmount,
    };

    try {
      // console.log(order.products);

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      }); 

      if (response.ok) {
        // alert('Order placed successfully!');
        setCustomerName('');
        setAddress('');
        navigate('/success',{ state: { products: cartItems } });
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order.');
    }
  };

  return (
    <form className="order-form" onSubmit={handleOrder}>
      <h2>Place Your Order</h2>
      <label>
        Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <p>Total Amount: Rs. {totalAmount.toFixed(2)}</p>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
