import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Header} from 'react-native-elements';
import {ListItem, Avatar, Button, ButtonGroup} from 'react-native-elements';
import { List } from 'react-native-paper';

import styles from '../stylesheets/styles'

export default function IngredientsList(props) {

  const [vegetablesExpanded, setVegetablesExpanded] = useState(false);
  const [meatsExpanded, setMeatsExpanded] = useState(false);
  const [vegetablesList, setVegetablesList] = useState([]);
  const [meatsList, setMeatsList] = useState([]);


  useEffect(() => {
    setVegetablesList(vegetablesListData);
    setMeatsList(meatsListData)
  }, [])

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

  function handleButtonVegetables(array, index) {
    const vegetablesListCopy = [...vegetablesList];
    vegetablesListCopy[index].selected = !vegetablesListCopy[index].selected
    setVegetablesList(vegetablesListCopy);
    console.log('click on ' + vegetablesListCopy[index].name + '; selected: ' + vegetablesListCopy[index].selected);
  }

  function handleButtonMeats(array, index) {
    const meatsListCopy = [...meatsList];
    meatsListCopy[index].selected = !meatsListCopy[index].selected
    setMeatsList(meatsListCopy);
    console.log('click on ' + meatsListCopy[index].name + '; selected: ' + meatsListCopy[index].selected);
  }

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
        style={styles.ingredientsAccordion}
        titleStyle={styles.ingredientsAccordionTitle}
      >
        <View
          style={styles.ingredientsListContainer}
        >
          {vegetablesList.map((item, index) => (
            <Button
              title={item.name}
              buttonStyle={item.selected ? styles.ingredientsListItemButtonSelected : styles.ingredientsListItemButton}
              onPress={() => handleButtonVegetables(vegetablesList, index)}
              titleStyle={item.selected ? {} : styles.ingredientsListItemButtonTitle}
            />
          ))}
        </View>
      </List.Accordion> 

      <List.Accordion
        title="Viandes"
        expanded={meatsExpanded}
        onPress={() => {setMeatsExpanded(!meatsExpanded)}}
        style={styles.ingredientsAccordion}
        titleStyle={styles.ingredientsAccordionTitle}
      >
        <View
          style={styles.ingredientsListContainer}
        >
          {meatsList.map((item, index) => (
            <Button
              title={item.name}
              buttonStyle={item.selected ? styles.ingredientsListItemButtonSelected : styles.ingredientsListItemButton}
              onPress={() => handleButtonMeats(meatsList, index)}
              titleStyle={item.selected ? {} : styles.ingredientsListItemButtonTitle}
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


