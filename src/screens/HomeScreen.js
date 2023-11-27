import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";

import Colors from "../resources/Colors";
import CustomButton from "../components/CustomButton";
import notifyMessage from "../helpers/Toaster";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editItem, setEditItem] = useState({});
  const refInput = React.useRef(null);

  const handleOnAddClick = () => {
    if (isEditMode) {
      const editedData = items.map((item) =>
        editItem.id === item.id
          ? { id: editItem.id, text: newItem, isChecked }
          : item
      );
      setItems(editedData);
    } else if (newItem.trim() !== "") {
      setItems((prevItem) => [
        ...prevItem,
        { id: Math.random().toString(), text: newItem, isChecked },
      ]);
    } else {
      setItems((prevItem) => [
        ...prevItem,
        { id: Math.random().toString(), text: "newItem", isChecked },
      ]);
    }
    setNewItem("");
    setIsChecked(false);
    setIsEditMode(false);
    refInput.current.blur();
  };

  const renderItem = ({ item }) => (
    <View>
      <CustomCheckbox
        todoText={item.text}
        handleOnItemClicked={() => handleCheckboxToggle(item)}
        handleDeleteItem={() => handleItemRemove(item.id)}
        handleEditItem={() => handleEditModeToggle(item)}
      />
    </View>
  );

  const handleCheckboxToggle = (item) => {
    const editedItems = items.map((newItem) => {
      newItem.id === item.id
        ? { ...newItem, isChecked: !newItem.isChecked }
        : newItem;
    });
    setItems(editedItems);
  };

  function handleEditModeToggle(item) {
    setNewItem(isEditMode ? "" : item.text);
    setIsEditMode(!isEditMode);
    setEditItem(item);
    refInput.current.focus();
  }

  const handleItemRemove = (itemId) => {
    const filteredData = items.filter((item) => item.id !== itemId);
    setItems(filteredData);
    notifyMessage("task deleted");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(items) => items.id}
        style={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newItem}
          ref={refInput}
          placeholder="Enter your task"
          onChangeText={(text) => {
            setNewItem(text);
          }}
        />
        <CustomButton
          buttonText={isEditMode ? "Edit" : "Add"}
          handleOnButtonPress={handleOnAddClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20,
    paddingLeft: 20,
    backgorunColor: Colors.primaryColor,
  },
  input: {
    alignItems: "center",
    marginRight: 10,
    opacity: 1,
    marginVertical: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
  },
  inputContainer: {
    flexWrap: "wrap",
  },
  list: {
    width: "100%",
  },
});

export default HomeScreen;
