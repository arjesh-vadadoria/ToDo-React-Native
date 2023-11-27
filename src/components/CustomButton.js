import React from "react";
import { View, StyleSheet, Button } from "react-native";
import Colors from "../resources/Colors";

const CustomButton = ({ buttonText, handleOnButtonPress }) => {
  return (
    <View>
      <Button
        title={buttonText || "button"}
        onPress={handleOnButtonPress}
        color={Colors.primaryColor}
      />
    </View>
  );
};

export default CustomButton;
