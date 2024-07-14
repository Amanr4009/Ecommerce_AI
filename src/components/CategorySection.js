import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';

const categories = [
  { name: 'Men', image: '/img/menC.jpeg' },
  { name: 'Women', image: '/img/womenC.jpeg' },
  { name: 'Kids', image: '/img/kidC.jpeg' },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <section id="categories" className="categories">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item" onClick={() => handleCategoryClick(category.name)}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
