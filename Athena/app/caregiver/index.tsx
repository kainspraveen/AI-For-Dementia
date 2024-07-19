import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DottedGridBackground from "@/components/DottedGrid";
import TaskRow from "@/components/TaskRow";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome6 } from "@expo/vector-icons";
import TaskListScreen from "@/components/TaskListScreen";
import { PaperProvider } from "react-native-paper";
import ReminderListScreen from "@/components/ReminderListScreen";
export default function CareGiverHome() {
  const navigation = useNavigation();
  console.log(navigation);
  const [selectedLanguage, setSelectedLanguage] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title
      headerBackTitleVisible: false, // Optional: Remove the back button title
    });
  }, [navigation]);
  return (
    <PaperProvider>
      <SafeAreaView
        style={{ flex: 1 }}
        // edges={["right", "left", "top"]}
      >
        <Text
          style={{
            // marginLeft: "auto",
            textAlign: "center",
            fontSize: 27.5,
            fontWeight: 500,
            padding: 20,
          }}
        >
          {" "}
          Actions for your patient
        </Text>
        <View
          style={{
            flex: 0.5,
            // marginLeft: 15,
            marginVertical: 5,
            margin: "auto",
            width: "95%",
            height: "auto",
            backgroundColor: `rgba(198, 0, 126, 0.2)`,
            borderRadius: 15,
            // marginRigth: 15,
            borderColor: `rgba(198, 0, 126, 0.6)`,
            borderWidth: 0.25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              padding: 10,
              margin: "auto",
            }}
          >
            Tasks
          </Text>
          <TaskListScreen></TaskListScreen>
        </View>
        <View
          style={{
            flex: 0.5,
            // marginLeft: 15,
            marginVertical: 5,
            margin: "auto",
            width: "95%",
            height: "auto",
            backgroundColor: `rgba(198, 0, 126, 0.2)`,
            borderRadius: 15,
            // marginRigth: 15,
            borderColor: `rgba(198, 0, 126, 0.6)`,
            borderWidth: 0.25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              padding: 10,
            }}
          >
            Reminders
          </Text>
          <ReminderListScreen></ReminderListScreen>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // marginLeft: 15,
            margin: "auto",
            width: "60%",
            height: 50,
            backgroundColor: `rgba(198, 0, 126, 0.2)`,
            borderRadius: 15,
            marginHorizontal: "auto",
            borderColor: `rgba(198, 0, 126, 0.6)`,
            borderWidth: 0.25,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              padding: 10,
              verticalAlign: "middle",
            }}
          >
            Add Geofence
          </Text>
          <FontAwesome6
            name="add"
            size={24}
            color="black"
            style={{
              marginRight: 10,
              margin: "auto",
            }}
          />
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 25,
    fontWeight: 600,
    color: "#333333",
  },
  pageSubTitle: {
    fontSize: 17.5,
    fontWeight: 600,
    color: "#333333",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
