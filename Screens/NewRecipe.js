import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button, Text, Input, Card } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import env from '../env.json';

import styles from '../stylesheets/styles';
import Confirmation from '../Components/Confirmation';
import PictureScreen from '../Components/PictureScreen';
import picture from '../Reducers/picture';

function NewRecipe(props) {

  //UseState
  const [recipeName, setRecipeName] = useState('');
  const [newRecipeName, setNewRecipeName] = useState('');
  const [num, setNum] = useState(1);
  const [ingredientInput, setIngredientInput] = useState('');
  const [newIngredientsList, setNewIngredientList] = useState([]);
  const [stepInput, setStepInput] = useState('');
  const [newStepsList, setNewStepsList] = useState([]);
  const [isPicture, setIsPicture] = useState(false);

  useEffect (() =>{
    console.log('dans use effect recipe')
    props.resetPicture({});
  },[])


  //Fonction pour soumettre le nom de la recette
  const onSubmitRecipeName = (name) => {
    console.log('click détecté name', name)
    setNewRecipeName(name.toUpperCase())
    setRecipeName('')
  }

  //Fonction pour augmenter ou baisser le nb de personnes
  const onIncreaseNumb = () => {
    setNum(num + 1)
  }

  const onDecreaseNumb = () => {
    if (num === 1) {
      setNum(1)
    } else {
      setNum(num - 1)
    }
  }

  //Fonctions pour ajouter un ingredient associé a une quantité et une unit
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

  //Fonction pour ajouter steps
  const onSubmitSteps = (steps) => {
    console.log('click ok', steps)
    if (steps.length > 0) {
      const listSteps = [...newStepsList]
      listSteps.push(steps)
      setNewStepsList(listSteps)
      setStepInput('')
    }
  }

  //Fonction pour valider recette et envoyer au back
  const onSubmitRecipe = async () => {
    console.log('in function submitrecipe')
    console.log('picturetype', typeof props.picture.uri)
    console.log('picture', props.picture.uri)
    let pictureUri = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

    if(props.picture.uri) {
      pictureUri = props.picture.uri
    }

    let data = new FormData();
    data.append('food', {
      uri: pictureUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    data.append('recipeFromFront', newRecipeName)
    data.append('numbFromFront', num)
    data.append('userTokenFromFront', props.token)
    data.append('steps', JSON.stringify(newStepsList))
    data.append('ingredients', JSON.stringify(newIngredientsList))
    console.log('avant fecth')
    const res = await fetch(`http://${env.ip}:3000/addRecipe`, {
      method: 'POST',
      body: data

    })
    console.log('apres fecth')
    const dataResult = await res.json();
    console.log('dataresults', dataResult)
    props.recipeId(dataResult)
  }

  //Variable pour afficher la picture
  let pictureDisplay;
  if (isPicture) {
    pictureDisplay =
      <Card>
        <Card.Image
          style={{ width: '100%', height: 200, marginBottom: 10 }}
          source={{ uri: props.picture.uri }}
        />
      </Card>
  }
  const isRecipeName = newRecipeName.length > 0;

  return (
    <View style={{ flex: 1 }}>
      {/* en-tête de page donnant le nom de la page */}
      <Header
        centerComponent={{
          text: 'Je propose ma recette',
          style: styles.headerTitle
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
              <View style={styles.NewRecipeContainer} key={i}>
                <Text style={styles.noRecipes} >{i + 1}.{ingredient.name}</Text>

                <Input
                  placeholder='qté'
                  autoCapitalize = 'none'
                  type = 'number'
                  containerStyle={{ marginLeft: 50, width: '20%' }}
                  onChangeText={(val) => onChangeQuantity(val, i)}
                  value={ingredient.quantity}
                />

                <Input
                  placeholder='unité'
                  autoCapitalize = 'none'
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
              <Text style={styles.noRecipes} key={i}>{i + 1}.{steps}</Text>
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
            onPress={() => { props.navigation.navigate('Picture'); setIsPicture(true) }}
          />

        </View>

        <View style={styles.NewResultContainer}>

          {pictureDisplay}

        </View>

      </ScrollView>

      <View>
        <Confirmation propsSubmitMyRecipe={onSubmitRecipe} navigation={props.navigation} />
      </View>


    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token, picture: state.picture }
}

function mapDispatchToProps(dispatch) {
  return {
    recipeId: function (recipeId) {
      dispatch({ type: 'saveRecipeId', recipeId })
    },
    resetPicture: function (pictureData) {
      dispatch({ type: 'addPicture', pictureData })
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(NewRecipe)

