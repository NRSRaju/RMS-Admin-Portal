const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Import routes
const userRoutes = require('./routes/userRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const systemSettingsRoutes = require('./routes/systemSettingsRoutes');

// Use routes
app.use('/api', userRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', paymentRoutes);
app.use('/api', reportRoutes);
app.use('/api', settingsRoutes);
app.use('/api', systemSettingsRoutes);

// Import and start cron jobs
const { startCronJobs } = require('./services/cronService');
startCronJobs();

// Import and run data seeding
const { seedData } = require('./utils/seedData');
seedData();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;