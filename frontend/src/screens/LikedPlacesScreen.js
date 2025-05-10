import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LikedStyle from '../../style/Liked'

const likedShops = [
  { id: '1', name: 'Joe’s Auto Repair', address: '123 Main St, New York' },
  { id: '2', name: 'Speedy Tires', address: '456 Broadway, Brooklyn' },
  { id: '3', name: 'Elite Motors', address: '789 Market St, Queens' },
];

const LikedPlacesScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={LikedStyle.card}>
      <View>
        <Text style={LikedStyle.name}>{item.name}</Text>
        <Text style={LikedStyle.address}>{item.address}</Text>
      </View>
      <Feather name="heart" size={20} color="#EF4444" />
    </TouchableOpacity>
  );

  return (
    <View style={LikedStyle.container}>
      <Text style={LikedStyle.header}>Liked Places</Text>
      <FlatList
        data={likedShops}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default LikedPlacesScreen;
