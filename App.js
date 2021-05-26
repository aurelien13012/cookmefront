import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from '@expo-google-fonts/source-sans-pro';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import token from './Reducers/token';
import recipeid from './Reducers/recipeid';
import picture from './Reducers/picture';

import Account from './Screens/Account';
import Favorites from './Screens/Favorites';
import IngredientsList from './Screens/IngredientsList';
import Login from './Screens/Login';
import MyRecipes from './Screens/MyRecipes';
import NewRecipe from './Screens/NewRecipe';
import Recipe from './Screens/Recipe';
import RecipesList from './Screens/RecipesList';
import Picture from './Components/PictureScreen';
import Confirmation from './Components/Confirmation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const store = createStore(combineReducers({token, recipeid, picture}))

const NavRecipe = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Recipes' component={RecipesList} />
      <Stack.Screen name='Recipe' component={Recipe} />
      {/* <Stack.Screen name='Login' component={Login} /> */}
    </Stack.Navigator>
  )
}

const NavMyRecipe = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name='Login' component={Login} />  */}
      <Stack.Screen name='My Recipes' component={MyRecipes} />
      <Stack.Screen name='Recipe' component={Recipe} />
      <Stack.Screen name='New Recipe' component={NewRecipe} />
      <Stack.Screen name = 'Picture' component = {Picture} />
      {/* <Stack.Screen name = 'Confirmation' component = {Confirmation} /> */}
    </Stack.Navigator>
  )
}

const NavAccount = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Account' component={Account} />
      <Stack.Screen name = 'Login' component = {Login} />
    </Stack.Navigator>
  )
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {

          if (route.name == 'Fridge') {
            return (
              <MaterialCommunityIcons name="fridge-outline" size={25} color={color} />
            )
          } else if (route.name == 'Recipes') {
            return (
              <Entypo name="open-book" size={25} color={color} />
            )
          } else if (route.name === 'Favorites') {
            return (
              <Ionicons name="heart-outline" size={25} color={color} />
            )
          } else if (route.name === 'My Recipes') {
            return (
              <MaterialCommunityIcons name="chef-hat" size={25} color={color} />
            )
          } else if (route.name === 'My Account') {
            return (
              <MaterialCommunityIcons name="account-circle-outline" size={25} color={color} />
            )
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF6F61',
        inactiveTintColor: 'black',
        labelStyle : {
          fontFamily : 'SourceSansPro_300Light'
        },
        style: {
          backgroundColor: '#FFFFFF'
        }
      }}
    >
      <Tab.Screen name='Fridge' component={IngredientsList} />
      <Tab.Screen name='Recipes' component={NavRecipe} />
      <Tab.Screen name='Favorites' component={Favorites} />
      <Tab.Screen name='My Recipes' component={NavMyRecipe} options={{unmountOnBlur: true}} />
      <Tab.Screen name='My Account' component={Account} />
    </Tab.Navigator>
  )
}

function App() {
  let [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading /> 
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'Login' component={Login}/>
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



export default App;

