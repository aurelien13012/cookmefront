import React from 'react';
import { View, Text, Button } from 'react-native';

function RecipesList(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>recipes List</Text>
        <Button title = 'recipe'//bouton pour le click sur une recette
        onPress={()=> props.navigation.navigate('Recipe')}
        />   
   </View>
 );
}

export default RecipesList;