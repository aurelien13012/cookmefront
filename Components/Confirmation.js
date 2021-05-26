import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Image } from 'react-native-elements';

import styles from '../stylesheets/styles'

function Confirmation(props) {
  console.log("props", props);
  console.log("props.navigation", props.navigation);

  const [visible, setVisible] = useState(false);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //() => {}

  const handleClick = () => {
    console.log('click soumettre recette okay');
    props.propsSubmitMyRecipe();
  }

  return (
    <View>   

      <Button title="Je valide ma recette" onPress={() => {toggleOverlay(); handleClick()}}/>

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
          onPress={() => {props.navigation.navigate('Recipe'); toggleOverlay()}}
        />
      </Overlay>
    </View>
  );
}

export default Confirmation;