import React, { useState, useEffect } from "react";

import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SearchBar, Card, Header } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";

import styles from "../stylesheets/styles";
import env from "../env.json";

function RecipesList(props) {
  const [searchRecipesList, setSearchRecipesList] = useState("");

  const [recipesList, setRecipesList] = useState([]);

  const [suggestedList, setSuggestedList] = useState({});

  // fonction de la barre de recherche
  const updateSearch = (search) => {
    setSearchRecipesList(search);
  };

  const isFocused = useIsFocused();
  //////// USE EFFECTS
  // Charger les données
  useEffect(() => {
    // Charge tous les recettes de la bdd
    const getAllRecipes = async () => {
      //console.log('fetch')
      const rawData = await fetch(
        `http://${env.ip}:3000/recipesList/recipesList`
      );
      // console.log('afterFetch')
      // console.log('rawData', rawData)
      const data = await rawData.json();
      //console.log('data', data)
      setRecipesList(data);
    };

    const getSuggestedRecipe = async () => {
      console.log("fetch");
      const rawData = await fetch(
        `http://${env.ip}:3000/recipesList/recipeBook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `userTokenFromFront=${props.token}`,
        }
      );
      console.log("afterFetch");
      const data = await rawData.json();
      // console.log("data", data);
      setSuggestedList(data.suggestedRecipe);
    };

    console.log("result", suggestedList);

    // Appel de la fonction
    getAllRecipes();
    getSuggestedRecipe();
  }, []);

  //useeffecte de mise à jour lorsque la page est réouverte
  useEffect(() => {
    const getAllRecipes = async () => {
      const rawData = await fetch(
        `http://${env.ip}:3000/recipesList/recipesList`
      );
      const data = await rawData.json();
      setRecipesList(data);
    };

    const getSuggestedRecipe = async () => {
      // console.log("fetch");
      const rawData = await fetch(
        `http://${env.ip}:3000/recipesList/recipeBook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `userTokenFromFront=${props.token}`,
        }
      );
      // console.log("afterFetch");
      const data = await rawData.json();
      // console.log("data2", data);
      setSuggestedList(data.suggestedRecipe);
    };

    getAllRecipes();
    getSuggestedRecipe();
  }, [isFocused]);

  //fonction pour la recette suggérée soit un résultat soit aucun, reporté dans le return final
  const displaySuggestedRecipe = () => {
    //affichage si aucune recette ne coorespond au ingredient du user
    if (suggestedList === null) {
      return (
        <Card>
          <Card.Title style={styles.body}>Recette suggérée :</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>Aucune recette trouvée !</Text>
          <Text style={styles.cardText}>
            Ajouter des aliments dans l'onglet Ingrédients !
          </Text>
          <Card.Image
            style={[styles.cardImage, { resizeMode: "contain" }]}
            source={require("../assets/frigo.jpg")}
            onPress={() => {
              props.navigation.navigate("Fridge");
            }}
          ></Card.Image>
        </Card>
      );
    }
    //affichage si une recette correspond aux ingredients données
    return (
      <Card>
        <Card.Title style={styles.body}>Recette suggérée :</Card.Title>
        <Card.Divider />
        <Text style={[styles.cardText, { marginBottom: 10, fontSize: 20 }]}>
          {suggestedList.name}
        </Text>
        <Card.Image
          style={styles.cardImage}
          source={{ uri: suggestedList.pictures }}
          onPress={() => {
            props.navigation.navigate("Recipe");
            props.recipeId(suggestedList._id);
          }}
        ></Card.Image>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: "Recettes",
          style: styles.headerTitle,
        }}
        containerStyle={styles.headerContainer}
      />

      {/* barre de recherche pour les recettes */}
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        lightTheme
        inputStyle={{ backgroundColor: "white" }}
        containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
        placeholder="Recherche..."
        onChangeText={updateSearch}
        value={searchRecipesList}
      />

      <ScrollView>
        {displaySuggestedRecipe()}

        <Card style={styles.cardContainer}>
          <Card.Title style={styles.body}>Toutes les recettes :</Card.Title>
          <Card.Divider />
          {recipesList.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.cardLigne}
                onPress={() => {
                  props.navigation.navigate("Recipe");
                  props.recipeId(item._id);
                }}
              >
                <Text style={styles.cardName}>{item.name}</Text>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: item.pictures }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    recipeId: function (recipeId) {
      dispatch({ type: "saveRecipeId", recipeId });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
