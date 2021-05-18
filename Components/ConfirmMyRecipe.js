import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Image } from 'react-native-elements';

function ConfirmMyRecipe(props) {

  const [visible, setVisible] = useState(false);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };



  return (
    <View>   
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay 
        isVisible={visible} 
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: 300,
          height: 400,
          display: 'flex',
          alignItems: 'center'  
        }}
      >
        <Image
          source={require('../assets/chef.png')}
          style={{
            width: 250,
            height: 290,
            marginTop: 0
          }}
        />
        <Text>Félicitations !</Text>
        <Text>Votre recette est en ligne</Text>
        <Button title="Voir ma recette"/>
      </Overlay>
    </View>
  );
}

export default ConfirmMyRecipe;