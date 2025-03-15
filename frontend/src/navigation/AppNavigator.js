import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ShopsScreen from '../screens/ShopsScreen';
import ShopDetailsScreen from '../screens/ShopDetailsScreen';
import TutorialsScreen from '../screens/TutorialsScreen';
import CompareScreen from '../screens/CompareScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShopsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shops" component={ShopsScreen} />
      <Stack.Screen 
        name="ShopDetails" 
        component={ShopDetailsScreen} 
        options={({ route }) => ({ title: route.params.shop.name })}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ShopsTab') {
            iconName = 'tool';
          } else if (route.name === 'Tutorials') {
            iconName = 'book';
          } else if (route.name === 'Compare') {
            iconName = 'bar-chart-2';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2563EB',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="ShopsTab" 
        component={ShopsStack} 
        options={{ title: 'Mechanic Shops' }}
      />
      <Tab.Screen 
        name="Tutorials" 
        component={TutorialsScreen} 
        options={{ title: 'Tutorials' }}
      />
      <Tab.Screen 
        name="Compare" 
        component={CompareScreen} 
        options={{ title: 'Compare' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
