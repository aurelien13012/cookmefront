import React from 'react';
import { View, Text, Button } from 'react-native';

function Recipe(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>Recipe</Text>
        <Button title = 'heart'//bouton pour le click en tant que favoris
        onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Favorites'})}
        
        />
   </View>
 );
}

export default Recipe;