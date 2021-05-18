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
  body : {
    fontFamily : 'SourceSansPro_400Regular_Italic'
  },
  cardText : {
    color: '#FF6F61',
    fontFamily: 'SourceSansPro_600SemiBold',
    textAlign: 'center',
  },
  cardImage : {
    height : 100, 
    width : '80%',
    marginLeft: 30 
  },
  image : {
    height : 20, 
    width : '20%',
  },
  cardName : {
    color: '#FF6F61',
    fontFamily: 'SourceSansPro_600SemiBold',
  },
  cardLigne : {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 10,
  }
});

export default styles;
