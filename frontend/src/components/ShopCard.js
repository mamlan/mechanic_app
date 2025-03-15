import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ShopCard = ({ shop, isCompact = false }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ShopDetails', { shop });
  };

  // Calculate average service price
  const avgPrice = shop.services.reduce((sum, service) => sum + service.price, 0) / shop.services.length;

  // Format price as $, $$, or $$$ based on average
  const getPriceIndicator = () => {
    if (avgPrice < 50) return '$';
    if (avgPrice < 100) return '$$';
    return '$$$';
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isCompact && styles.compactContainer]} 
      onPress={handlePress}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{shop.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#F59E0B" />
          <Text style={styles.rating}>{shop.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({shop.reviews.length} reviews)</Text>
        </View>
        
        <View style={styles.metaContainer}>
          <Text style={styles.price}>{getPriceIndicator()}</Text>
          <Text style={styles.divider}>•</Text>
          <Text style={styles.distance}>{shop.distance} mi</Text>
        </View>
        
        {!isCompact && (
          <Text style={styles.address}>
            {shop.address.street}, {shop.address.city}
          </Text>
        )}
        
        {!isCompact && (
          <View style={styles.servicesContainer}>
            {shop.services.slice(0, 3).map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={styles.serviceText}>{service.name}</Text>
              </View>
            ))}
            {shop.services.length > 3 && (
              <Text style={styles.moreServices}>+{shop.services.length - 3} more</Text>
            )}
          </View>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Feather name="chevron-right" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    padding: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontWeight: '500',
  },
  reviewCount: {
    marginLeft: 3,
    color: '#6B7280',
    fontSize: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    color: '#6B7280',
  },
  divider: {
    marginHorizontal: 5,
    color: '#9CA3AF',
  },
  distance: {
    color: '#6B7280',
  },
  address: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  serviceTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 12,
    color: '#4B5563',
  },
  moreServices: {
    fontSize: 12,
    color: '#6B7280',
  },
  arrowContainer: {
    justifyContent: 'center',
  },
});

export default ShopCard;
