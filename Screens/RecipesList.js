import React, {useState} from 'react';

import {View} from 'react-native';
import {Button, SearchBar, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../stylesheet/styles';

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
        </View>
    );
}

export default RecipesList;