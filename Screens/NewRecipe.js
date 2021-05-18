import React, { useState, useEffect } from 'react';
import { View,  ScrollView} from 'react-native';
import { Header, Button, Text, Input } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import styles from '../stylesheets/styles'

function NewRecipe(props) {

  //UseState
  const [recipeName, setRecipeName] = useState('');
  const [newRecipeName, setNewRecipeName] = useState('');
  const [ingredientsList, setIngredientsList] = useState('');
  const [newIngredientsList, setNewIngredientList] = useState([]);
  const [stepsList, setStepsList] = useState('');
  const [newStepsList, setNewStepsList] = useState([]);

  const onSubmitRecipeName = (name) => {
    console.log('click détecté', name)
    setNewRecipeName(name.toUpperCase())
    setRecipeName('')
  }

  const onSubmitIngredient = (ingredient) => {
    console.log('click ok', ingredient)
    const listIngredient = [...newIngredientsList]
    listIngredient.push(ingredient)
    setNewIngredientList(listIngredient)
    setIngredientsList('')
  }

  const onSubmitSteps = (steps) => {
    console.log('click ok', steps)
    const listSteps = [...newStepsList]
    listSteps.push(steps)
    setNewStepsList(listSteps)
    setStepsList('')
  }

  return (
    <View>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Je propose ma recette',
          style: styles.headerTitleNewRecipe
        }}
        containerStyle={styles.headerContainer}
      />

<ScrollView>

      {/* input pour entrer le nom de la recette*/}
      <View style={styles.NewRecipeContainer}>

        <FontAwesome name="pencil" size={35} color='#FF6F61' />

        <Input
          containerStyle={{ marginLeft: 40, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Nom de ma recette'
          onChangeText={(val) => setRecipeName(val)}
          value={recipeName}
        />

        <Button
          title='+' //bouton pour le click pour ajouter un nom de recette
          titleStyle={styles.addNewRecipeTitle}
          buttonStyle={styles.addNew}
          onPress={() => { onSubmitRecipeName(recipeName) }}
        />
      </View>
      <View style={styles.NewResultContainer}>

        <Text style={styles.noRecipes}>{newRecipeName}</Text>

      </View>

      {/* Ajouter des ingrédients */}
      <View style={styles.NewRecipeContainer}>

        <MaterialCommunityIcons name="food-variant" size={35} color='#FF6F61' />

        <Input
          containerStyle={{ marginLeft: 35, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Ajouter un ingrédient'
          onChangeText={(val) => setIngredientsList(val)}
          value={ingredientsList}
        />

        <Button
          title='+' //bouton pour le click pour ajouter un ingrédient
          titleStyle={styles.addNewRecipeTitle}
          buttonStyle={styles.addNew}
          onPress={() => { onSubmitIngredient(ingredientsList) }}
        />

      </View>
      <View style={styles.NewResultContainer}>

        {newIngredientsList.map((ingredient, i) => {
          return (
            <Text style={styles.noRecipes}>{i + 1}.{ingredient}</Text>
          )
        })}

      </View>

      {/* Ajouter des étapes */}
      <View style={styles.NewRecipeContainer}>

        <FontAwesome name="pencil" size={35} color='#FF6F61' />

        <Input
          containerStyle={{ marginLeft: 40, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Ajouter une étape'
          onChangeText={(val) => setStepsList(val)}
          value = {stepsList}
        />

        <Button
          title='+' //bouton pour le click pour ajouter une étapes
          titleStyle={styles.addNewRecipeTitle}
          buttonStyle={styles.addNew}
          onPress={() => { onSubmitSteps(stepsList) }}
        />

      </View>

      <View style={styles.NewResultContainer}>

        {newStepsList.map((steps, i) => {
          return (
            <Text style={styles.noRecipes}>{i + 1}.{steps}</Text>
          )
        })}

      </View>

      {/* Ajouter des photos */}
      <View style={styles.NewRecipeContainer}>

        <MaterialIcons name="add-a-photo" size={35} color='#FF6F61' />

        <Input
          containerStyle={{ marginLeft: 35, width: '70%' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder='Ajouter une photo'
          onChangeText={(val) => setRecipeName(val)}
        />

        <Button
          title='+' //bouton pour le click pour ajouter une étapes
          titleStyle={styles.addNewRecipeTitle}
          buttonStyle={styles.addNew}
        />
      </View>

      <View>
      <Button title='Je valide ma recette'//Il faudra faire une redirection et non un bouton pour la confirmation
        onPress={() => props.navigation.navigate('Confirmation')}
        />
      </View>
</ScrollView>

    </View>
  );
}

export default NewRecipe;