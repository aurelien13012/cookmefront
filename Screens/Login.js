import React, { useState } from "react";

import { Text, View, Image} from "react-native";
import { Header, Button, Overlay, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import env from '../env.json';

import styles from "../stylesheets/styles";

function Login(props) {
  //////varible d'état
  const [visibleSignIn, setVisibleSignIn] = useState(false);
  const [visibleSignUp, setVisibleSignUp] = useState(false);

  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpSurname, setSignUpSurname] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  
  //  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  //affiche lorsqu'il n'apparait pas ou le contraire
  const toggleOverlaySignIn = () => {
    setSignInEmail('');
    setSignInPassword('');
    setErrorsSignin([]);
    setVisibleSignIn(!visibleSignIn);
  };

  const toggleOverlaySignUp = () => {
    setSignUpEmail('');
    setSignUpFirstName('');
    setSignUpSurname('');
    setSignUpPassword('');
    setErrorsSignup([])
    setVisibleSignUp(!visibleSignUp);
  };

  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

  // bouton valider enregistre les données du signup gère aussi l'overlay et les message d'erreurs
  let handleSubmitSignup = async () => {
    console.log("signUpEmail",signUpEmail);
    console.log("validate", validate(signUpEmail));
    if(validate(signUpEmail)=== false){
      setErrorsSignup(["adresse email non valide"])
    } else {

      const data = await fetch(`http://${env.ip}:3000/users/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `firstNameFromFront=${signUpFirstName}&surnameFromFront=${signUpSurname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
      })

      const body = await data.json()

      if(body.result == true){
        props.addToken(body.token)
        // setUserExists(true)
        props.navigation.navigate('BottomNavigator', {screen : 'Fridge'})
        toggleOverlaySignUp() 
        
      } else {
        setErrorsSignup(body.error)
      }
    }

  }

  //// bouton valider lit les données pour signin gère aussi l'overlay et les message d'erreurs
  let handleSubmitSignIn = async () => {

    const data = await fetch(`http://${env.ip}:3000/users/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      props.addToken(body.token)
      // setUserExists(true)
      console.log('ready to redirect')
      props.navigation.navigate('BottomNavigator', {screen : 'Fridge'})
      toggleOverlaySignIn()

    }  else {
      setErrorsSignin(body.error)
    }

  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<Text key={i}>{error}</Text>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<Text key= {i}>{error}</Text>)
  })

  return (
    <View style = {{flex : 1}}>
      {/* en-tête de page donnant le nom de la page */}
      {/* <Header
        centerComponent={{
          text: "Login",
          style: styles.headerTitle,
        }}
        containerStyle={styles.headerContainer}
      /> */}

      <View>
        <Image
          style={styles.logo}
          source={ require("../assets/Logo-Cook-Me2.jpg")}
        />
      </View>

      {/* Bouton pour un user déja enregistré qui veut se connecter */}
      <Button 
        titleStyle={styles.buttonRegularTitle}
        buttonStyle={[styles.buttonRegular, { marginBottom: 20}]}
        title="Se connecter" 
        onPress={toggleOverlaySignIn}
      />
      {/* overlay pour remplir ces infos mail et mot de passe */}
      <Overlay 
        isVisible={visibleSignIn} 
        onBackdropPress={toggleOverlaySignIn}  
        fullScreen={true}
      >
        <View style={styles.inputView}>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Email"
            autoCapitalize = 'none'
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='grey'
              />
            }
            value = {signInEmail}
            onChangeText={(email) => setSignInEmail(email)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='grey'
              />
            }
            value = {signInPassword}
            onChangeText={(password) => setSignInPassword(password)}
          />
          {tabErrorsSignin}
          {/* bouton de validation */}
          <Button
            title="Valider"
            titleStyle={styles.buttonRegularTitle}
            buttonStyle={styles.buttonRegular}
            onPress={() => handleSubmitSignIn()}
            type="solid"
          />
          {/* bouton d'annulation */}
          <Button 
            title="Cancel"
            titleStyle={styles.buttonRegularTitle}
            buttonStyle={styles.buttonRegular}
            onPress={() => toggleOverlaySignIn()}
            type="solid"
          />
        </View>
      </Overlay>
      
      {/* Bouton pour un user qui veut s'enregistrer */}
      <Button 
        titleStyle={styles.buttonRegularTitle}
        buttonStyle={styles.buttonRegular}
        title="S'enregistrer" 
        onPress={toggleOverlaySignUp}
      />
      <Overlay 
        isVisible={visibleSignUp} 
        onBackdropPress={toggleOverlaySignUp} 
        fullScreen={true}
      >
        <View style={styles.inputView}>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Prénom"
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='grey'
              />
            }
            value = {signUpFirstName}
            onChangeText={(firstName) => setSignUpFirstName(firstName)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Nom"
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='grey'
              />
            }
            value = {signUpSurname}
            onChangeText={(surname) => setSignUpSurname(surname)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Email"
            textContentType="emailAddress"
            autoCapitalize = 'none'
            leftIcon={
              <Icon
                name='envelope'
                size={24}
                color='grey'
              />
            }
            value = {signUpEmail}
            onChangeText={(email) => setSignUpEmail(email)}
          />
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='grey'
              />
            }
            value = {signUpPassword}
            onChangeText={(password) => setSignUpPassword(password)}
          />
          {tabErrorsSignup}
          <Button
            title="Valider"
            titleStyle={styles.buttonRegularTitle}
            buttonStyle={styles.buttonRegular}
            onPress={() => handleSubmitSignup()}
            type="solid"
          />
          <Button 
            style={styles.buttonCancel}
            title="cancel"
            titleStyle={styles.buttonRegularTitle}
            buttonStyle={styles.buttonRegular}
            onPress={() => toggleOverlaySignUp()}
            type="solid"
          />
        </View>
      </Overlay>
  
    </View>
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
