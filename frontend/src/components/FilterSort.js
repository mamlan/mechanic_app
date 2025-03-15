import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FilterSort = ({ options, onApply, onCancel }) => {
  const [localOptions, setLocalOptions] = useState({
    sortBy: options.sortBy || 'rating',
    services: [...(options.services || [])],
    minRating: options.minRating || 0,
  });

  const commonServices = [
    'Oil Change',
    'Brake Repair',
    'Tire Replacement',
    'Engine Repair',
    'Transmission',
    'Battery Service',
    'A/C Service',
    'Diagnostics',
  ];

  const handleSortSelection = (sortBy) => {
    setLocalOptions({ ...localOptions, sortBy });
  };

  const handleServiceToggle = (service) => {
    const services = [...localOptions.services];
    const index = services.indexOf(service);
    
    if (index === -1) {
      services.push(service);
    } else {
      services.splice(index, 1);
    }
    
    setLocalOptions({ ...localOptions, services });
  };

  const handleRatingSelection = (rating) => {
    setLocalOptions({ ...localOptions, minRating: rating });
  };

  const handleApply = () => {
    onApply(localOptions);
  };

  const isServiceSelected = (service) => {
    return localOptions.services.includes(service);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
        <TouchableOpacity onPress={onCancel}>
          <Feather name="x" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.sortOption,
                localOptions.sortBy === 'rating' && styles.selectedOption
              ]}
              onPress={() => handleSortSelection('rating')}
            >
              <Text style={[
                styles.optionText,
                localOptions.sortBy === 'rating' && styles.selectedOptionText
              ]}>
                Top Rated
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortOption,
                localOptions.sortBy === 'name' && styles.selectedOption
              ]}
              onPress={() => handleSortSelection('name')}
            >
              <Text style={[
                styles.optionText,
                localOptions.sortBy === 'name' && styles.selectedOptionText
              ]}>
                Name (A-Z)
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortOption,
                localOptions.sortBy === 'price' && styles.selectedOption
              ]}
              onPress={() => handleSortSelection('price')}
            >
              <Text style={[
                styles.optionText,
                localOptions.sortBy === 'price' && styles.selectedOptionText
              ]}>
                Price (Low to High)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minimum Rating</Text>
          <View style={styles.optionsRow}>
            {[0, 3, 4, 4.5].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingOption,
                  localOptions.minRating === rating && styles.selectedOption
                ]}
                onPress={() => handleRatingSelection(rating)}
              >
                <Text style={[
                  styles.optionText,
                  localOptions.minRating === rating && styles.selectedOptionText
                ]}>
                  {rating === 0 ? 'Any' : `${rating}+`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services Offered</Text>
          <View style={styles.servicesContainer}>
            {commonServices.map(service => (
              <TouchableOpacity
                key={service}
                style={[
                  styles.serviceOption,
                  isServiceSelected(service) && styles.selectedOption
                ]}
                onPress={() => handleServiceToggle(service)}
              >
                <Text style={[
                  styles.optionText,
                  isServiceSelected(service) && styles.selectedOptionText
                ]}>
                  {service}
                </Text>
                {isServiceSelected(service) && (
                  <Feather name="check" size={16} color="#2563EB" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={() => setLocalOptions({
          sortBy: 'rating',
          services: [],
          minRating: 0,
        })}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
    marginBottom: 10,
  },
  ratingOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
  },
  serviceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  optionText: {
    color: '#4B5563',
  },
  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkIcon: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  resetButtonText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FilterSort;
