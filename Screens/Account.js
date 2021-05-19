import React from "react";
import { View, Text } from "react-native";

import Confirmation from "../Components/Confirmation";

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
      <Confirmation />
    </View>
  );
}

export default Account;
