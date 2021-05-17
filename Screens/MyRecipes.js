import React from 'react';
import { View, Text, Button } from 'react-native';

function MyRecipes(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>MyRecipes</Text>
        <Button title = 'recipe'//bouton pour le click pour ajouter une nouvelle recette
        onPress={()=> props.navigation.navigate('New Recipe')}
        />   
   </View>
 );
}

export default MyRecipes;