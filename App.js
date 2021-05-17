import React from 'react';

import RecipesList from './Screens/RecipesList';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <RecipesList />
  );
}

export default App;