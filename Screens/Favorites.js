import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Button,
  Text,
} from "react-native-elements";
import { connect } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import styles from "../stylesheets/styles";
import env from '../env.json';

function Favorites(props) {
  //UseStates
  const [searchValue, setSearchValue] = useState("");
  const [favoritesRecipesList, setFavoritesRecipesList] = useState([]);


  ///: VARIABLES REDUX
  const token = props.token;

  // Is focused
  const isFocused = useIsFocused();

  

  //UseEffect
  useEffect(() => {
    getFavoritesRecipes();
  }, []);

  useEffect(() => {
    getFavoritesRecipes();
  }, [isFocused])

  const getFavoritesRecipes = async () => {
    const rawData = await fetch(`http://${env.ip}:3000/recipesList/myFavorites`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `userTokenFromFront=${token}`
    });
    const data = await rawData.json();
    setFavoritesRecipesList(data);
    console.log("recipelist", data);
  }

  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchValue(search);
  };

  const displayFavoritesRecipes = () => {
    if (favoritesRecipesList.length === 0) {
      return (
        <View>
          <Text style={styles.noRecipes}>
            Vous n'avez pas encore de recettes favorites.
          </Text>
        </View>
      );
    } else {
      return favoritesRecipesList.map((item, i) => (
        <Button
          title={item.name}
          titleStyle={styles.itemMyRecipesTitle}
          buttonStyle={styles.itemMyRecipes}
          onPress={() => {props.navigation.navigate("Recipe"); props.recipeId(item._id)}}
          key={i}
        />
      ));
    }
  };

  return (
    <View>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: "Mes recettes favorites",
          style: styles.headerTitle,
        }}
        containerStyle={styles.headerContainer}
        centerContainerStyle={{ flex: 0 }}
      />
      {/* Barre de recherche */}
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        lightTheme
        inputStyle={{ backgroundColor: "white" }}
        containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
        placeholder="Recherche..."
        onChangeText={updateSearch}
        value={searchValue}
      />

      {displayFavoritesRecipes()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
