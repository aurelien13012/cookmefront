import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons'; 
import { Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import styles from '../stylesheets/styles'
import env from '../env.json';

function PictureScreen(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  const [visible, setVisible] = useState(false);

  let camera = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  let cameraDisplay;
  if (hasPermission && isFocused) {
    cameraDisplay = <Camera style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setFlash(
              flash === Camera.Constants.FlashMode.torch
                ? Camera.Constants.FlashMode.off
                : Camera.Constants.FlashMode.torch
            );
          }}>
          <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
          /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  }

  return (
    <View style={{ flex: 1 }}>
      <Overlay isVisible={visible} width="auto" height="auto">
        <Text>Loading</Text>
      </Overlay>
      {cameraDisplay}

      <Button
        onPress={async () => {
          if (camera) {
            let photo = await camera.takePictureAsync({ quality: 0.005, base64: true });
            props.onSnap({
              base64: photo.base64,
              uri: photo.uri
            })
            props.navigation.navigate('New Recipe')
          }
        }}
        icon={
          <FontAwesome
            name="camera"
            size={24}
            color="#FF6F61"
          />
        }
        buttonStyle={styles.itemMyRecipes}
        type="solid"
      />
    </View>
  )
}

function mapDispactchToProps(dispatch) {
  return {
    onSnap: function (pictureData) {
      dispatch({ type: 'addPicture', pictureData })
    }
  }
}

export default connect(
  null,
  mapDispactchToProps
)(PictureScreen);