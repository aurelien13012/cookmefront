import {StyleSheet} from 'react-native';




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIngredients: {
  },
  headerContainer: {
    backgroundColor: '#FF6F61',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff'
  },
  ingredientsListTitle: {
    color: '#FF6F61'
  },
  ingredientsAccordion: {
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
    color: '#FF6F61'
  },
  body : {
    fontFamily : 'SourceSansPro_400Regular_Italic'
  }
});

export default styles;
