const express = require('express');
const router = express.Router();
const tutorialData = require('../data/tutorialData');

// Get all tutorials
router.get('/', (req, res) => {
  try {
    const category = req.query.category;
    
    // If category is provided, filter tutorials by category
    if (category && category !== 'All') {
      const filteredTutorials = tutorialData.filter(tutorial => 
        tutorial.category === category
      );
      return res.json(filteredTutorials);
    }
    
    res.json(tutorialData);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    res.status(500).json({ error: 'Failed to fetch tutorials' });
  }
});

// Search tutorials
router.get('/search', (req, res) => {
  try {
    const query = req.query.query ? req.query.query.toLowerCase() : '';
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = tutorialData.filter(tutorial => 
      tutorial.title.toLowerCase().includes(query) ||
      tutorial.description.toLowerCase().includes(query) ||
      tutorial.category.toLowerCase().includes(query)
    );
    
    res.json(results);
  } catch (error) {
    console.error('Error searching tutorials:', error);
    res.status(500).json({ error: 'Failed to search tutorials' });
  }
});

// Get tutorials by category
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    
    const filteredTutorials = tutorialData.filter(tutorial => 
      tutorial.category.toLowerCase() === category.toLowerCase()
    );
    
    if (filteredTutorials.length === 0) {
      return res.status(404).json({ error: 'No tutorials found in this category' });
    }
    
    res.json(filteredTutorials);
  } catch (error) {
    console.error(`Error fetching tutorials for category ${req.params.category}:`, error);
    res.status(500).json({ error: 'Failed to fetch tutorials by category' });
  }
});

// Get tutorial by ID
router.get('/:id', (req, res) => {
  try {
    const tutorialId = parseInt(req.params.id);
    const tutorial = tutorialData.find(t => t.id === tutorialId);
    
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    res.json(tutorial);
  } catch (error) {
    console.error(`Error fetching tutorial ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch tutorial details' });
  }
});

module.exports = router;
