import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ComparisonTable = ({ shops, services }) => {
  // Get shop service details (price, etc.)
  const getServiceDetails = (shop, serviceName) => {
    const service = shop.services.find(s => s.name === serviceName);
    return service || { price: null };
  };

  // Find lowest price for a service
  const findLowestPrice = (serviceName) => {
    let lowestPrice = Infinity;
    let lowestShopId = null;

    shops.forEach(shop => {
      const service = getServiceDetails(shop, serviceName);
      if (service.price && service.price < lowestPrice) {
        lowestPrice = service.price;
        lowestShopId = shop.id;
      }
    });

    return { lowestPrice, lowestShopId };
  };

  return (
    <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={true}>
      <View>
        {/* Header row with shop names */}
        <View style={styles.headerRow}>
          <View style={styles.serviceCell}>
            <Text style={styles.headerText}>Service</Text>
          </View>
          {shops.map(shop => (
            <View key={shop.id} style={styles.shopCell}>
              <Text style={styles.headerText} numberOfLines={2}>{shop.name}</Text>
            </View>
          ))}
        </View>

        {/* Service rows */}
        {services.map(serviceName => {
          const { lowestPrice, lowestShopId } = findLowestPrice(serviceName);
          
          return (
            <View key={serviceName} style={styles.serviceRow}>
              <View style={styles.serviceCell}>
                <Text style={styles.serviceText}>{serviceName}</Text>
              </View>
              
              {shops.map(shop => {
                const service = getServiceDetails(shop, serviceName);
                const isLowestPrice = service.price === lowestPrice && shop.id === lowestShopId;
                
                return (
                  <View key={shop.id} style={styles.shopCell}>
                    {service.price ? (
                      <Text style={[
                        styles.priceText,
                        isLowestPrice && styles.lowestPriceText
                      ]}>
                        ${service.price.toFixed(2)}
                        {isLowestPrice && ' ✓'}
                      </Text>
                    ) : (
                      <Text style={styles.notOfferedText}>N/A</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  serviceRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  serviceCell: {
    width: 150,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  shopCell: {
    width: 120,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceText: {
    color: '#1F2937',
  },
  priceText: {
    fontWeight: '500',
    color: '#1F2937',
  },
  lowestPriceText: {
    color: '#059669',
    fontWeight: 'bold',
  },
  notOfferedText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});

export default ComparisonTable;
