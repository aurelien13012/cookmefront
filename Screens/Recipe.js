import React, {useState, useEffect} from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Image, Icon, LinearProgress } from 'react-native-elements';
import { List } from 'react-native-paper';

import styles from '../stylesheets/styles';
import env from '../env.json';

function Recipe(props) {

  ////// VARIABLES D'ETATS
  // Pour les acccordéons
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [picsExpanded, setPicsExpanded] = useState(false);
  const [recipe, setRecipe] = useState({});

  const idRecipe = '60a794f5b672a34d448d7452';

  useEffect(() => {
    const getRecipeData = async () => {
      const rawData = await fetch(`http://${env.ip}:3000/recipe/readRecipe`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idFromFront=${idRecipe}`
      });  
      const data = await rawData.json();
      console.log('data', data);
      setRecipe(data.response);

      return data;
    }
    getRecipeData();
  }, [])

  if (Object.keys(recipe).length === 0) {
    console.log('in safe path');
    return (
      <View>
        <Text>
          Chargement...
        </Text>
      </View>
    )
  }

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
              {recipe.name} 
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
            Nombre de personnes : {recipe.numOfPersons}
          </Text>
          <Icon
            name="minuscircleo"
            type="antdesign"
            style={{
              marginLeft: 10,
              marginTop: 0
            }}
          /> 
          <Icon
            name="pluscircleo"
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
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <List.Item
                title={`${ingredient.ingredientsIds.name} (${ingredient.quantity} ${ingredient.unit})`}
                titleStyle={styles.body}
              />
            )
          })}
        </List.Accordion>

        {/* Liste des étapes */}
        <List.Accordion
          title="Etapes"
          expanded={stepsExpanded}
          onPress={() => {setStepsExpanded(!stepsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          {recipe.steps.map((step, index) => {
            return (
              <List.Item
                title={`${index+1}. ${step}`}
                titleStyle={styles.body}
              />
            )
          })}
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