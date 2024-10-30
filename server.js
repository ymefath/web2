let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db("prodata"); // Set database
        console.log("Connected to database");
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

app.get('/api/products', async (req, res) => {
    try {
        const collection = db.collection("serb"); // Use the already connected db instance
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Start the server and connect to the database
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port ${port}`);
});
