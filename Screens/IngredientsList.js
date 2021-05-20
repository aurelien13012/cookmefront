import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from 'react-native-paper';

import styles from '../stylesheets/styles'
// import {IP} from 'react-native-dotenv';

export default function IngredientsList(props) {

  //////// VARIABLES D'ETAT
  const [ingredientsList, setIngredientsList] = useState({});
  const [categories, setCategories] = useState([]);

  // console.log({IP});

  //////// USE EFFECTS
  // Charger les données
  useEffect(() => {
    const getAllIngredients = async () => {
      console.log('before fetch');
      const rawData = await fetch('http://192.168.1.12:3000/ingredients/allIngredients');  
      console.log('after fetch');
      const data = await rawData.json();
      // console.log('data', data);
      const formatedData = formatData(data);
      setIngredientsList(formatedData);
      createCategories(formatedData);

      return data;
    }
    getAllIngredients();

  }, [])



  // Formate les données pour être affichées facilement
  const formatData = (data) => {
    formatedData = {};
    data.map((ingredient, index) => {
      formatedData[ingredient.category] = [];
    });

    data.map((ingredient, index) => {
      formatedData[ingredient.category].push({
        name: ingredient.name,
        selected: false
      });
    });

    // console.log('formatedData', formatedData);
    return formatedData;
  }

  const createCategories = (data) => {
    const rawCategories = Object.keys(data);
    const formatedCategories = rawCategories.map((category, index) => {
      return {
        name: category,
        expanded: false
      }
    })
    // console.log('categories', formatedCategories);
    setCategories(formatedCategories);
  }

  console.log('categories', categories);
  console.log('ingredientsList', ingredientsList);



  ////// FUNCTION UTILITAIRES


  const toggleCategoryExpanded = (index) => {
    const categoriesCopy = [...categories];
    categoriesCopy[index].expanded = !categoriesCopy[index].expanded;
    setCategories(categoriesCopy);
  }

  const toggleIngredientSelected = (category, index) => {
    const ingredientsListCopy = {...ingredientsList};
    ingredientsListCopy[category][index].selected = !ingredientsListCopy[category][index].selected;
    setIngredientsList(ingredientsListCopy);
  }



  //// RENDER
  return (
    <ScrollView style={styles.containerIngredients}>
      <Header
        centerComponent={{
          text: 'Mes ingrédients',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
      />

    {categories.map((category, index) => {
      return(
        <List.Accordion
          title={category.name}
          expanded={category.expanded}
          onPress={() => {toggleCategoryExpanded(index)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          <View
            style={styles.accordionItemsContainer}
          >
            {ingredientsList[category.name].map((ingredient, index) => (
              <Button
                title={ingredient.name}
                buttonStyle={ingredient.selected ? styles.accordionItemSelected : styles.accordionItem}
                onPress={() => toggleIngredientSelected(category.name, index)}
                titleStyle={ingredient.selected ? styles.accordionItemTitleSelected : styles.accordionItemTitle}
              />
            ))}
          </View>
        </List.Accordion>
      )
    })}
     

      <Button title = 'Valider'//bouton pour le click qui renvoit vers la liste des recettes adaptées aux aliments
        onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Recipes'})}
      />
    </ScrollView>
  );
}


