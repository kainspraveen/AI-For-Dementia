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
import TalkToMeIcon from "@/components/TalkToMeIcon";
import HelpBottomBar from "@/components/HelpBottomBar";
export default function HelpScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <ScrollView
        style={{
          flex: 1,
        }}
      > */}
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.pageTitle}>Need help?</Text>
          <View style={styles.emergencyCall}>
            <EmergencyCall></EmergencyCall>
          </View>

          <HelpBottomBar></HelpBottomBar>
        </View>
      </SafeAreaView>
      {/* </ScrollView> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  emergencyCall: {
    marginBottom: 0,
    margin: "auto",
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 100,
    marginVertical: "7.5%",
    letterSpacing: 3,
    // margin: "auto",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
