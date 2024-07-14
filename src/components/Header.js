import React from 'react';
import './Header.css';


const Header = ({ visitorCount }) => {
  return (
    <header className="header">
      <div className="logo">Ecommerce</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#categories">Categories</a></li>
          {/* <li><a href="/cart">Cart</a></li> */}
          {/* <li><a href="#login">Login</a></li> */}
          <li>Visitors: {visitorCount}</li>
        </ul>
      </nav>
      {/* <VisitorCounter /> */}
    </header>
  );
};

export default Header;
