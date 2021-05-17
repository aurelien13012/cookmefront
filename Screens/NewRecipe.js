import React from 'react';
import { View, Text, Button } from 'react-native';

function NewRecipe(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>new recipe</Text>
        <Button title = 'confirmation'//Il faudra faire une redirection et non un bouton pour la confirmation
        onPress={()=> props.navigation.navigate('Confirmation')}
        />   
   </View>
 );
}

export default NewRecipe;