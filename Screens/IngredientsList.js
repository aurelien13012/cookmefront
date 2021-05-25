import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';

import styles from '../stylesheets/styles'
import env from '../env.json';

function IngredientsList(props) {

  //////// VARIABLES D'ETAT
  const [ingredientsList, setIngredientsList] = useState({});
  const [categories, setCategories] = useState([]);

  /////// VARIABLES REDUX
  const token = env.token;
  // const token = props.token;

  //////// USE EFFECTS
  // Charger les données
  useEffect(() => {
    // Charge tous les ingrédients de la bdd
    const getAllIngredients = async () => {
      const rawData = await fetch(`http://${env.ip}:3000/ingredients/allIngredients`);  
      const data = await rawData.json();
      // Formate les données pour être facilement affichable
      const formatedData = formatData(data);
      return formatedData;
    }

    // Charge les ingrédients de l'utilisateur
    const getMyFridge = async () => {
      const rawData = await fetch(`http://${env.ip}:3000/ingredients/myFridge`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `userTokenFromFront=${token}`
      }); 
      const data = await rawData.json();
      return data;
    }

    // Fonction globale qui appelle les autres
    const getData = async () => {
      const formatedData = await getAllIngredients(); 
      const myFridge = await getMyFridge();

      // Update la propriété "selected" si l'utilisateur à l'ingrédient dans son fridge
      myFridge.map((fridgeIngredient) => {
        const ingredientsNames = formatedData[fridgeIngredient.category].map((ingredient) => {
          return ingredient.name
        })
        const index = ingredientsNames.indexOf(fridgeIngredient.name);
        formatedData[fridgeIngredient.category][index].selected = true;
      })

      // Update la variable d'état
      setIngredientsList(formatedData);
      // Crée un array de catégories pour l'affichage
      createCategories(formatedData);
    }

    // Appel de la fonction
    getData();
  }, [])

  ////// FUNCTION UTILITAIRES
  // Formate les données pour être affichées facilement
  const formatData = (data) => {
    // Le format est le suivant: {category: [{name: 'poire', selected: false}]}
    // On crée un objet de base
    let formatedData = {};
    // pour chaque category trouvée, on crée un tableau

    data.map((ingredient, index) => {
      formatedData[ingredient.category] = [];
    });

    // console.log('formated data en cours', formatedData);

    // On remplit le tableau de chaque catégorie avec un objet {name, selected} pour chaque ingrédient correspondant
    data.map((ingredient, index) => {
      formatedData[ingredient.category].push({
        name: ingredient.name,
        selected: false
      });
    });

    // console.log('IngredientsFromDB', data);
    // console.log('données formatées', formatedData);

    return formatedData;
  }

  // Fonction pour créer un array de catégories avec la propriété "expanded" pour gérer les accordéons
  const createCategories = (data) => {
    const rawCategories = Object.keys(data);
    const formatedCategories = rawCategories.map((category, index) => {
      return {
        name: category,
        expanded: false
      }
    })
    setCategories(formatedCategories);
  }

  // Plie ou déplie l'accordéon
  const toggleCategoryExpanded = (index) => {
    const categoriesCopy = [...categories];
    categoriesCopy[index].expanded = !categoriesCopy[index].expanded;
    setCategories(categoriesCopy);
  }

  // Selectionne/Déselectionne l'ingrédient
  const toggleIngredientSelected = (category, index) => {
    const ingredientsListCopy = {...ingredientsList};
    ingredientsListCopy[category][index].selected = !ingredientsListCopy[category][index].selected;

    if (ingredientsListCopy[category][index].selected) {
      addIngredientToDB(ingredientsListCopy[category][index].name);
    } else {
      removeIngredientFromDB(ingredientsListCopy[category][index].name);
    }

    setIngredientsList(ingredientsListCopy);
  }

  // Ajoute l'ingrédient au fridge de l'utilisateur en bdd
  const addIngredientToDB = async (name) => {
    await fetch(`http://${env.ip}:3000/ingredients/addToMyFridge`,
    {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `nameFromFront=${name}&userTokenFromFront=${token}`
    });  
  }

  // Supprime l'ingrédient du fridge de l'utilisateur en bdd
  const removeIngredientFromDB = async (name) => {
    await fetch(`http://${env.ip}:3000/ingredients/deleteFromFridge`,
    {
      method: 'DELETE',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `nameFromFront=${name}&userTokenFromFront=${token}`
    });  
  }

  //// RENDER
  return (
    <View
      style={styles.container}
    >
      <ScrollView >
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
            onPress={() => toggleCategoryExpanded(index)}
            style={styles.accordionContainer}
            titleStyle={styles.accordionTitle}
            key={index}
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
                  key={index}
                />
              ))}
            </View>
          </List.Accordion>
        )
      })}
      </ScrollView>

      <Button title = 'Valider'//bouton pour le click qui renvoit vers la liste des recettes adaptées aux aliments
          onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Recipes'})}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}


export default connect(mapStateToProps, null)(IngredientsList)
