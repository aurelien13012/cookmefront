import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Header, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/styles';
import env from "../env.json";

function Account(props) {

  const [infoUser, setInfoUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      //console.log('fetch')
      const rawData = await fetch(`http://${env.ip}:3000/account/infoUser`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `userTokenFromFront=${props.token}`
      });
      const data = await rawData.json();
      //console.log("data", data);
      setInfoUser(data);
    }
    getUser();
  }, [])

  console.log("infouser",infoUser);

  return (

    <View style={{ flex: 1 }}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Mon compte',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
        centerContainerStyle={{ flex: 0 }}
      />
      <View
        style={[styles.itemMyRecipes, {flex: 0, margin: 10}]}
      >
        <Text 
          style = {[
            styles.accordionTitle,
            {
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 10
            }]}
        >
          Mes informations personnelles
        </Text>
        <View
          style={styles.containerUserInfo}
        >
          <Icon
            name='user'
            size={24}
            color='#FF6F61'
            style={styles.iconUserInfo}
          />
          <Text
            style={[styles.buttonRegularTitle, {marginLeft: 10}]}
          >
            {infoUser.firstName}
          </Text>
        
        </View>
        <View
          style={styles.containerUserInfo}
        >
          <Icon
            name='user'
            size={24}
            color='#FF6F61'
            style={styles.iconUserInfo}
          />
          <Text
            style={[styles.buttonRegularTitle, {marginLeft: 10}]}
          >
            {infoUser.surname}
          </Text>
        
        </View>
        <View
          style={styles.containerUserInfo}
        >
          <Icon
            name='envelope'
            size={24}
            color='#FF6F61'
            style={styles.iconUserInfo}
          />
          <Text
            style={[styles.buttonRegularTitle, {marginLeft: 10}]}
          >
            {infoUser.email}
          </Text>
        
        </View>
     
      </View>


      <Button 
      titleStyle={styles.buttonRegularTitle}
      buttonStyle={styles.buttonRegular}
      title='Déconnexion'
        onPress={() => props.navigation.navigate('Login')}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}


export default connect(mapStateToProps, null)(Account)
