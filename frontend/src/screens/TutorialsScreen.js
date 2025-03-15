import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import TutorialLink from '../components/TutorialLink';
import { fetchTutorials } from '../api/api';

const TutorialsScreen = () => {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Engine',
    'Brakes',
    'Transmission',
    'Electrical',
    'Suspension',
    'Maintenance',
    'DIY',
  ];

  useEffect(() => {
    loadTutorials();
  }, []);

  useEffect(() => {
    filterTutorials();
  }, [searchQuery, selectedCategory, tutorials]);

  const loadTutorials = async () => {
    try {
      setLoading(true);
      const tutorialsData = await fetchTutorials();
      setTutorials(tutorialsData);
      setFilteredTutorials(tutorialsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tutorials. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  const filterTutorials = () => {
    let result = [...tutorials];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(tutorial => 
        tutorial.category === selectedCategory
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(tutorial => 
        tutorial.title.toLowerCase().includes(lowerCaseQuery) ||
        tutorial.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    setFilteredTutorials(result);
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategoryButton
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryButtonText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading tutorials...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTutorials}>
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
          placeholder="Search for car repair tutorials..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderCategoryButton(item)}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      {filteredTutorials.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="info" size={50} color="#9CA3AF" />
          <Text style={styles.emptyText}>No tutorials found matching your search</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTutorials}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TutorialLink tutorial={item} />}
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
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedCategoryButton: {
    backgroundColor: '#2563EB',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  listContainer: {
    padding: 15,
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

export default TutorialsScreen;
