import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from 'react-native-paper';

import styles from '../stylesheets/styles'

export default function IngredientsList(props) {

  //////// VARIABLES D'ETAT
  const [vegetablesExpanded, setVegetablesExpanded] = useState(false);
  const [meatsExpanded, setMeatsExpanded] = useState(false);
  const [vegetablesList, setVegetablesList] = useState([]);
  const [meatsList, setMeatsList] = useState([]);

  //////// USE EFFECTS
  // Charger les données
  useEffect(() => {
    setVegetablesList(vegetablesListData);
    setMeatsList(meatsListData)
  }, [])

  //// DONNEES EN DUR
  const vegetablesListData = [
    {
      name: 'Courgette',
      selected: false
    },
    {
      name: 'Brocolis',
      selected: false
    },
    {
      name: 'Epinards',
      selected: false
    },
    {
      name: 'Haricots verts',
      selected: false
    },
    {
      name: 'Concombre',
      selected: false
    },
  ];

  const meatsListData = [
    {
      name: 'Poulet',
      selected: false
    },
    {
      name: 'Boeuf',
      selected: false
    },
    {
      name: 'Porc',
      selected: false
    },
  ];

  ////// FUNCTION UTILITAIRES
  const handleButtonVegetables = (array, index) => {
    const vegetablesListCopy = [...vegetablesList];
    // Toggle le boolééen "selected"
    vegetablesListCopy[index].selected = !vegetablesListCopy[index].selected
    setVegetablesList(vegetablesListCopy);
    console.log('click on ' + vegetablesListCopy[index].name + '; selected: ' + vegetablesListCopy[index].selected);
  }

  const handleButtonMeats = (array, index) => {
    const meatsListCopy = [...meatsList];
    // Toggle le boolééen "selected"
    meatsListCopy[index].selected = !meatsListCopy[index].selected
    setMeatsList(meatsListCopy);
    console.log('click on ' + meatsListCopy[index].name + '; selected: ' + meatsListCopy[index].selected);
  }

  //// RENDER
  return (
    <View style={styles.containerIngredients}>
      <Header
        centerComponent={{
          text: 'Mes ingrédients',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
      />

    <List.Accordion
        title="Légumes"
        expanded={vegetablesExpanded}
        onPress={() => {setVegetablesExpanded(!vegetablesExpanded)}}
        style={styles.accordionContainer}
        titleStyle={styles.accordionTitle}
      >
        <View
          style={styles.accordionItemsContainer}
        >
          {vegetablesList.map((item, index) => (
            <Button
              title={item.name}
              buttonStyle={item.selected ? styles.accordionItemSelected : styles.accordionItem}
              onPress={() => handleButtonVegetables(vegetablesList, index)}
              titleStyle={item.selected ? styles.accordionItemTitleSelected : styles.accordionItemTitle}
            />
          ))}
        </View>
      </List.Accordion> 

      <List.Accordion
        title="Viandes"
        expanded={meatsExpanded}
        onPress={() => {setMeatsExpanded(!meatsExpanded)}}
        style={styles.accordionContainer}
        titleStyle={styles.accordionTitle}
      >
        <View
          style={styles.accordionItemsContainer}
        >
          {meatsList.map((item, index) => (
            <Button
              title={item.name}
              buttonStyle={item.selected ? styles.accordionItemSelected : styles.accordionItem}
              onPress={() => handleButtonMeats(meatsList, index)}
              titleStyle={item.selected ? styles.accordionItemTitleSelected : styles.accordionItemTitle}
            />
          ))}
        </View>
      </List.Accordion> 

      

      <Button title = 'Valider'//bouton pour le click qui renvoit vers la liste des recettes adaptées aux aliments
        onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Recipes'})}
      />
    </View>
  );
}


