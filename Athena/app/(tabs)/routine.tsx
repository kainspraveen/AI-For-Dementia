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
import React, { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DottedGridBackground from "@/components/DottedGrid";
import TaskRow from "@/components/TaskRow";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserContext } from "@/components/UserContext";

export default function Routine() {
  const [tasks, setTasks] = useState([]);
  const { userID } = useContext(UserContext);
  async function fetchTasks() {
    const requestBody = {
      user_id: 1,
    };
    //Update the server
    // const apiUrlPut = "https://api.example.com/tasks/1";
    // const response = await fetch(apiUrlPut, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "applicatin/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // dataBody = response.json();
    const data = [
      { time: "9:30", task: "Breakfast" },
      { time: "12:00", task: "Excercise" },
      { time: "4:00", task: "Meet Alice" },
    ];
    setTasks(data);
  }
  useEffect(() => {
    //Fetch from server
    fetchTasks();
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F5F5DC" }}
      edges={["right", "left", "top"]}
    >
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          flex: 1,
          backgroundColor: "#F5F5DC",
          // backgroundImage: "adial-gradient(black 1px, transparent 0)",
          // backgroundSize: 40,
        }}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <View style={{ margin: "auto" }}>
          <Text style={styles.pageTitle}>Today's routine for {userID}</Text>
        </View>
        <View style={{ paddingVertical: 25, paddingLeft: 20 }}>
          <Text style={styles.pageSubTitle}>Daily tasks</Text>
        </View>
        {tasks.map((item, index) => (
          <TaskRow data={item} key={index}></TaskRow>
        ))}
        {/* <TaskRow></TaskRow> */}
        {/* <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow>
        <TaskRow></TaskRow> */}
      </ScrollView>
    </SafeAreaView>
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
