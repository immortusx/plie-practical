import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View } from 'react-native';

import SearchScreen from '../screens/SearchScreen';
import EventListingScreen from '../screens/EventListing';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Events'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user-o';
          }

          return (
            <View style={focused ? styles.focusedIconContainer : null}>
              <Icon name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#ff4081',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Events" component={EventListingScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 0,           
    height: 70,                  
    paddingBottom: 10, 
    paddingTop: 10,  
  },
  tabBarLabelStyle: {
    fontSize: 14,   
    fontWeight: '600',      
  },
  focusedIconContainer: {
    borderRadius: 20,         
  },
});

export default BottomTabNavigator;