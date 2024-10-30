const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection string
const uri = "mongodb+srv://yassine:12345yassine@cluster0.rhfeo.mongodb.net/prodata";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define an API endpoint to retrieve product data
app.get('/api/products', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("prodata");
        const collection = database.collection("serb");

        // Fetch all products from the 'serb' collection
        const products = await collection.find({}).toArray();
        res.json(products);  // Send the data as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
