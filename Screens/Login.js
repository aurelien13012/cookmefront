import React, { useState, useEffect } from "react";

import { View, Text } from "react-native";
import { Card, Header, Button, Overlay, Input } from "react-native-elements";
import {connect} from 'react-redux';

import styles from "../stylesheets/styles";

function Login(props) {
  const [visible, setVisible] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  var handleSubmitSignup = async () => {
    
    
  }

  var handleSubmitSignin = async () => {

    
  }

  return (
    <View style = {{flex : 1}}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: "Login",
          style: styles.headerTitle,
        }}
        containerStyle={styles.headerContainer}
      />

      <Button title="S'identifier" onPress={toggleOverlay} style={styles.buttonSignIn}/>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true}>
        <View style={styles.inputView}>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <Button
            title="Valider"
            buttonStyle={{ backgroundColor: "#FF6F61" }}
            onPress={() => handleSubmitSignIn()}
            type="solid"
          />
        </View>
      </Overlay>
      
      <Button title="S'enregistrer" onPress={toggleOverlay} style={styles.buttonSignUp}/>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true}>
        <View style={styles.inputView}>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Prénom"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Nom"
            onChangeText={(surName) => setSurName(surName)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <Button
            title="Valider"
            buttonStyle={{ backgroundColor: "#FF6F61" }}
            onPress={() => handleSubmitSignup()}
            type="solid"
          />
        </View>
      </Overlay>
  
    </View>

      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
      // <Text>Login</Text>
      // <Button title = 'sign-up' //il faudra faire des redirections pour pointer ou lutilisateur va aller suite à son signup
      //   onPress={()=> props.navigation.navigate('My Recipes', {screen : 'My Recipes'})}
      // />
      // <Button title = 'sign-in' //il faudra faire des redirections pour pointer ou lutilisateur va aller suite à son signin
      //   onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Favorites'})}
      // /> 
    
  );
}

function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
