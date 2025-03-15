import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiceItem = ({ service }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </View>
      <Text style={styles.price}>${service.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});

export default ServiceItem;
