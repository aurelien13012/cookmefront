import React from 'react';
import { View, Text, Button } from 'react-native';
import { Image, Icon, LinearProgress } from 'react-native-elements';

import styles from '../stylesheets/styles'

function Recipe(props) {


  return (
    <View
      style={{backgroundColor: 'white', height: '100%'}}
    >   
      <Image
        source={require('../assets/pate_pesto.jpg')}
        style={styles.recipePic}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <View
          style={styles.infoBoxContainer}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={styles.infoBoxTitle}
            >
              Pates au pesto 
            </Text>
            <Icon
              name="heart-outline"
              type="ionicon"
              color="#FF6F61"
              size={28}
              style={{
                marginRight: 10,
                marginTop: 4
              }}
            />
          </View>
          
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 4
            }}
            >
            <Icon
                name="clock"
                type="fontisto"
                size={24}
                style={{
                  marginLeft: 10,
                  marginTop: 0
                }}
              />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 0,
                fontSize: 18,
                fontFamily: 'SourceSansPro_400Regular'
              }}
            >
              15 minutes
            </Text>
          </View>
          
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 5
            }}
          >
            <LinearProgress
              variant='determinate'
              value={0.8}
              color='blue'
              trackColor='red'
              style={{
                width: '50%',
                marginTop: 15,
                marginLeft: 10,
                height: 5
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SourceSansPro_400Regular',
                marginLeft: 10,
                color: 'blue',
                marginTop: 5
              }}
            >
              80%
            </Text>
            <Icon
              name="like2"
              type="antdesign"
              style={{
                marginLeft: 10,
                marginTop: 2
              }}
            />
            <Icon
              name="dislike2"
              type="antdesign"
              style={{
                marginLeft: 10,
                marginTop: 2
              }}
            />
          </View>
        </View>

      </View>
      
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Text>
            Nombre de personnes : 4
          </Text>

        </View>

      </View>
    


    </View>
  );
}

export default Recipe;