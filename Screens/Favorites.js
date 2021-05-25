import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Button,
  Text,
} from "react-native-elements";

import styles from "../stylesheets/styles";

function Favorites(props) {
  //UseStates
  const [searchValue, setSearchValue] = useState("");
  const [favoritesRecipesList, setFavoritesRecipesList] = useState([]);

  //Données en dur
  const favoritesRecipesData = [
    {
      name: "Tournedos",
    },
    {
      name: "Salade Niçoise",
    },
    {
      name: "Pot au feu",
    },
    {
      name: "Salade Césare",
    },
  ];

  //UseEffect
  useEffect(() => {
    setFavoritesRecipesList(favoritesRecipesData);
    console.log("myrecipelist", favoritesRecipesList.length);
    console.log("recipelist", favoritesRecipesList);
  }, []);

  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchValue(search);
  };

  const getFavoritesRecipes = () => {
    if (favoritesRecipesList.length === 0) {
      return (
        <View>
          <Text style={styles.noRecipes}>
            Vous n'avez pas encore de recettes. Proposez vite une recette !{" "}
          </Text>
        </View>
      );
    } else {
      return favoritesRecipesList.map((item, i) => (
        <Button
          title={item.name}
          titleStyle={styles.itemMyRecipesTitle}
          buttonStyle={styles.itemMyRecipes}
          onPress={() => props.navigation.navigate("Recipe")}
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

      {getFavoritesRecipes()}
    </View>
  );
}

export default Favorites;
