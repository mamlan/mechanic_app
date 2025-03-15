import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TutorialLink = ({ tutorial }) => {
  const handleOpenLink = () => {
    Linking.openURL(tutorial.url);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenLink}>
      <View style={styles.iconContainer}>
        <Feather name="book-open" size={24} color="#2563EB" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{tutorial.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {tutorial.description}
        </Text>
        <View style={styles.meta}>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>{tutorial.category}</Text>
          </View>
          <Text style={styles.date}>{formatDate(tutorial.date)}</Text>
          <Text style={styles.source}>{tutorial.source}</Text>
        </View>
      </View>
      <Feather name="external-link" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagContainer: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  tag: {
    fontSize: 12,
    color: '#4B5563',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  source: {
    fontSize: 12,
    color: '#2563EB',
  },
});

export default TutorialLink;
