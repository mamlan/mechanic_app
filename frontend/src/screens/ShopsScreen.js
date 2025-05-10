import React, { useState, useEffect } from 'react';
import ShopsScreenStyle from '../../style/HomeScreenStyle.js'

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
      <View style={ShopsScreenStyle.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={ShopsScreenStyle.loadingText}>Loading mechanic shops...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={ShopsScreenStyle.centerContainer}>
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text style={ShopsScreenStyle.errorText}>{error}</Text>
        <TouchableOpacity style={ShopsScreenStyle.retryButton} onPress={loadShops}>
          <Text style={ShopsScreenStyle.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={ShopsScreenStyle.container}>
      <View style={ShopsScreenStyle.searchContainer}>
        <Feather name="search" size={20} color="#6B7280" style={ShopsScreenStyle.searchIcon} />
        <TextInput
          style={ShopsScreenStyle.searchInput}
          placeholder="Search shops or services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={ShopsScreenStyle.filterButton}
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
        <View style={ShopsScreenStyle.emptyContainer}>
          <Feather name="info" size={50} color="#9CA3AF" />
          <Text style={ShopsScreenStyle.emptyText}>No shops found matching your criteria</Text>
        </View>
      ) : (
        <FlatList
          data={filteredShops}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ShopCard shop={item} />}
          contentContainerStyle={ShopsScreenStyle.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};



export default ShopsScreen;
