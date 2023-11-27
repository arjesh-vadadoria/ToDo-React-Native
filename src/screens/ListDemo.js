import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  //   CheckBox,
  StyleSheet,
  TextInput,
} from "react-native";
import CustomCheckbox from "../components/CustomCheckbox";

const DynamicListExample = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems((prevItems) => [
        ...prevItems,
        { id: Math.random().toString(), text: newItem, isChecked },
      ]);
      setNewItem("");
      setIsChecked(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <CustomCheckbox
        value={item.isChecked}
        onValueChange={() => handleCheckboxToggle(item.id)}
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  const handleCheckboxToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.inputContainer}>
        <CustomCheckbox
          value={isChecked}
          onValueChange={() => setIsChecked(!isChecked)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter item..."
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemText: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DynamicListExample;
