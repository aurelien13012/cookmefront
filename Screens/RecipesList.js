import React, {useState, useEffect} from 'react';

import {View, Text, ScrollView, Image } from 'react-native';
import {Button, SearchBar, Card, Header} from 'react-native-elements'
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/styles';

function RecipesList(props) {
  const [searchRecipesList, setSearchRecipesList] = useState('')
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [recipesList, setRecipesList] = useState([])

  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchRecipesList(search)
  }

    //////// USE EFFECTS
  // Charger les données
  useEffect(() => {
    setIngredientsList(ingredientsListData);
    setRecipesList(recipesListData)
  }, [])

  //// DONNEES EN DUR
  const ingredientsListData = [
    {
      name: 'Courgette',
      selected: false
    },
    {
      name: 'Poulet',
      selected: false
    },
  ];

  const recipesListData = [
    {
      name : 'Pate au beurre',
      imgRecipe : require('../assets/pates-au-beurre.jpg')
    },
    {
      name : 'Pate à la bolognaise',
      imgRecipe : require('../assets/pates-bolognaise.jpg')
    }
  ]

  ////// FUNCTION UTILITAIRES
  const handleButtonIngredients = (array, index) => {
    const ingredientsListCopy = [...ingredientsList];
    // Toggle le boolééen "selected"
    ingredientsListCopy[index].selected = !ingredientsListCopy[index].selected
    setIngredientsList(ingredientsListCopy);
    console.log('click on ' + ingredientsListCopy[index].name + '; selected: ' + ingredientsListCopy[index].selected);
  }

  const handleButtonRecipe = (array, index) => {

  }
console.log('recipesList', recipesList)
  return (
    
    <View>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
        text: 'Recettes',
        style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
        />

        {/* barre de recherche pour les recettes */}
        <SearchBar
          round
          searchIcon = {{size: 24}}
          lightTheme
          inputStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'white', borderWidth: 0}}
          placeholder = 'Recherche...'
          onChangeText = {updateSearch}
          value = {searchRecipesList}
        />
        
        <ScrollView>
            
          <Card>
            <Card.Title>Recette suggérée :</Card.Title>
            <Text style= {styles.cardText}>
              Pates au pesto
            </Text>
            <Card.Image style= {styles.cardImage} source={require('../assets/pates-au-pesto.jpg')}
              onPress={()=> props.navigation.navigate('Recipe')}>
            </Card.Image>
          </Card>

          <List.Accordion
          title="Avez vous ?"
          expanded={ingredientsExpanded}
          onPress={() => {setIngredientsExpanded(!ingredientsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
          >
            <View
            style={styles.accordionItemsContainer}
            >
              {ingredientsList.map((item, index) => (
                <Button
                  title={item.name}
                  buttonStyle={item.selected ? styles.accordionItemSelected : styles.accordionItem}
                  onPress={() => handleButtonIngredients(ingredientsList, index)}
                  titleStyle={item.selected ? styles.accordionItemTitleSelected : styles.accordionItemTitle}
                />
              ))}
            </View>
          </List.Accordion> 

          <Card style={styles.cardContainer} >
            <Card.Title>Recettes avec pates :</Card.Title>
            <Card.Divider/>
            {recipesList.map((item, index) => (  
              <View key={index} style= {styles.cardLigne} >
                <Text style={styles.cardName}>{item.name}</Text>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={item.imgRecipe}
                />
              </View>                
                ))
                }
          </Card>

        </ScrollView>
    </View>
  );
}

export default RecipesList;