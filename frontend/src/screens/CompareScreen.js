import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ComparisonTable from '../components/ComparisonTable';
import ShopCard from '../components/ShopCard';
import { fetchShops } from '../api/api';

const CompareScreen = ({ route }) => {
  const [shops, setShops] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commonServices, setCommonServices] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  useEffect(() => {
    // If a shop was added from another screen
    if (route.params?.addedShop) {
      const shopExists = selectedShops.some(shop => shop.id === route.params.addedShop.id);
      if (!shopExists && selectedShops.length < 3) {
        setSelectedShops([...selectedShops, route.params.addedShop]);
      }
      // Clear the param to prevent re-adding on screen focus
      route.params.addedShop = null;
    }
  }, [route.params?.addedShop]);

  useEffect(() => {
    if (selectedShops.length >= 2) {
      findCommonServices();
    } else {
      setCommonServices([]);
    }
  }, [selectedShops]);

  const loadShops = async () => {
    try {
      setLoading(true);
      const shopsData = await fetchShops();
      setShops(shopsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load shops for comparison. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  const findCommonServices = () => {
    // Extract service names from all selected shops
    const servicesByShop = selectedShops.map(shop => 
      shop.services.map(service => service.name)
    );
    
    // Find services that exist in all selected shops
    const firstShopServices = servicesByShop[0];
    const servicesInAllShops = firstShopServices.filter(service => 
      servicesByShop.every(shopServices => shopServices.includes(service))
    );
    
    setCommonServices(servicesInAllShops);
  };

  const toggleShopSelection = (shop) => {
    const isSelected = selectedShops.some(s => s.id === shop.id);
    
    if (isSelected) {
      // Remove shop
      setSelectedShops(selectedShops.filter(s => s.id !== shop.id));
    } else {
      // Add shop (max 3)
      if (selectedShops.length < 3) {
        setSelectedShops([...selectedShops, shop]);
      }
    }
  };

  const isShopSelected = (shop) => {
    return selectedShops.some(s => s.id === shop.id);
  };

  const renderShopItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.shopSelectItem,
        isShopSelected(item) && styles.selectedShopItem
      ]}
      onPress={() => toggleShopSelection(item)}
    >
      <Text style={styles.shopSelectName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <Feather name="star" size={14} color="#F59E0B" />
        <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
      </View>
      {isShopSelected(item) && (
        <Feather name="check-circle" size={20} color="#2563EB" style={styles.selectedIcon} />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading shops for comparison...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadShops}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Compare Mechanic Shops</Text>
        <Text style={styles.subHeaderText}>
          Select up to 3 shops to compare their services and prices
        </Text>
      </View>
      
      <View style={styles.selectionContainer}>
        <Text style={styles.sectionTitle}>Select Shops to Compare</Text>
        <FlatList
          data={shops}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderShopItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shopSelectList}
        />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {selectedShops.length < 2 ? (
          <View style={styles.instructionContainer}>
            <Feather name="info" size={40} color="#9CA3AF" />
            <Text style={styles.instructionText}>
              Select at least 2 shops to compare
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Selected Shops</Text>
            {selectedShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} isCompact />
            ))}
            
            <View style={styles.comparisonContainer}>
              <Text style={styles.sectionTitle}>Service Comparison</Text>
              {commonServices.length === 0 ? (
                <Text style={styles.noServicesText}>
                  No common services found between the selected shops
                </Text>
              ) : (
                <ComparisonTable 
                  shops={selectedShops} 
                  services={commonServices}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#2563EB',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  selectionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopSelectList: {
    paddingVertical: 5,
  },
  shopSelectItem: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 150,
  },
  selectedShopItem: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  shopSelectName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
  },
  selectedIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  instructionText: {
    marginTop: 10,
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
  comparisonContainer: {
    marginTop: 20,
  },
  noServicesText: {
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
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

export default CompareScreen;
