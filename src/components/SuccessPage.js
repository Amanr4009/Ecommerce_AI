import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './SuccessPage.css';

const SuccessPage = () => {
  const location = useLocation();
  const products = location.state?.products || []; // Assuming products array is passed from previous page

  return (
    <div className="success-page">
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your purchase.</p>
      <Link to="/">Go back to home</Link>
      {products.length > 0 && (
        <ReviewForm products={products} />
      )}
    </div>
  );
};

export default SuccessPage;
