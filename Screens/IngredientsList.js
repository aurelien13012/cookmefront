import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../stylesheets/styles'
import {Header} from 'react-native-elements';

export default function IngredientsList() {
  return (
    <View style={styles.containerIngredients}>
      <Header
        centerComponent={{
          text: 'My ingredients',
          style: styles.headerTitle
        }}
        containerStyle={styles.headerContainer}
      />
      <Text>
        IngredientsList modif
      </Text>
    </View>

  );
}


