const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/Product');
const orderRoutes = require('./routes/Order');
const visitorRoutes = require('./routes/Visitor');
const reviewRoutes = require('./routes/Review')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://amankumar652:Amankumar@cluster0.s3qdmlp.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/visitors', visitorRoutes); 

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Example products data
const products = [
  { id: 1, name: "Men's Shirt", category: "Men's Wear", image: "/img/men1.jpg", description: "A nice men's shirt", price: 29.99 },
  { id: 2, name: "Women's Dress", category: "Women's Wear", image: "/img/women1.jpg", description: "A beautiful women's dress", price: 49.99 },
  { id: 3, name: "Kid's T-shirt", category: "Kids' Wear", image: "/img/kid1.jpg", description: "A cute kid's t-shirt", price: 19.99 },
  // Add more products as needed
];

// Route to fetch products by category
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(product => product.category === category);
  }

  res.json(filteredProducts);
});


