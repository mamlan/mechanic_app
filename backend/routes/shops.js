const express = require('express');
const router = express.Router();
const shopData = require('../data/shopData');

// Get all shops with basic information
router.get('/', (req, res) => {
  try {
    // Transform data to return only necessary information for list view
    const simplifiedShops = shopData.map(shop => ({
      id: shop.id,
      name: shop.name,
      rating: shop.rating,
      distance: shop.distance,
      address: shop.address,
      services: shop.services.map(service => ({
        name: service.name,
        price: service.price
      })),
      reviews: shop.reviews
    }));
    
    res.json(simplifiedShops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

// Get shop by ID with detailed information
router.get('/:id', (req, res) => {
  try {
    const shopId = parseInt(req.params.id);
    const shop = shopData.find(s => s.id === shopId);
    
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    
    res.json(shop);
  } catch (error) {
    console.error(`Error fetching shop ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch shop details' });
  }
});

// Get shops by IDs for comparison
router.get('/compare', (req, res) => {
  try {
    const shopIds = req.query.ids ? req.query.ids.split(',').map(id => parseInt(id)) : [];
    
    if (shopIds.length === 0) {
      return res.status(400).json({ error: 'No shop IDs provided' });
    }
    
    const shopsToCompare = shopData.filter(shop => shopIds.includes(shop.id));
    
    if (shopsToCompare.length === 0) {
      return res.status(404).json({ error: 'No shops found with the provided IDs' });
    }
    
    res.json(shopsToCompare);
  } catch (error) {
    console.error('Error fetching shops for comparison:', error);
    res.status(500).json({ error: 'Failed to fetch comparison data' });
  }
});

// Search shops by name or services
router.get('/search', (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = shopData.filter(shop => 
      shop.name.toLowerCase().includes(query) || 
      shop.services.some(service => service.name.toLowerCase().includes(query))
    );
    
    res.json(results);
  } catch (error) {
    console.error('Error searching shops:', error);
    res.status(500).json({ error: 'Failed to search shops' });
  }
});

module.exports = router;
