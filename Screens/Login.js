import React from 'react';
import { View, Text, Button } from 'react-native';

function Login(props) {
 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff'}}>   
        <Text>Login</Text>
        <Button title = 'sign-up' //il faudra faire des redirections pour pointer ou lutilisateur va aller suite à son signup
        onPress={()=> props.navigation.navigate('My Recipes', {screen : 'My Recipes'})}
        />
        <Button title = 'sign-in' //il faudra faire des redirections pour pointer ou lutilisateur va aller suite à son signin
        onPress={()=> props.navigation.navigate('BottomNavigator', {screen : 'Favorites'})}
        />
   </View>
 );
}

export default Login;