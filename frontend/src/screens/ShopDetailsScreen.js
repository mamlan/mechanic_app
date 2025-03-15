import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ReviewItem from '../components/ReviewItem';
import ServiceItem from '../components/ServiceItem';
import { getShopDetails } from '../api/api';

const ShopDetailsScreen = ({ route, navigation }) => {
  const { shop: initialShopData } = route.params;
  const [shop, setShop] = useState(initialShopData);
  const [activeTab, setActiveTab] = useState('services'); // 'services', 'reviews', 'info'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadShopDetails();
  }, []);

  const loadShopDetails = async () => {
    try {
      setLoading(true);
      const detailedShop = await getShopDetails(initialShopData.id);
      setShop(detailedShop);
      setLoading(false);
    } catch (err) {
      setError('Failed to load shop details. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleCallShop = () => {
    Linking.openURL(`tel:${shop.phone}`);
  };

  const handleDirections = () => {
    const { address } = shop;
    const destination = encodeURIComponent(`${address.street}, ${address.city}, ${address.state}, ${address.zip}`);
    Linking.openURL(`https://maps.google.com/?daddr=${destination}`);
  };

  const handleAddToCompare = () => {
    // Implementation would depend on your comparison state management
    // For now, let's just navigate to the compare screen
    navigation.navigate('Compare', { addedShop: shop });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <View>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            {shop.services.map((service, index) => (
              <ServiceItem key={index} service={service} />
            ))}
          </View>
        );
      case 'reviews':
        return (
          <View>
            <View style={styles.ratingOverview}>
              <View style={styles.ratingCircle}>
                <Text style={styles.ratingNumber}>{shop.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.ratingText}>Based on {shop.reviews.length} reviews</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            {shop.reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </View>
        );
      case 'info':
        return (
          <View>
            <Text style={styles.sectionTitle}>Shop Information</Text>
            <View style={styles.infoItem}>
              <Feather name="map-pin" size={20} color="#6B7280" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoText}>{shop.address.street}</Text>
                <Text style={styles.infoText}>{shop.address.city}, {shop.address.state} {shop.address.zip}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="phone" size={20} color="#6B7280" style={styles.infoIcon} />
              <Text style={styles.infoText}>{shop.phone}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Feather name="clock" size={20} color="#6B7280" style={styles.infoIcon} />
              <View>
                {shop.hours.map((hour, index) => (
                  <Text key={index} style={styles.infoText}>{hour}</Text>
                ))}
              </View>
            </View>
            
            {shop.website && (
              <View style={styles.infoItem}>
                <Feather name="globe" size={20} color="#6B7280" style={styles.infoIcon} />
                <TouchableOpacity onPress={() => Linking.openURL(shop.website)}>
                  <Text style={[styles.infoText, styles.linkText]}>{shop.website}</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {shop.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading shop details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadShopDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <View style={styles.ratingRow}>
              <Feather name="star" size={18} color="#F59E0B" />
              <Text style={styles.ratingText}>{shop.rating.toFixed(1)} ({shop.reviews.length} reviews)</Text>
            </View>
            <Text style={styles.address}>
              {shop.address.street}, {shop.address.city}
            </Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCallShop}>
            <Feather name="phone" size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <Feather name="map" size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleAddToCompare}>
            <Feather name="bar-chart-2" size={20} color="#2563EB" />
            <Text style={styles.actionButtonText}>Compare</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'services' && styles.activeTab]}
            onPress={() => setActiveTab('services')}
          >
            <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
              Services
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
              Info
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#2563EB',
  },
  shopInfo: {
    marginBottom: 15,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
  },
  address: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: 5,
    color: '#2563EB',
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#1F2937',
  },
  linkText: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  specialtyText: {
    color: '#2563EB',
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShopDetailsScreen;
