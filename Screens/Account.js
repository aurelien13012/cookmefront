import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Header, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import styles from '../stylesheets/styles';

const [infoUser, setInfoUser] = useState([]);

function Account(props) {

  useEffect(() => {
    const infoUser = async () => {
      //console.log('fetch')
      const rawData = await fetch(`http://${env.ip}:3000/account/infoUser`);
      const data = await rawData.json();
      setInfoUser(data);
    }
    infoUser();
  }, [])

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
      <Text>{infoUser.name}</Text>
      <Button title='Déconnexion'
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}


export default connect(mapStateToProps, null)(Account)
