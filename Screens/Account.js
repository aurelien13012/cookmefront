import React from "react";
import { View, Text } from "react-native";

import ConfirmMyRecipe from "../Components/ConfirmMyRecipe";

function Account(props) {
  return (
    <View>
      <Text
        style={{
          backgroundColor: "red",
          marginTop: 50,
        }}
      >
        Account
      </Text>
      <ConfirmMyRecipe />
    </View>
  );
}

export default Account;
