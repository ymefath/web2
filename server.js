const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Use the environment variable for MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1); // Exit the application if connection fails
    }
}

app.get('/api/products', async (req, res) => {
    try {
        const database = client.db("prodata"); // Replace "prodata" with your actual database name
        const collection = database.collection("serb"); // Replace "serb" with your collection name

        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Connect to the database and start the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
