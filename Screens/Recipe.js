import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Image, Icon, LinearProgress } from 'react-native-elements';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';

import styles from '../stylesheets/styles';
import env from '../env.json';

function Recipe(props) {

  ////// VARIABLES D'ETATS
  // Pour les acccordéons
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [stepsExpanded, setStepsExpanded] = useState(false);
  // const [picsExpanded, setPicsExpanded] = useState(false); // Fonctionnalité non implantée

  // Pour les données de la recette
  const [recipe, setRecipe] = useState({});
  // Pour l'apparence des boutons like et favoris
  const [isFav, setIsFav] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  // Pour les données dynamiques (aurait pu être extrait directement de "recipe" mais c'est plus simple comme ça)
  const [nbPerson, setNbPerson] = useState(4);
  const [rate, setRate] = useState(0.5);
  // Pour afficher les boutons modifier et supprimer si la recette a été proposé par le user actuel
  const [isMyRecipe, setIsMyRecipe] = useState(false);

  ///// VARIABLES REDUX
  //const idRecipe = '60a7b2d33a185c39987353d2';
  const idRecipe = props.recipeId;
  // const token = env.token;
  const token = props.token;

  useEffect(() => {
    getRecipeData();
  }, [])

  //////// FONCTIONS UTILITAIRES
  // Fonction pour récupérer les données et affecter les variables d'état
  const getRecipeData = async () => {
    // Récupération des données
    const rawData = await fetch(`http://${env.ip}:3000/recipe/readRecipe`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
      }
    );
    const data = await rawData.json();
    // Création des variables pour une meilleur lisiblité
    const recipeFromDB = data.recipe;
    const userFromDB = data.user;
    // console.log('recipe', recipeFromDB);
    // console.log('user', userFromDB);

    // Affectation des variables d'états
    setRecipe(recipeFromDB);
    setNbPerson(recipeFromDB.numOfPersons);

    // Variable booléen pour savoir si la recette fait partie des favoris du user
    const isFavFromDB = userFromDB.favoritesIds.find(id => id === recipeFromDB._id);
    setIsFav(isFavFromDB);

    // True si fait partie des recettes proposées par le user
    const isMyRecipeFromDB = userFromDB.recipesIds.find(id => id === recipeFromDB._id);
    setIsMyRecipe(isMyRecipeFromDB);
    
    // Affecte la note de la recette
    if (recipeFromDB.nbVote > 0) { // S'il y a au moins une note
      // La note est un chiffre entre 0 et 1, égale au rapport like/vote
      let newRate = recipeFromDB.nbLike / recipeFromDB.nbVote
      setRate(newRate)
    } else { // Si pas de vote, valeur de 0.5 par défault
      setRate(0.5);
    }

    // True si fait partie des recette likées/dislikées du user
    const isLikedFromDB = userFromDB.likedIds.find(id => id === recipeFromDB._id);
    const isDislikedFromDB = userFromDB.dislikedIds.find(id => id === recipeFromDB._id);
    setIsLiked(isLikedFromDB);
    setIsDisliked(isDislikedFromDB);
  }

  // Appelée quand click sur le coeur 
  const handleFavoriteButton = async () => {
    if (isFav) { // Si isFav = true à ce moment, cela veut dire que le user le retire de ses favoris
      // Enlève la recette de la liste des favoris
      await fetch(`http://${env.ip}:3000/recipe/removeFromFavorites`,
        {
          method: 'DELETE',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
        }
      );
    } else {
      // Ajoute la recette dans la liste des favoris
      await fetch(`http://${env.ip}:3000/recipe/addToFavorites`,
        {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `idFromFront=${idRecipe}&userTokenFromFront=${token}`
        }
      ); 
    }
    // Toggle l'apparence du coeur
    setIsFav(!isFav);
  }

  // Appelée quand click sur like
  const handleLikeButton = () => {
    // si le bouton est liké, on retire le like
    if (isLiked) {
      // console.log('remove like');
      // updateDB
      updateVoteInDB('removeLike');
      // Modifie l'apparence du bouton
      setIsLiked(false);
      // return -> on stoppe la fonction ici
      return;
    }
    // Sinon, on ajoute le like
    // console.log('add like');
    updateVoteInDB('like');
    setIsLiked(true);
    // Si le user avait déjà clické sur dislike avant
    if (isDisliked) {
      // On modifie l'apparence du bouton dislike
      setIsDisliked(false)
    }
  }

  // Appelée quand click sur dislike (inverse de handleLikeButton)
  const handleDislikeButton = () => {
    if (isDisliked) {
      console.log('already disliked');
      updateVoteInDB('removeDislike');
      setIsDisliked(!isDisliked);
      return;
    }
    // console.log('click on dislike');
    updateVoteInDB('dislike');
    setIsDisliked(!isDisliked);
    if (isLiked) {
      setIsLiked(false);
    }
  }

  // Fonction appelé dans les hendleLike/handleDislike
  const updateVoteInDB = async (type) => {
    // Envoi de la requête
    const rawData = await fetch(`http://${env.ip}:3000/recipe/updateVote`,
      {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `idFromFront=${idRecipe}&userTokenFromFront=${token}&typeFromFront=${type}`
      }
    );
    const data = await rawData.json();
    
    // Update de la variable d'état du vote
    if (data.nbVote === 0) {
      setRate(0.5);
    } else {
      setRate(data.nbLike / data.nbVote);
    }

    // Copie de la variable d'état pour la modifier
    const recipeCopy = {...recipe};
    // Modifie uniquement les votes et les likes (pas nécessaire je pense)
    recipeCopy.nbLike = data.nbLike;
    recipeCopy.nbVote = data.nbVote;
    // Ré-affecte la variable d'état
    setRecipe(recipeCopy);
  }

  // Quand clique sur +
  const addPerson = () => {
    // console.log('click on +');
    // Copie pour modifier
    let recipeCopy = {...recipe};
    // On boucle sur les ingrédients de la recette et on modifie la quantité
    recipeCopy.ingredients.forEach((ingredient) => {
      ingredient.quantity = ingredient.quantity / nbPerson * (nbPerson + 1)
    })
    // On ré-affecte les variables d'états
    setRecipe(recipeCopy);
    setNbPerson(nbPerson+1);
  }

  // Quand clique sur - (inverse de addPerson())
  const removePerson = () => {
    // console.log('click on -');
    if (nbPerson <= 1) {
      setNbPerson(1);
      return;
    }
    let recipeCopy = {...recipe};
    recipeCopy.ingredients.forEach((ingredient) => {
      ingredient.quantity = ingredient.quantity / nbPerson * (nbPerson - 1)
    })
    setRecipe(recipeCopy);
    setNbPerson(nbPerson-1);
  }

  // Appelée quand click sur "pencil" (modifier)
  const handleModifyRecipe = () => {
    // console.log('click on modify');
  }

  // Appelée quand click sur "trash" (supprimer)
  const handleDeleteRecipe = async (id) => {
    // console.log('click on delete');
    // Requete backend
    await fetch (`http://${env.ip}:3000/deleteMyRecipe/${id}`,
      {
        method: 'DELETE'
      }
    );
    // Redirection
    props.navigation.navigate('BottomNavigator', {
      screen: 'My Recipes',
      params: {
        screen: 'My Recipes'
    }});
  }

  ////// VARIABLES POUR AFFICHAGE
  // Pour les icones modifier/supprimer (par défault vide)
  let iconsForOwner;
  
  // Si la recette a été proposée par le user, on affecte les icones
  if (isMyRecipe) {
    iconsForOwner =
      <View
        style={{
          width: '100%',
          position: 'absolute',
          top: 50,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 20
        }}
      >
        <Icon
          name="pencil" 
          type="font-awesome"
          color="#FF6F61"
          size={28}
          containerStyle={{
            backgroundColor: 'white',
            width: 44,
            height: 44,
            borderRadius: 22,
            borderStyle: 'solid',
            borderColor: '#FF6F61',
            borderWidth: 2,
            marginRight: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => handleModifyRecipe()}
          key={0}
        />
        <Icon
          name="trash" 
          type="font-awesome"
          color="#FF6F61"
          size={28}
          containerStyle={{
            backgroundColor: 'white',
            width: 44,
            height: 44,
            borderRadius: 22,
            borderStyle: 'solid',
            borderColor: '#FF6F61',
            borderWidth: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => handleDeleteRecipe(recipe._id)}
          key={1}
        />
      </View> 
  }

  // Ecran de chargement en attendant que le UseEffect s'effectue
  if (Object.keys(recipe).length === 0) { // Object.kets(object) renvoie un array avec les clés de l'objet
    return (
      <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
        <Text>
          Chargement...
        </Text>
      </View>
    )
  }

  return (
 
    <ScrollView    
      style={{height: '100%', flex: 1}}
    > 
    {/* Conteneur principal    */}

      {/* Image de fond */}

      <Image
        source={{uri: recipe.pictures}}
        style={styles.recipePic}
      />

      {iconsForOwner}
     
      {/* Centrage boite d'information */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        {/* Conteneur boite d'information */}
        <View
          style={styles.infoBoxContainer}
        >
          {/* 1ere ligne */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={styles.infoBoxTitle}
            >
              {recipe.name} 
            </Text>
            <Icon
              name={isFav ? "heart" : "heart-outline"} 
              type="ionicon"
              color="#FF6F61"
              size={28}
              containerStyle={{
                marginRight: 10,
                marginTop: 4
              }}
              onPress={() => handleFavoriteButton()}
            />
          </View>
          
          {/* 2eme ligne avec le temps de la recette (supprimée)*/}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 4
            }}
            >
            <Icon
                name="clock"
                type="fontisto"
                size={24}
                style={{
                  marginLeft: 10,
                  marginTop: 0
                }}
              />
            <Text
              style={{
                marginLeft: 10,
                marginTop: 0,
                fontSize: 18,
                fontFamily: 'SourceSansPro_400Regular'
              }}
            >
              15 minutes
            </Text>
          </View> */}
          
          {/* 3eme ligne */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 0,
              marginBottom: 5
            }}
          >
            <LinearProgress
              variant='determinate'
              value={rate}
              color='blue'
              trackColor='red'
              style={{
                width: '50%',
                marginTop: 15,
                marginLeft: 10,
                height: 5
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'SourceSansPro_400Regular',
                marginLeft: 10,
                color: rate < 0.5 ? 'red' : 'blue',
                marginTop: 5
              }}
            >
              {Math.round(rate*100) + '%'}
            </Text>
            <Icon
              onPress={() => handleLikeButton()}
              name={isLiked ? "like1" : "like2"}
              type="antdesign"
              containerStyle={{
                marginLeft: 10,
                marginTop: 2
              }}
            />
            <Icon
              onPress={() => handleDislikeButton()}
              name={isDisliked ? "dislike1" : "dislike2"}
              type="antdesign"
              containerStyle={{
                marginLeft: 10,
                marginTop: 2
              }}
            />
          </View>
        </View>

      </View>
      
      {/* Conteneur du corps de la recette */}
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 15,
          marginBottom: 20
        }}
      >
        {/* Conteneur Nombre de personnes */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Text style={styles.body}>
            Nombre de personnes : {nbPerson}
          </Text>
          <Icon
            name="minuscircleo"
            type="antdesign"
            containerStyle={{
              marginLeft: 10,
              marginTop: 0,
              
            }}
            onPress={() => removePerson()}
          /> 
          <Icon
            name="pluscircleo"
            type="antdesign"
            containerStyle={{
              marginLeft: 10,
              marginTop: 0
            }}
            onPress={() => addPerson()}
          />
        </View>

        {/* Liste des ingrédients nécessaires */}
        <List.Accordion
          title="Ingrédients"
          expanded={ingredientsExpanded}
          onPress={() => {setIngredientsExpanded(!ingredientsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          {recipe.ingredients.map((ingredient, index) => {
            return (
              <List.Item
                title={`${ingredient.ingredientsIds.name} (${ingredient.quantity} ${ingredient.unit})`}
                titleStyle={styles.body}
                key={index}
              />
            )
          })}
        </List.Accordion>

        {/* Liste des étapes */}
        <List.Accordion
          title="Etapes"
          expanded={stepsExpanded}
          onPress={() => {setStepsExpanded(!stepsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          {recipe.steps.map((step, index) => {
            return (
              <List.Item
                key={index}
                title={`${index+1}. ${step}`}
                titleStyle={styles.body}
                titleNumberOfLines={5}
              />
            )
          })}
        </List.Accordion>  

        {/* Liste des photos (supprimée) */}
        {/* <List.Accordion
          title="Images"
          expanded={picsExpanded}
          onPress={() => {setPicsExpanded(!picsExpanded)}}
          style={styles.accordionContainer}
          titleStyle={styles.accordionTitle}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={0}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={1}
            />
            <Image  
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={2}
            />
            <Image 
              source={require('../assets/pate_pesto.jpg')}
              style={styles.recipeMiniPic}
              key={3}
            />
 
          </View>

        </List.Accordion>   */}

      </View>

    </ScrollView>
  );
}

// Récupération des variables REDUX
function mapStateToProps(state) {
  return { 
    token: state.token,
    recipeId: state.recipeid
  }
}

export default connect(mapStateToProps, null)(Recipe)