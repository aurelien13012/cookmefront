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
  ingredientsAccordionTitle: {
    color: '#FF6F61',
    marginLeft: 10,
  },
  ingredientsAccordion: {
    margin: 20,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'white'
    // padding: 0,
  },
  ingredientsListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  ingredientsListItemButtonSelected: {
    backgroundColor: '#FF6F61',
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  ingredientsListItemButton: {
    backgroundColor: '#fff',
    color: '#FF6F61',
    margin: 5,
    borderRadius: 10,
    borderColor: '#FF6F61',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  ingredientsListItemButtonTitle: {
    color: '#FF6F61'
  },
  body : {
    fontFamily : 'SourceSansPro_400Regular_Italic'
  }
});

export default styles;
