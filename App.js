import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';

import Account from './Screens/Account';
import Confirmation from './Screens/Confirmation';
import Favorites from './Screens/Favorites';
import IngredientsList from './Screens/IngredientsList';
import Login from './Screens/Login';
import MyRecipes from './Screens/MyRecipes';
import NewRecipe from './Screens/NewRecipe';
import Recipe from './Screens/Recipe';
import RecipesList from './Screens/RecipesList';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NavRecipe = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Recipes' component={RecipesList} />
      <Stack.Screen name='Recipe' component={Recipe} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}

const NavMyRecipe = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='My Recipes' component={MyRecipes} />
      <Stack.Screen name='New Recipe' component={NewRecipe} />
      <Stack.Screen name='Confirmation' component={Confirmation} />
    </Stack.Navigator>
  )
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'Fridge') {
            // iconName = 'fridge-outline';
            return (
              <MaterialCommunityIcons name="fridge-outline" size={25} color='#FFFFFF' />
            )
          } else if (route.name == 'Recipes') {
            return (
              <Entypo name="open-book" size={24} color='#FFFFFF' />
            )
          } else if (route.name === 'Favorites') {
            return (
              <Ionicons name="heart-outline" size={25} color='#FFFFFF' />
            )
          } else if (route.name === 'My Recipes') {
            return (
              <MaterialCommunityIcons name="chef-hat" size={25} color='#FFFFFF' />
            )
          } else if (route.name === 'My Account') {
            iconName = '';
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#009788',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#111224',
        }
      }}
    >
      <Tab.Screen name='Fridge' component={IngredientsList} />
      <Tab.Screen name='Recipes' component={NavRecipe} />
      <Tab.Screen name='Favorites' component={Favorites} />
      <Tab.Screen name='My Recipes' component={NavMyRecipe} />
      <Tab.Screen name='My Account' component={Account} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
