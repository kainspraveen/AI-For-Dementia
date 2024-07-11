import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import TalktoMeIcon from "./TalkToMeIcon";
const BottomOptionsBar = () => {
  const handleButton1Press = () => {
    // Functionality for Button 1
    console.log("Button 1 pressed");
  };

  const handleButton2Press = () => {
    // Functionality for Button 2
    console.log("Button 2 pressed");
  };

  return (
    <View style={styles.bottomBar}>
      {/* <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
        <Text style={styles.buttonText}>Button 1</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
        {/* <Text style={styles.buttonText}> */}
        <FontAwesome name="microphone" size={60} color="#003366" />
        {/* <TalktoMeIcon></TalktoMeIcon> */}
        {/* </Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    // justifyContent: ,
    // alignItems: "center",
    // backgroundColor: "#f0f0f0", // Background color of the bottom bar
    // height: 80, // Height of the bottom bar
    // paddingHorizontal: 20,
    // borderTopWidth: 1,
    // borderTopColor: "#ccc", // Border color at the top of the bottom bar
  },
  button: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // margin: "auto",
    backgroundColor: "#80d6e0",
    height: 100,
    width: 100,
    borderRadius: 100,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Text color of the buttons
  },
});

export default BottomOptionsBar;
