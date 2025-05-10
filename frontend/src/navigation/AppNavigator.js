import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ShopsScreen from '../screens/ShopsScreen';
import ShopDetailsScreen from '../screens/ShopDetailsScreen';
import TutorialsScreen from '../screens/TutorialsScreen';
import CompareScreen from '../screens/CompareScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LikedPlacesScreen from '../screens/LikedPlacesScreen';
import ForumScreen from '../screens/ForumScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ----- Shops Stack -----
const ShopsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerLeft: () => (
          <View style={{ marginLeft: 15 }}>
            <Image 
              source={require('../../assets/logo.png')}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 15 }}>
            <TouchableOpacity>
              <Feather name="heart" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Stack.Screen name="Shops" component={ShopsScreen} />
      <Stack.Screen 
        name="ShopDetails" 
        component={ShopDetailsScreen} 
        options={({ route }) => ({ 
          title: route.params.shop.name, 
          headerTitleAlign: 'center', 
        })}
      />
    </Stack.Navigator>
  );
};

// ----- Home Stack -----
const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerLeft: () => (
          <View style={{ marginLeft: 15 }}>
            <Image 
              source={require('../../assets/logo.png')}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('LikedPlaces')}>
              <Feather name="heart" size={24} color="black" style={{ marginRight: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      {/* Placeholder screens */}
      <Stack.Screen name="LikedPlaces" component={LikedPlacesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

// ----- App Navigator -----
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Shops') {
            iconName = 'tool';
          } else if (route.name === 'Forum') {
            iconName = 'book';
          } else if (route.name === 'Compare') {
            iconName = 'bar-chart-2';
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        headerShown: false, // <- hide default header from Tabs
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
      />
      <Tab.Screen 
        name="Shops" 
        component={ShopsStack}
      />
      <Tab.Screen 
        name="Forum" 
        component={ForumScreen}
      />
      <Tab.Screen 
        name="Compare" 
        component={CompareScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
