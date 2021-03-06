import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, SearchBar, ListItem, Button, Text, FAB } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import { connect } from 'react-redux';
import env from '../env.json';

import styles from '../stylesheets/styles'

function MyRecipes(props) {

  //UseStates
  const [searchMyRecipesList, setSearchMyRecipesList] = useState('');
  const [myRecipesList, setMyRecipesList] = useState([]);

  const isFocused = useIsFocused()

  //UseEffect
  useEffect(() => {
    console.log('in use effect')
    const findMyRecipes = async () => {
      const dataRecipes = await fetch(`http://${env.ip}:3000/myRecipes?tokenFromFront=${props.token}`)
      const body = await dataRecipes.json()
      // console.log('body', body)
      setMyRecipesList(body);
    }
    findMyRecipes()
  }, [])

  //UseEffect au changement de isFocused
  useEffect(() => {
    console.log('in use effect')
    const findMyRecipes = async () => {
      const dataRecipes = await fetch(`http://${env.ip}:3000/myRecipes?tokenFromFront=${props.token}`)
      const body = await dataRecipes.json()
      // console.log('body', body)
      setMyRecipesList(body);
    }
    findMyRecipes()
  }, [isFocused])


  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchMyRecipesList(search)
  }

  //fonction utilitaires
  const getMyOwnRecipes = () => {
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
            onPress={() => { props.navigation.navigate('Recipe'); props.recipeId(item._id) }}
            key={i}
          />
        )
        )
      )
    }
  }


  return (
    <View style={{flex:1}}>
      {/* en-t??te de page donnant le nom de la page */}
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

      <ScrollView>
        {getMyOwnRecipes()}


        </ScrollView>
      <FAB
        placement = {'right'}
        title='+'//bouton pour le click pour ajouter une nouvelle recette
        titleStyle={styles.addRecipeTitle}
        buttonStyle={styles.addRecipe}
        onPress={() => props.navigation.navigate('New Recipe')}
        overlayColor='green'
        size='small'
      />

    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    recipeId: function (recipeId) {
      dispatch({ type: 'saveRecipeId', recipeId })
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(MyRecipes);
