import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CategoryPage from './components/CategoryPage';
import SuccessPage from './components/SuccessPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/visitors/increment', {
          method: 'POST'
        });
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (err) {
        console.error('Error incrementing visitor count:', err);
      }
    };
    incrementVisitorCount();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.name === product.name);

    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
  };
  
  const clearCart = () => {
    setCartItems([]);
    setShowCart(false);
  };

  return (
    <Router>
      <div className="App">
      <Header visitorCount={visitorCount} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <CategorySection addToCart={addToCart} />
                {showCart && <Cart cartItems={cartItems} onClearCart={clearCart} />}
              </>
            }
          />
          <Route
            path="/category/:categoryName"
            element={
              <>
                <CategoryPage addToCart={addToCart} />
                {showCart && <Cart cartItems={cartItems} onClearCart={clearCart} />}
              </>
            }
          />
          <Route 
            path="/success" 
            element={<SuccessPage />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
