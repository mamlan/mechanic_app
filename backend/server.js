const express = require('express');
const cors = require('cors');
const shopsRoutes = require('./routes/shops');
const tutorialsRoutes = require('./routes/tutorials');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/shops', shopsRoutes);
app.use('/api/tutorials', tutorialsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'MechanicFinder API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'An internal server error occurred',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
