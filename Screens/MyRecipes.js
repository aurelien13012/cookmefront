import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { Header, SearchBar, ListItem } from 'react-native-elements';

import styles from '../stylesheets/styles'

function MyRecipes(props) {

  const [searchMyRecipesList, setSearchMyRecipesList] = useState('')

  const MyRecipe = [
    { 
      name : 'Tournedos'
    },
    {
      name : 'Salade Niçoise'
    },
    {
      name : 'Pot au feu'
    },
    {
      name : 'Salade Césare'
    }
]

  // fonction de la barre de recherche
  const updateSearch = (search) => {
      setSearchMyRecipesList(search)
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




      <Button title='Ajouter'//bouton pour le click pour ajouter une nouvelle recette
        onPress={() => props.navigation.navigate('New Recipe')}
      />
    </View>
  );
}

export default MyRecipes;