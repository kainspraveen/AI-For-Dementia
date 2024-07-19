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
import React, { useLayoutEffect } from "react";
import Alert from "@/components/Alert";
export default function Routine() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title
      headerBackTitleVisible: false, // Optional: Remove the back button title
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: "#fff",
      }}
      // edges={["right", "left", "top"]}
    >
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          flex: 1,
          // backgroundColor: "#F5F5DC",
          // backgroundImage: "adial-gradient(black 1px, transparent 0)",
          // backgroundSize: 40,
        }}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            padding: 20,
            margin: "auto",
          }}
        >
          {/* {" "} */}
          Alerts View for Caregiver
        </Text>

        <Alert></Alert>
        <Alert></Alert>
        <Alert></Alert>
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
