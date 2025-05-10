import React, { useState, useEffect } from 'react';
import HomeScreenStyle from '../../style/HomeScreenStyle.js'
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ShopCard from '../components/ShopCard';
import FilterSort from '../components/FilterSort';
import { fetchShops, commonServices } from '../api/api';

const HomeScreen = () => {
  const [selectedService, setSelectedService] = useState('');
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
      <View style={HomeScreenStyle.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={HomeScreenStyle.loadingText}>Loading mechanic shops...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={HomeScreenStyle.centerContainer}>
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text style={HomeScreenStyle.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadShops}>
          <Text style={HomeScreenStyle.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
 <View style={HomeScreenStyle.container}>
  <View style={HomeScreenStyle.servicesContainer}>
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={HomeScreenStyle.servicesScroll}
  >
    {commonServices.map((service, index) => (
      <TouchableOpacity 
        key={index}
        style={[
          HomeScreenStyle.serviceButton, 
          selectedService === service && HomeScreenStyle.selectedServiceButton
        ]}
        onPress={() => {
          if (selectedService === service) {
            setSelectedService('');
            setFilterOptions((prev) => ({ ...prev, services: [] }));
          } else {
            setSelectedService(service);
            setFilterOptions((prev) => ({ ...prev, services: [service] }));
          }
        }}
      >
        <Text 
          style={[
            HomeScreenStyle.serviceButtonText,
            selectedService === service && HomeScreenStyle.selectedServiceButtonText
          ]}
        >
          {service}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
  
</View>
 <View style={HomeScreenStyle.searchContainer}>
   <Feather name="search" size={20} color="#6B7280" style={HomeScreenStyle.searchIcon} />
   <TextInput
     style={HomeScreenStyle.searchInput}
     placeholder="Search shops or services..."
     value={searchQuery}
     onChangeText={setSearchQuery}
   />
   <TouchableOpacity 
     style={HomeScreenStyle.filterButton}
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
   <View style={HomeScreenStyle.emptyContainer}>
     <Feather name="info" size={50} color="#9CA3AF" />
     <Text style={HomeScreenStyle.emptyText}>No shops found matching your criteria</Text>
   </View>
 ) : (
   <FlatList
     data={filteredShops}
     keyExtractor={(item) => item.id.toString()}
     renderItem={({ item }) => <ShopCard shop={item} />}
     contentContainerStyle={HomeScreenStyle.listContainer}
     showsVerticalScrollIndicator={false}
   />
 )}
</View>


  );
};



export default HomeScreen;
