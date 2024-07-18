import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
// const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
const DottedGridBackground = () => {
  const router = useRouter();

  return (
    // <TouchableOpacity onPress={() => router.push("/stt")}>
    <View style={styles.rowStyle}>
      <TouchableOpacity
        style={styles.talkToMe}
        onPress={() => router.push("/stt")}
      >
        <View>
          <Feather name="headphones" size={60} color="black" />
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Talk to me
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logMood}
        onPress={() => router.push("/mood")}
      >
        <View>
          <Image
            source={require("@/assets/images/mindfulness.png")}
            style={{
              width: 60,
              height: 60,
            }}
          ></Image>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Log mood
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logMood: {
    padding: 10,
    backgroundColor: "#80d6e0",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "47.5%",
    borderRadius: 20,
  },
  talkToMe: {
    padding: 10,
    backgroundColor: "#80d6e0",
    width: "47.5%",
    borderRadius: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  rowStyle: {
    // marginTop: 10,
    // backgroundColor: "#D0ECE7",
    // backgroundColor: "#80d6e0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    // minHeight: 100,
    // maxHeight: "auto",
    // width: "95%",
    // borderRadius: 25,
    // margin: "auto",
  },
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
