// Format currency values consistently
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate average rating from review array
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
};

// Format distance with appropriate unit
export const formatDistance = (distance) => {
  if (typeof distance !== 'number') return 'Unknown';
  
  if (distance < 0.1) {
    return 'Less than 0.1 mi';
  } else {
    return `${distance.toFixed(1)} mi`;
  }
};

// Generate short summaries from longer text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

// Convert 24-hour time to 12-hour format
export const formatTime = (time24) => {
  const [hour, minute] = time24.split(':');
  const hourNum = parseInt(hour, 10);
  
  if (hourNum === 0) {
    return `12:${minute} AM`;
  } else if (hourNum < 12) {
    return `${hourNum}:${minute} AM`;
  } else if (hourNum === 12) {
    return `12:${minute} PM`;
  } else {
    return `${hourNum - 12}:${minute} PM`;
  }
};

// Check if a shop offers a specific service
export const shopOffersService = (shop, serviceName) => {
  if (!shop || !shop.services) return false;
  
  return shop.services.some(service => 
    service.name.toLowerCase() === serviceName.toLowerCase()
  );
};

// Find lowest price for a specific service among shops
export const findLowestPriceForService = (shops, serviceName) => {
  if (!shops || shops.length === 0) return null;
  
  let lowestPrice = Infinity;
  let lowestPriceShop = null;
  
  shops.forEach(shop => {
    const service = shop.services.find(s => 
      s.name.toLowerCase() === serviceName.toLowerCase()
    );
    
    if (service && service.price < lowestPrice) {
      lowestPrice = service.price;
      lowestPriceShop = shop;
    }
  });
  
  return lowestPrice === Infinity ? null : {
    price: lowestPrice,
    shop: lowestPriceShop
  };
};
