const mongoose = require('mongoose');

// Hardcoded MongoDB URI for testing
const MONGODB_URI = 'mongodb+srv://ubiquity7001:ubiquity@cluster0.uak6nsz.mongodb.net/ai-interview?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;