import React, {useState} from 'react';

import {View} from 'react-native';
import {Button, SearchBar, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheets/styles';

function RecipesList(props) {
    const [searchRecipesList, setSearchRecipesList] = useState('')

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Recherche..."
                onChangeText={setSearchRecipesList}
                value={searchRecipesList}
                style={styles.searchbar}
            />
           <Button title = 'recipe'//bouton pour le click sur une recette
        onPress={()=> props.navigation.navigate('Recipe')}
        /> 
        </View>
    );
}

export default RecipesList;