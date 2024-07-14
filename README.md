# Ecommerce Website Project


## Project Overview

This project is an ecommerce website built using the MERN (MongoDB, Express, React, Node.js) stack. It showcases various categories of clothes, allows users to place orders, and provides functionality to gather and classify user feedback using the Google Cloud Natural Language API.


## Features
1. Product Display: Users can browse products categorized into Men's Wear, Women's Wear, and Kids' Wear.
2. Cart Functionality: Users can add products to a cart, view the cart, and proceed to checkout.
3. Order Placement: Users can place orders by providing their details and viewing the total amount.
4. Visitor Count: The website displays the number of visitors.
5. Feedback Collection and Classification: After placing an order, users can leave feedback which is then classified into Positive, Neutral, or Negative using the Google Cloud Natural Language API.


## Setup and Installation
1. Clone the repository.
2. Install dependencies using `npm install` for both frontend and backend.
3. Create a .env file in the root directory and include the following:
   * `MONGO_URI`: MongoDB connection string.
   * `google_api.json`: Path to the Google Cloud Natural Language API .
   * `PORT`: Port number for the server (default is 5000).
4. Start the backend server using `node server.js` in the backend directory.
5. Start the frontend development server using `npm start` in the frontend directory.







