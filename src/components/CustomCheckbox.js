import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../resources/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import notifyMessage from "../helpers/Toaster";

const CustomCheckbox = ({
  todoText,
  handleOnItemClicked,
  handleDeleteItem,
  handleEditItem,
}) => {
  const [isItemChecked, setIsItemChecked] = useState(false);

  function notifyComplete(isItemChecked) {
    if (isItemChecked) {
      notifyMessage("marked as completed");
    } else {
      notifyMessage("marked as incomplete");
    }
  }

  return (
    <View style={styles.checkBoxContainer}>
      <BouncyCheckbox
        isChecked={isItemChecked}
        onPress={() => {
          handleOnItemClicked;
          setIsItemChecked(!isItemChecked);
          notifyComplete(!isItemChecked);
        }}
        disableText={true}
        disableBuiltInState={true}
        size={25}
        fillColor={Colors.checkBoxFill}
        unfillColor={Colors.checkBoxUnFill}
        iconStyle={{ borderColor: Colors.checkBoxBorder }}
        innerIconStyle={{ borderWidth: 2 }}
      />
      <Text
        style={isItemChecked ? styles.textChecked : styles.textUnChecked}
        onPress={() => {
          setIsItemChecked(!isItemChecked);
          handleOnItemClicked;
        }}
      >
        {todoText}
      </Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleEditItem} style={styles.editIcon}>
          <Icon name="pencil" size={20} color={Colors.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteItem} style={styles.deleteIcon}>
          <Icon name="trash" size={20} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textChecked: {
    alignItems: "center",
    marginRight: 10,
    opacity: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    textDecorationLine: "line-through",
  },
  textUnChecked: {
    alignItems: "center",
    marginRight: 10,
    opacity: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    textDecorationLine: "none",
  },
  checkBoxContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingTop: StatusBar.currentHeight,
  },
  iconContainer: {
    flex: 1,
    marginEnd: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  editIcon: {
    alignSelf: "center",
    marginEnd: 20,
  },
  deleteIcon: {
    alignSelf: "center",
  },
});

export default CustomCheckbox;
