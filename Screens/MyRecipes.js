import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, SearchBar, ListItem, Button, Text } from 'react-native-elements';

import styles from '../stylesheets/styles'

function MyRecipes(props) {

  //UseStates
  const [searchMyRecipesList, setSearchMyRecipesList] = useState('');
  const [myRecipesList, setMyRecipesList] = useState([]);

  //Données en dur
  const myRecipe = [
    {
      name: 'Tournedos'
    },
    {
      name: 'Salade Niçoise'
    },
    {
      name: 'Pot au feu'
    },
    {
      name: 'Salade Césare'
    }
  ]

  //UseEffect
  useEffect(() => {
    setMyRecipesList(myRecipe);
    console.log('myrecipelist', myRecipesList.length)
    console.log('recipelist', myRecipesList)
  }, [])


  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchMyRecipesList(search)
  }

  //fonction utilitaires
  const myOwnRecipes = () => {
    if (myRecipesList.length === 0) {
      return (
        <View>
          <Text style={styles.noRecipes}>Vous n'avez pas encore de recettes. Proposez vite une recette ! </Text>
        </View>
      )
    } else {
      return (
        myRecipesList.map((item, i) => (
          <Button
            title={item.name}
            titleStyle={styles.itemMyRecipesTitle}
            buttonStyle={styles.itemMyRecipes}
            onPress={() => props.navigation.navigate('Recipe')}
          />
        )
        )
      )
    }
  }


  return (
    <View>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Mes recettes',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
      />
      {/* Barre de recherche */}
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        lightTheme
        inputStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
        placeholder='Recherche...'
        onChangeText={updateSearch}
        value={searchMyRecipesList}
      />

      {myOwnRecipes()}

      <Button
        title='+'//bouton pour le click pour ajouter une nouvelle recette
        titleStyle={styles.addRecipeTitle}
        buttonStyle={styles.addRecipe}
        onPress={() => props.navigation.navigate('New Recipe')}
      />

    </View>
  );
}

export default MyRecipes;