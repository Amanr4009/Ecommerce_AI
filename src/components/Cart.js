import React, { useState } from 'react';
import './Cart.css';
import OrderForm from './OrderForm';

const Cart = ({ cartItems, onClearCart }) => {
  const [checkout, setCheckout] = useState(false);

  const handleCheckout = () => {
    setCheckout(true);

  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // console.log(cartItems);
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className='empty'>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
          <div className='productsItems'>
            <div><img src={item.image} alt="" height={100} width={100} className='productImg'/></div>
            <div>
            <div>{item.name}</div>
            <div>quantity: {item.quantity}</div>
            </div>
          </div>
          ))}
          <p>Total Amount: Rs. {totalAmount}</p>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={onClearCart}>Clear Cart</button>
        </div>
      )}
      {checkout && <OrderForm cartItems={cartItems} totalAmount={totalAmount}  />}
    </div>
  );
};

export default Cart;
