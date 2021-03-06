import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#FF6F61",
  },
  headerTitle: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "SourceSansPro_700Bold",
  },
  headerTitleNewRecipe: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "SourceSansPro_700Bold",
  },
  accordionContainer: {
    margin: 20,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
  },
  accordionTitle: {
    color: "#FF6F61",
    fontSize: 20,
    fontFamily: "SourceSansPro_600SemiBold",
  },
  accordionItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
  },
  accordionItem: {
    backgroundColor: "#fff",
    color: "#FF6F61",
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
  },
  accordionItemSelected: {
    backgroundColor: "#FF6F61",
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
  },
  accordionItemTitle: {
    color: "#FF6F61",
    fontFamily: "SourceSansPro_600SemiBold",
  },
  accordionItemTitleSelected: {
    color: "#fff",
    fontFamily: "SourceSansPro_600SemiBold",
  },
  // body: {
  //   fontFamily: "SourceSansPro_400Regular_Italic",
  // },
  cardText: {
    color: "#FF6F61",
    fontFamily: "SourceSansPro_600SemiBold",
    textAlign: "center",
  },
  cardImage: {
    height: 150,
    width: "80%",
    marginLeft: 30,
  },
  image: {
    height: 20,
    width: "20%",
  },
  cardName: {
    color: "#FF6F61",
    fontFamily: "SourceSansPro_600SemiBold",
  },
  cardLigne: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  itemMyRecipes: {
    backgroundColor: "#fff",
    color: "#FF6F61",
    margin: 5,
    borderRadius: 10,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
  },
  itemMyRecipesTitle: {
    color: "#FF6F61",
    fontFamily: "SourceSansPro_600SemiBold",
  },
  noRecipes: {
    color: "#FF6F61",
    fontFamily: "SourceSansPro_600SemiBold",
    margin: 15,
    textAlign: "center",
  },
  addRecipe: {
    backgroundColor: "#FF6F61",
    // color: "#FF6F61",
    // borderRadius: ,
    // width: 60,
    height: 70,
    // borderColor: "#FF6F61",
    // borderStyle: "solid",
    // borderWidth: 2,
    // padding: 20
  },
  addRecipeTitle: {
    color: "#fff",
    fontFamily: "SourceSansPro_600SemiBold",
    fontSize: 60,
  },
  addNew: {
    backgroundColor: "#FF6F61",
    color: "#FF6F61",
    marginTop: 15,
    // marginLeft : 125,
    borderRadius: 50,
    width: 20,
    height: 20,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 2,
  },
  addNewRecipeTitle: {
    color: "#fff",
    fontFamily: "SourceSansPro_600SemiBold",
    fontSize: 15,
  },
  searchBar: {
    color: "#FF6F61",
  },
  NewRecipeContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  NewResultContainer: {
    display: "flex",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  body: {
    fontFamily: "SourceSansPro_400Regular",
    fontSize: 20,
  },
  recipePic: {
    width: "100%",
    height: 300,
  },
  infoBoxContainer: {
    width: "80%",
    // height: 100,
    borderColor: "#FF6F61",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    // position: 'absolute',
    // top: 0,
    // left: 40,
    marginTop: -50,
    // marginLeft: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    // display: 'flex',
    // flexDirection: 'row',
  },
  infoBoxTitle: {
    fontSize: 26,
    color: "#FF6F61",
    fontFamily: "SourceSansPro_700Bold",
    marginLeft: 10,
    width: "80%",
  },
  recipeMiniPic: {
    width: 150,
    height: 100,
    margin: 5,
  },
  inputView: {
    // width: "80%",
    // height: "50%",
    // marginTop: 120,
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: ''
    // alignItems: "center",
  },
  buttonSignIn: {
    borderRadius: 30,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
  },
  buttonSignUp: {
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    margin: 5
  },
  buttonRegular: {
    borderRadius: 15,
    backgroundColor: '#FF6F61',
    marginBottom : 10,
    alignSelf: "center"
  },
  buttonRegularTitle: {
    fontFamily: 'SourceSansPro_600SemiBold',
    fontSize: 20
  },
  buttonCancel: {
    borderRadius: 25,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    margin: 5,
  },
  logo: {
    marginTop: 70,
    marginBottom: 40,
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  containerUserInfo: {
    marginLeft: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconUserInfo : {
    width: 30
  }
});

export default styles;
