import React, {useState} from 'react';

import {View} from 'react-native';
import {Button, SearchBar, Card, Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/styles';


function RecipesList(props) {
    const [searchRecipesList, setSearchRecipesList] = useState('')

    // fonction de la barre de recherche
    const updateSearch = (search) => {
        setSearchRecipesList(search)
    }


    return (
        <View >
            {/* en-tête de page donnant le nom de la page */}
            <Header
                centerComponent={{
                text: 'Recettes',
                style: styles.headerTitle
                }}
                containerStyle={styles.headerContainer}
            />

            {/* barre de recherche pour les recettes */}
            <SearchBar
                round
                searchIcon = {{size: 24}}
                lightTheme
                inputStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: 'white', borderWidth: 0}}
                placeholder = 'Recherche...'
                onChangeText = {updateSearch}
                value = {searchRecipesList}
            />
            
            <Card>
            <Card.Title>Recette suggérée</Card.Title>
            <Card.Divider/>
            
            </Card>

            <Button title = 'recipe'//bouton pour le click sur une recette
                onPress={()=> props.navigation.navigate('Recipe')}
            /> 
        </View>
    );
}

export default RecipesList;