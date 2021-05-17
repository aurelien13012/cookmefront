import React from 'react';
import { View, Text, Button} from 'react-native';

function IngredientsList(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>IngredientsList</Text>
        <Button title = 'Valider'//bouton pour le click qui renvoit vers la liste des recettes adaptées aux aliments
        onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Recipes'})}
        />
   </View>
 );
}

export default IngredientsList;