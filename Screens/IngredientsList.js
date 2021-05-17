import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {Header} from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';

import styles from '../stylesheets/styles'

export default function IngredientsList() {

  const [vegetablesExpanded, setVegetablesExpanded] = useState(false);
  const [meatsExpanded, setMeatsExpanded] = useState(false);

  const vegetablesList = [
    {
      name: 'Courgette'
    },
    {
      name: 'Brocolis'
    },
    {
      name: 'Epinards'
    },
  ];

  const meatsList = [
    {
      name: 'Poulet'
    },
    {
      name: 'Boeuf'
    },
    {
      name: 'Porc'
    },
  ]

  return (
    <View style={styles.containerIngredients}>
      <Header
        centerComponent={{
          text: 'My ingredients',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
      />

      <ListItem.Accordion
        content={
          <>
            <ListItem.Content
              style={styles.ingredientsListTitle}
            >
              <ListItem.Title
                style={styles.ingredientsListTitle}
              >
                Légumes
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={vegetablesExpanded}
        onPress={() => {
          setVegetablesExpanded(!vegetablesExpanded);
        }}
        style={styles.ingredientsAccordion}
      >
        {vegetablesList.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>

      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Viandes</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={meatsExpanded}
        onPress={() => {
          setMeatsExpanded(!meatsExpanded);
        }}
      >
        {meatsList.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>

    </View>
  );
}


