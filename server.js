const express = require('express');
const cors = require('cors'); // Import CORS
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Use the environment variable for MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/products', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("prodata"); // Replace "prodata" with your actual database name if different
        const collection = database.collection("datafin"); // Replace "serb" with your collection name

        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
