import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
// const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
const DottedGridBackground = () => {
  return (
    <View style={styles.taskRow}>
      <View>
        <Text
          style={{
            margin: "auto",
            paddingLeft: 20,
          }}
        >
          1:30 PM
        </Text>
      </View>
      <View style={styles.routineCard}>
        <View style={styles.taskIcon}>
          <MaterialIcons name="family-restroom" size={24} color="black" />
        </View>

        <Text
          style={{
            position: "relative",
            margin: "auto",
            // alignSelf: "center",
            // textAlignVertical: "middle",
          }}
        >
          Meet Niece
        </Text>
        <View style={styles.doneIcon}>
          <AntDesign name="checkcircleo" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  doneIcon: {
    margin: "auto",
  },
  taskIcon: {
    margin: "auto",
  },
  taskRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 15,
  },
  routineCard: {
    // position: "absolute",
    display: "flex",
    // margin: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 10,
    alignContent: "center",
    right: 0,
    width: "70%",
    height: 70,
    backgroundColor: "#E0E0E0",
  },
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default DottedGridBackground;
