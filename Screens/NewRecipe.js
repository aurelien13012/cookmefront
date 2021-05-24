import React, { useState, useRef } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button, Text, Input } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import qs from 'qs';
import env from '../env.json';

import styles from '../stylesheets/styles';
import Confirmation from '../Components/Confirmation';
import PictureScreen from '../Components/PictureScreen';

function NewRecipe(props) {

  //UseState
  const [recipeName, setRecipeName] = useState('');
  const [newRecipeName, setNewRecipeName] = useState('');
  const [num, setNum] = useState(0);
  const [ingredientInput, setIngredientInput] = useState('');
  const [newIngredientsList, setNewIngredientList] = useState([]);
  const [stepInput, setStepInput] = useState('');
  const [newStepsList, setNewStepsList] = useState([]);

  const onSubmitRecipeName = (name) => {
    console.log('click détecté name', name)
    setNewRecipeName(name.toUpperCase())
    setRecipeName('')
  }

  const onIncreaseNumb = () => {
    setNum(num + 1)
  }

  const onDecreaseNumb = () => {
    if (num === 0) {
      setNum(0)
    } else {
      setNum(num - 1)
    }
  }

  const onSubmitIngredient = (name) => {
    console.log('click ok', name)
    if (name.length > 0) {
      const listIngredient = [...newIngredientsList]
      listIngredient.push({ name, quantity: '', unit: '' })
      setNewIngredientList(listIngredient)
      setIngredientInput('')
    }
  }

  const onChangeQuantity = (quantity, i) => {
    console.log('quantity', quantity)
    console.log('i', i)
    const newIngredientsListCopy = [...newIngredientsList]
    newIngredientsListCopy[i].quantity = quantity
    setNewIngredientList(newIngredientsListCopy)
  }

  const onChangeUnit = (unit, i) => {
    console.log('quantity', unit)
    console.log('i', i)
    const newIngredientsListCopy = [...newIngredientsList]
    newIngredientsListCopy[i].unit = unit
    setNewIngredientList(newIngredientsListCopy)
  }

  const onSubmitSteps = (steps) => {
    console.log('click ok', steps)
    if (steps.length > 0) {
      const listSteps = [...newStepsList]
      listSteps.push(steps)
      setNewStepsList(listSteps)
      setStepInput('')
    }
  }

  const onSubmitRecipe = async () => {
    console.log('onsubmitrecipe executé')
    console.log('recipeName', newRecipeName)
    let data = new FormData();
    data.append('food', {
      uri : props.picture.uri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    data.append('recipeFromFront', newRecipeName)
    data.append('numbsFromFront', num)
    data.append('userTokenFromFront', env.token)
    data.append('steps', JSON.stringify(newStepsList))
    data.append('ingredients', JSON.stringify(newIngredientsList))

    const bodyObj = {
      recipeFromFront: newRecipeName,
      steps: newStepsList,
      numbsFromFront: num,
      ingredients: newIngredientsList,
      userTokenFromFront: env.token,
    }
    const bodyStr = qs.stringify(bodyObj, { arrayFormat: 'brackets' }); //array format brackets : change le format du string : steps[0]=a en steps[]=a
    // https://github.com/ljharb/qs/issues/46#issuecomment-70061976
    console.log('bodystr', bodyStr);

    const res = await fetch(`http://${env.ip}:3000/addRecipe`, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: `${bodyStr}&pictureFromFront=${data}`
      body: data

    })
    const dataResult = await res.json();
    console.log('datarecipe', dataResult);
  }

  const isRecipeName = newRecipeName.length > 0;

  // console.log('listingredient', newIngredientsList)
  
  return (
    <View style={{ flex: 1 }}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Je propose ma recette',
          style: styles.headerTitleNewRecipe
        }}
        containerStyle={styles.headerContainer}
        centerContainerStyle={{ flex: 0 }}
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

          {isRecipeName && <Text>{newRecipeName}</Text>}

        </View>

        {/* entrer le nombre de personne*/}
        <View style={styles.NewRecipeContainer}>

          <MaterialCommunityIcons style={{ marginRight: 60 }} name="human-male-female" size={35} color='#FF6F61' />


          <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>{num}</Text>

          <Button
            title='-' //bouton pour le click pour ajouter des personnes
            titleStyle={styles.addNewRecipeTitle}
            buttonStyle={[styles.addNew, { marginRight: 8 }, { marginLeft: 160 }]}
            onPress={() => { onDecreaseNumb() }}
          />

          <Button
            title='+' //bouton pour le click pour ajouter des personnes
            titleStyle={styles.addNewRecipeTitle}
            buttonStyle={styles.addNew}
            onPress={() => { onIncreaseNumb(num) }}
          />
        </View>

        {/* Ajouter des ingrédients */}
        <View style={styles.NewRecipeContainer}>

          <MaterialCommunityIcons name="food-variant" size={35} color='#FF6F61' />

          <Input
            containerStyle={{ marginLeft: 35, width: '70%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Ajouter un ingrédient'
            onChangeText={(val) => setIngredientInput(val)}
            value={ingredientInput}
          />

          <Button
            title='+' //bouton pour le click pour ajouter un ingrédient
            titleStyle={styles.addNewRecipeTitle}
            buttonStyle={styles.addNew}
            onPress={() => { onSubmitIngredient(ingredientInput) }}
          />

        </View>
        <View style={styles.NewResultContainer}>

          {newIngredientsList.map((ingredient, i) => {
            return (
              <View style={styles.NewRecipeContainer}>
                <Text style={styles.noRecipes}>{i + 1}.{ingredient.name}</Text>

                <Input
                  placeholder='Qty'
                  containerStyle={{ marginLeft: 50, width: '20%' }}
                  onChangeText={(val) => onChangeQuantity(val, i)}
                  value={ingredient.quantity}
                />

                <Input
                  placeholder='Unit'
                  containerStyle={{ marginLeft: 35, width: '20%' }}
                  onChangeText={(val) => onChangeUnit(val, i)}
                  value={ingredient.unit}
                />
              </View>
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
            onChangeText={(val) => setStepInput(val)}
            value={stepInput}
          />

          <Button
            title='+' //bouton pour le click pour ajouter une étapes
            titleStyle={styles.addNewRecipeTitle}
            buttonStyle={styles.addNew}
            onPress={() => { onSubmitSteps(stepInput) }}
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
          />

          <Button
            title='+' //bouton pour le click pour ajouter une photo
            titleStyle={styles.addNewRecipeTitle}
            buttonStyle={styles.addNew}
            onPress={() => props.navigation.navigate('Picture')}
          />

        </View>

      </ScrollView>

      <View>
        <Confirmation propsSubmitMyRecipe={onSubmitRecipe} />
      </View>


    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token, picture : state.picture}
}

export default connect(
  mapStateToProps, null
)(NewRecipe)

