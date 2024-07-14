import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ products }) => {
  const [feedbacks, setFeedbacks] = useState(products.map(() => '')); // Initialize an array of feedbacks for each product

  const handleFeedbackChange = (e, index) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[index] = e.target.value;
    setFeedbacks(newFeedbacks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: products.map((product, index) => ({
            productId: product.uid, // Adjust according to your product structure
            feedback: feedbacks[index],
          })),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Review submitted successfully:', result);
        alert('Review submitted successfully!');
      } else {
        const errorData = await response.json();
        console.log(products , feedbacks);
        alert(`Failed to submit review: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review.');
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Leave Your Review</h2>
      {products.map((product, index) => (
        <div key={product.uid}>
          <h3>Review for {product.name}</h3>
          <textarea
            value={feedbacks[index]}
            onChange={(e) => handleFeedbackChange(e, index)}
            placeholder={`Write your review for ${product.name} here`}
            required
          />
        </div>
      ))}
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
