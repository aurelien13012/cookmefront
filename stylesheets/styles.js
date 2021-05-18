import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: '#FF6F61',
  },
  headerTitle: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'SourceSansPro_700Bold'
  },
  accordionContainer: {
    margin: 20,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  accordionTitle: {
    color: '#FF6F61',
    fontSize: 18,
    fontFamily: 'SourceSansPro_600SemiBold'
  },
  accordionItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  accordionItem: {
    backgroundColor: '#fff',
    color: '#FF6F61',
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  accordionItemSelected: {
    backgroundColor: '#FF6F61',
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  accordionItemTitle: {
    color: '#FF6F61',
    fontFamily: 'SourceSansPro_600SemiBold'
  },
  accordionItemTitleSelected: {
    color: '#fff',
    fontFamily: 'SourceSansPro_600SemiBold'
  },
  itemMyRecipes : {
    backgroundColor: '#fff',
    color: '#FF6F61',
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  itemMyRecipesTitle : {
      color : '#FF6F61',
      fontFamily : 'SourceSansPro_600SemiBold'
  },
  noRecipes : {
    color : '#FF6F61',
    fontFamily : 'SourceSansPro_600SemiBold',
    margin : 15,
    textAlign : 'center'
  },
  addRecipe : {
    backgroundColor: '#FF6F61',
    color: '#FF6F61',
    marginTop: 100,
    marginLeft : 125,
    borderRadius: 50,
    width : 100,
    height : 100,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
    padding : 20
  },
  addRecipeTitle : {
    color: '#fff',
    fontFamily: 'SourceSansPro_600SemiBold',
    fontSize : 40
  },
  searchBar: {
    color: '#FF6F61'
  },
  body : {
    fontFamily : 'SourceSansPro_400Regular_Italic'
  }
});

export default styles;
