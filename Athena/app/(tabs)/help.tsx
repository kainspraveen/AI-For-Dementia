import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmergencyCall from "@/components/EmergencyCall";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
export default function HelpScreen() {
  const handleWayHome = () => {
    // Functionality for Button 2
    console.log("Find my way home pressed");
  };

  const handleAskAnything = () => {
    // Functionality for Button 2
    console.log("Ask anything presed");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.pageTitle}>Need help?</Text>
        <View style={styles.emergencyCall}>
          <EmergencyCall></EmergencyCall>
        </View>

        <View
          style={{
            display: "flex",
            marginHorizontal: "25%",
            // paddingBottom: 30,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={handleAskAnything}>
            <View
              style={{
                display: "flex",
                position: "relative",
                width: "auto",
                alignItems: "center",
                paddingBottom: 30,
                paddingRight: 100,
              }}
            >
              <FontAwesome name="microphone" size={60} color="#003366" />
              <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: 600 }}>
                Ask anything
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWayHome}>
            <View
              style={{
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <FontAwesome5 name="map-marked-alt" size={60} color="#003366" />

              <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: 600 }}>
                Find my way home
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emergencyCall: {
    // marginBottom: 0,
    margin: "auto",
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 100,
    marginVertical: "7.5%",
    letterSpacing: 3,
    // margin: "auto",
  },
});
