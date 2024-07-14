const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); 
const { LanguageServiceClient } = require('@google-cloud/language');


const languageClient = new LanguageServiceClient({
    
    keyFilename: './google_api.json',
});


const classifyFeedback = async (feedback) => {
    try {
        // Analyze sentiment of the feedback
        const [result] = await languageClient.analyzeSentiment({
            document: {
                content: feedback,
                type: 'PLAIN_TEXT',
            },
        });

        const sentiment = result.documentSentiment;
        let classification;
        if (sentiment.score >= 0.2) {
            classification = 'Positive';
        } else if (sentiment.score <= -0.2) {
            classification = 'Negative';
        } else {
            classification = 'Neutral';
        }

        return classification;
    } catch (error) {
        console.error('Error classifying feedback:', error);
        throw new Error('Failed to classify feedback');
    }
};

router.post('/', async (req, res) => {
    const { products } = req.body; // Assuming products is an array of product review objects

    try {
        // Use Array.map() to create new review documents
        const newReviews = await Promise.all(products.map(async (product) => {
            const { productId, feedback } = product;


            const classification = await classifyFeedback(feedback);
            console.log(classification);


            // Create a new review document in MongoDB
            const newReview = new Review({
                product: productId, // Assuming productId is used to reference the product
                feedback,
                classification,
            });

            // Save the review to MongoDB
            await newReview.save();


            return newReview; // Return the newly created review document
        }));

        res.status(201).json({ message: 'Reviews submitted successfully', reviews: newReviews });
    } catch (error) {
        console.error('Error submitting reviews:', error);
        res.status(500).json({ error: 'Failed to submit reviews' });
    }
});


router.get('/', async (req, res) => {
    try {
        const review = await Review.find().populate('products.product');
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
