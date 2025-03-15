import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ShopCard from '../components/ShopCard';
import FilterSort from '../components/FilterSort';
import { fetchShops } from '../api/api';

const ShopsScreen = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    sortBy: 'rating', // 'rating', 'name', 'price'
    services: [],
    minRating: 0,
  });

  useEffect(() => {
    loadShops();
  }, []);

  useEffect(() => {
    if (shops.length > 0) {
      applyFilters();
    }
  }, [searchQuery, filterOptions, shops]);

  const loadShops = async () => {
    try {
      setLoading(true);
      const shopsData = await fetchShops();
      setShops(shopsData);
      setFilteredShops(shopsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load mechanic shops. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  const applyFilters = () => {
    let result = [...shops];
    
    // Apply search query
    if (searchQuery) {
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.services.some(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply service filter
    if (filterOptions.services.length > 0) {
      result = result.filter(shop => 
        filterOptions.services.every(service => 
          shop.services.some(s => s.name.toLowerCase() === service.toLowerCase())
        )
      );
    }
    
    // Apply rating filter
    if (filterOptions.minRating > 0) {
      result = result.filter(shop => shop.rating >= filterOptions.minRating);
    }
    
    // Apply sorting
    if (filterOptions.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filterOptions.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOptions.sortBy === 'price') {
      result.sort((a, b) => {
        const aAvg = a.services.reduce((sum, service) => sum + service.price, 0) / a.services.length;
        const bAvg = b.services.reduce((sum, service) => sum + service.price, 0) / b.services.length;
        return aAvg - bAvg;
      });
    }
    
    setFilteredShops(result);
  };

  const handleFilterApply = (newOptions) => {
    setFilterOptions(newOptions);
    setShowFilter(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading mechanic shops...</Text>
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
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops or services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Feather name="sliders" size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>
      
      {showFilter && (
        <FilterSort 
          options={filterOptions}
          onApply={handleFilterApply}
          onCancel={() => setShowFilter(false)}
        />
      )}
      
      {filteredShops.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="info" size={50} color="#9CA3AF" />
          <Text style={styles.emptyText}>No shops found matching your criteria</Text>
        </View>
      ) : (
        <FlatList
          data={filteredShops}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ShopCard shop={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
  },
  listContainer: {
    padding: 15,
    paddingTop: 5,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default ShopsScreen;
