import React from "react";
import { View } from "react-native";
import { Button, Header, Text } from 'react-native-elements';

import styles from '../stylesheets/styles';


function Account(props) {
  return (

    <View style={{ flex: 1 }}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Mon compte',
          style: styles.headerTitleNewRecipe
        }}
        containerStyle={styles.headerContainer}
        centerContainerStyle={{ flex: 0 }}
      />
      <Text style = {styles.itemMyRecipesTitle, styles.itemMyRecipes}>Mes informations personnelles</Text>
      <Button title='Déconnexion'
        onPress={() => props.navigation.navigate('BottomNavigator', { screen: 'Login' })}
      />
    </View>
  );
}

export default Account;
