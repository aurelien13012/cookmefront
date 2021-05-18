import React, {useState} from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Image, Icon, LinearProgress } from 'react-native-elements';
import { List } from 'react-native-paper';

import styles from '../stylesheets/styles'

function Recipe(props) {

  ////// VARIABLES D'ETATS
  // Pour les acccordéons
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [picsExpanded, setPicsExpanded] = useState(false);


  return (
 
    <ScrollView    
      style={{backgroundColor: 'white', height: '100%'}}
    > 
    {/* Conteneur principal    */}

      {/* Image de fond */}
      <Image
        source={require('../assets/pate_pesto.jpg')}
        style={styles.recipePic}
      />

      {/* Centrage boite d'information */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        {/* Conteneur boite d'information */}
        <View
          style={styles.infoBoxContainer}
        >
          {/* 1ere ligne */}
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
          
          {/* 2eme ligne */}
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
          
          {/* 3eme ligne */}
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
      
      {/* Conteneur du corps de la recette */}
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15,
          marginBottom: 20
        }}
      >
        {/* Conteneur Nombre de personnes */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Text style={styles.body}>
            Nombre de personnes : 4
          </Text>
          <Icon
            name="pluscircleo"
            type="antdesign"
            style={{
              marginLeft: 10,
              marginTop: 0
            }}
          />
          <Icon
            name="minuscircleo"
            type="antdesign"
            style={{
              marginLeft: 10,
              marginTop: 0
            }}
          />  
        </View>

        {/* Liste des ingrédients nécessaires */}
        <List.Accordion
          title="Ingrédients"
          expanded={ingredientsExpanded}
          onPress={() => {setIngredientsExpanded(!ingredientsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          <List.Item
            title='Beurre (100g)'
          />
          <List.Item
            title='Farine (250g)'
          />
        </List.Accordion>

        {/* Liste des étapes */}
        <List.Accordion
          title="Etapes"
          expanded={stepsExpanded}
          onPress={() => {setStepsExpanded(!stepsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          <List.Item
            title='1. blabla'
          />
          <List.Item
            title='2. bloublou'
          />
        </List.Accordion>  

        {/* Liste des photos */}
        <List.Accordion
          title="Images"
          expanded={picsExpanded}
          onPress={() => {setPicsExpanded(!picsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
            />
            <Image  
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
            />
 
          </View>

        </List.Accordion>  

      </View>
    


    </ScrollView>
  );
}

export default Recipe;