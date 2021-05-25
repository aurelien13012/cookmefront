import React, {useState, useEffect} from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Image, Icon, LinearProgress } from 'react-native-elements';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';

import styles from '../stylesheets/styles';
import env from '../env.json';

function Recipe(props) {

  ////// VARIABLES D'ETATS
  // Pour les acccordéons
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [picsExpanded, setPicsExpanded] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [nbPerson, setNbPerson] = useState(4);
  const [rate, setRate] = useState(0.5);
  const [isMyRecipe, setIsMyRecipe] = useState(false);

  ///// VARIABLES REDUX
  //const idRecipe = '60a7b2d33a185c39987353d2';
  const idRecipe = props.recipeId;
  // const token = env.token;
  const token = props.token;

  useEffect(() => {
    const getRecipeData = async () => {
      const rawData = await fetch(`http://${env.ip}:3000/recipe/readRecipe`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
      });  
      const data = await rawData.json();
      const recipeFromDB = data.recipe;
      const userFromDB = data.user;
      console.log('recipe', recipeFromDB);
      console.log('user', userFromDB);
      setRecipe(recipeFromDB);
      setNbPerson(recipeFromDB.numOfPersons);
      const isFavFromDB = userFromDB.favoritesIds.find(id => id === recipeFromDB._id);
      setIsFav(isFavFromDB);
      const isMyRecipeFromDB = userFromDB.recipesIds.find(id => id === recipeFromDB._id);
      setIsMyRecipe(isMyRecipeFromDB);
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

  const handleFavoriteButton = async () => {
    if (isFav) { // Si isFav = true à ce moment, cela veut dire que le user le retire de ses favoris
      await fetch(`http://${env.ip}:3000/recipe/removeFromFavorites`,
        {
          method: 'DELETE',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
        }
      );
    } else {
      await fetch(`http://${env.ip}:3000/recipe/addToFavorites`,
        {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
        }
      ); 
    }
    console.log('click on favorite');
    setIsFav(!isFav);
  }

  const handleLikeButton = () => {
    console.log('click on like');
    setIsLiked(!isLiked);
  }

  const handleDislikeButton = () => {
    console.log('click on dislike');
    setIsDisliked(!isDisliked);
  }

  const addPerson = () => {
    console.log('click on +');

    let recipeCopy = {...recipe};
    recipeCopy.ingredients.map((ingredient) => {
      ingredient.quantity = ingredient.quantity / nbPerson * (nbPerson + 1)
    })
    setRecipe(recipeCopy);
    setNbPerson(nbPerson+1);
  }

  const removePerson = () => {
    console.log('click on -');
    if (nbPerson <= 1) {
      setNbPerson(1);
      return;
    }
    let recipeCopy = {...recipe};
    recipeCopy.ingredients.map((ingredient) => {
      ingredient.quantity = ingredient.quantity / nbPerson * (nbPerson - 1)
    })
    setRecipe(recipeCopy);
    setNbPerson(nbPerson-1);
  }

  const handleModifyRecipe = () => {
    console.log('click on modify');
  }

  const handleDeleteRecipe = async (id) => {
    console.log('click on delete');
    await fetch (`http://${env.ip}:3000/deleteMyRecipe/${id}`,
      {
        method: 'DELETE'
      }
    );
    props.navigation.navigate('BottomNavigator', {screen : 'My Recipes'})
  }

  let iconsForOwner = [];
  if (isMyRecipe) {
    iconsForOwner = [
      <Icon
        name="pencil" 
        type="font-awesome"
        color="#FF6F61"
        size={28}
        containerStyle={{
          backgroundColor: 'white',
          width: 44,
          height: 44,
          borderRadius: 22,
          borderStyle: 'solid',
          borderColor: '#FF6F61',
          borderWidth: 2,
          position: 'absolute',
          top: 50,
          left: 280,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => handleModifyRecipe()}
        key={0}
      />,
      <Icon
        name="trash" 
        type="font-awesome"
        color="#FF6F61"
        size={28}
        containerStyle={{
          backgroundColor: 'white',
          width: 44,
          height: 44,
          borderRadius: 22,
          borderStyle: 'solid',
          borderColor: '#FF6F61',
          borderWidth: 2,
          position: 'absolute',
          top: 50,
          left: 330,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => handleDeleteRecipe(recipe._id)}
        key={1}
      />
    ];   
  }

  return (
 
    <ScrollView    
      style={{backgroundColor: 'white', height: '100%', flex: 1}}
    > 
    {/* Conteneur principal    */}

      {/* Image de fond */}

      <Image
        source={require('../assets/pate_pesto.jpg')}
        style={styles.recipePic}
      />

      {iconsForOwner}
     
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
              name={isFav ? "heart" : "heart-outline"} 
              type="ionicon"
              color="#FF6F61"
              size={28}
              containerStyle={{
                marginRight: 10,
                marginTop: 4
              }}
              onPress={() => handleFavoriteButton()}
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
              value={rate}
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
              {rate*100 + '%'}
            </Text>
            <Icon
              onPress={() => handleLikeButton()}
              name={isLiked ? "like1" : "like2"}
              type="antdesign"
              containerStyle={{
                marginLeft: 10,
                marginTop: 2
              }}

            />
            <Icon
              onPress={() => handleDislikeButton()}
              name={isDisliked ? "dislike1" : "dislike2"}
              type="antdesign"
              containerStyle={{
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
            Nombre de personnes : {nbPerson}
          </Text>
          <Icon
            name="minuscircleo"
            type="antdesign"
            containerStyle={{
              marginLeft: 10,
              marginTop: 0
            }}
            onPress={() => removePerson()}
          /> 
          <Icon
            name="pluscircleo"
            type="antdesign"
            containerStyle={{
              marginLeft: 10,
              marginTop: 0
            }}
            onPress={() => addPerson()}
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
                key={index}
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
                key={index}
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
              key={0}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={1}
            />
            <Image  
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={2}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={3}
            />
 
          </View>

        </List.Accordion>  

      </View>
    


    </ScrollView>
  );
}

function mapStateToProps(state) {
  return { 
    token: state.token,
    recipeId: state.recipeid
  }
}

export default connect(mapStateToProps, null)(Recipe)