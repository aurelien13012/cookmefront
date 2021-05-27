import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Overlay, Image } from 'react-native-elements';

import { connect } from 'react-redux';

import styles from '../stylesheets/styles'

function Confirmation(props) {

  // console.log("props", props);
  // console.log("props.navigation", props.navigation);

  //Variables d'états
  const [visible, setVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  //Fonction pour affichage de l'overlay
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //fonction pour clique sur bouton confirmation page newrecipe
  const handleClick = async () => {
    console.log('click soumettre recette okay');
    toggleOverlay();
    await props.propsSubmitMyRecipe();
    setIsLoaded(true);
  }

  let overlayContent = 
    <View 
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" color="#FF6F61" />
    </View>;
  
  if (isLoaded) {
    overlayContent = 
      <View
        style={{display: 'flex',
        alignItems: 'center'}}
      >
        <Image
          source={require('../assets/chef.png')}
          style={{
            width: 230,
            height: 270,
            marginTop: 0,
            marginBottom: 20
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'SourceSansPro_600SemiBold',
            color: '#FF6F61',
            marginBottom: 10
          }}
        >
          Félicitations !
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'SourceSansPro_600SemiBold',
            color: '#FF6F61',
            marginBottom: 15
          }}
        >
          Votre recette est en ligne
        </Text>
        <Button
          title="Voir ma recette"
          buttonStyle={styles.buttonRegular}
          titleStyle={styles.buttonRegularTitle}
          onPress={() => {
            props.navigation.navigate('Recipe'); 
            // props.recipeId; 
            // props.token;
            toggleOverlay();
          }}

        />
      </View>
  }

  return (
    <View>
      <Button
        titleStyle={styles.buttonRegularTitle}
        buttonStyle={styles.buttonRegular}
        title="Je valide ma recette" onPress={() => { handleClick() }} />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: 300,
          height: 450,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {overlayContent}
        {/* <Image
          source={require('../assets/chef.png')}
          style={{
            width: 230,
            height: 270,
            marginTop: 0,
            marginBottom: 20
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'SourceSansPro_600SemiBold',
            color: '#FF6F61',
            marginBottom: 10
          }}
        >
          Félicitations !
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'SourceSansPro_600SemiBold',
            color: '#FF6F61',
            marginBottom: 15
          }}
        >
          Votre recette est en ligne
        </Text>
        
        <Button
          title="Voir ma recette"
          buttonStyle={styles.buttonRegular}
          titleStyle={styles.buttonRegularTitle}
          onPress={() => {
            props.navigation.navigate('Recipe'); 
            toggleOverlay();
          }}

        /> */}
      </Overlay>
    </View>
  );
}

function mapStateToProps(state) {
  return { 
    token: state.token,
    recipeId: state.recipeid
  }
}

export default connect(
  mapStateToProps, null
  )(Confirmation);
