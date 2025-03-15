import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MechanicFinder</Text>
        <Text style={styles.subtitle}>Find the best mechanic for your car</Text>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('ShopsTab')}
        >
          <View style={styles.iconContainer}>
            <Feather name="tool" size={32} color="#2563EB" />
          </View>
          <Text style={styles.featureTitle}>Find Mechanic Shops</Text>
          <Text style={styles.featureDescription}>
            Browse and compare local auto repair shops
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('Tutorials')}
        >
          <View style={styles.iconContainer}>
            <Feather name="book" size={32} color="#2563EB" />
          </View>
          <Text style={styles.featureTitle}>Repair Tutorials</Text>
          <Text style={styles.featureDescription}>
            Find DIY tutorials for common car problems
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('Compare')}
        >
          <View style={styles.iconContainer}>
            <Feather name="bar-chart-2" size={32} color="#2563EB" />
          </View>
          <Text style={styles.featureTitle}>Compare Services</Text>
          <Text style={styles.featureDescription}>
            Side-by-side comparison of shop prices and services
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Car Maintenance Tips</Text>
        <View style={styles.tipCard}>
          <Feather name="info" size={24} color="#2563EB" style={styles.tipIcon} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Regular Oil Changes</Text>
            <Text style={styles.tipDescription}>
              Change your oil every 3,000-5,000 miles to extend engine life.
            </Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <Feather name="info" size={24} color="#2563EB" style={styles.tipIcon} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Check Tire Pressure</Text>
            <Text style={styles.tipDescription}>
              Inspect tire pressure monthly to improve fuel efficiency and safety.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  featuresContainer: {
    padding: 15,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featureDescription: {
    color: '#6B7280',
    fontSize: 14,
  },
  tipsContainer: {
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipIcon: {
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipDescription: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default HomeScreen;
