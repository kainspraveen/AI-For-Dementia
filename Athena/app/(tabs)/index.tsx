import {
  // Image,
  StyleSheet,
  // Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import LottieView from 'lottie-react-native';
// import Loader from '@/components/Loader';
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import Svg, {
//   Use,
//   // Image,
// } from 'react-native-svg';
// import ProgressChart from '@/components/ProgressChart';
import CircularProgress from "react-native-circular-progress-indicator";
// import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
export default function HomeScreen() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <SafeAreaView>
          <Ionicons
            style={styles.notificationsBell}
            name="notifications-outline"
            size={40}
            color="black"
          />
          <Text style={styles.titleContainer}>Good morning, Joe</Text>

          <Text
            style={{
              fontSize: 25,
              fontWeight: 500,
              // padding: 10,
              marginLeft: "5%",
              marginVertical: 20,
            }}
          >
            Next tasks
          </Text>

          <View style={{ height: 200, marginBottom: 10 }}>
            <ScrollView
              horizontal={true}
              // pagingEnabled = {true}
              // nestedScrollEnabled= {true}
              // style = {{flex: 1}}
              // contentContainerStyle = {{paddingVertical: 5, flexDirection: 'row'}}
              // pagingEnabled = {true}
            >
              <View
                style={{
                  backgroundColor: "#7b68ee",
                  justifyContent: "center",
                  marginHorizontal: 20,
                  height: 200,
                  width: "95%",
                  borderRadius: 25,
                }}
              >
                <LinearGradient
                  // Background Linear Gradient
                  colors={["rgba(0,0,0,0.8)", "transparent"]}
                  // style={styles.background}
                />
                <MaterialIcons
                  style={styles.taskCardIcon}
                  name="dinner-dining"
                  size={65}
                  color="#f5f5dc"
                />

                <Text
                  style={{
                    // margin: 'auto',
                    marginLeft: "5%",
                    marginVertical: "auto",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#f5f5dc",
                  }}
                >
                  12:30 - Have Lunch
                </Text>
                <AntDesign
                  style={styles.taskCardDone}
                  name="checkcircle"
                  size={90}
                  color="#f5f5dc"
                />
              </View>
              <View
                style={{
                  // display: 'flex',
                  backgroundColor: "rgb(236,236,250)",
                  height: 200,
                  width: "95%",
                  borderRadius: 25,
                  justifyContent: "center",
                  // margin: 'auto'
                }}
              >
                <LinearGradient
                  // Background Linear Gradient
                  colors={["rgba(0,0,0,0.8)", "transparent"]}
                  // style={styles.background}
                />
                <MaterialIcons
                  style={styles.taskCardIcon}
                  name="dinner-dining"
                  size={65}
                  color="#7b68ee"
                />

                <Text
                  style={{
                    // margin: 'auto',
                    marginLeft: "5%",
                    marginVertical: "auto",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  12:30 - Have Lunch
                </Text>
                <AntDesign
                  style={styles.taskCardDone}
                  name="checkcircle"
                  size={90}
                  color="#7b68ee"
                />
              </View>
            </ScrollView>
          </View>

          <View style={styles.dailyProgress}>
            {/* <Redirect href={'/planning'}></Redirect> */}
            <Text
              style={{
                lineHeight: 30,
                marginLeft: "2.5%",
                height: 100,
                width: 150,
                fontSize: 25,
                fontWeight: 500,
                padding: 10,
                marginVertical: 20,
                color: "black",
              }}
            >
              Today's Progress
            </Text>
            <Text
              style={{
                fontSize: 17.5,
                fontWeight: 300,
                marginLeft: "5%",
                padding: 0,
                color: "rgba(80,81,135, 1)",
              }}
            >
              4 of 12 completed
            </Text>
            <View style={styles.circularProgress}>
              <CircularProgress
                value={60}
                radius={50}
                activeStrokeWidth={12}
                activeStrokeColor={"#7b68ee"}
                progressValueColor={"black"}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push("/stt")}>
            <View style={styles.planning}>
              <Text
                style={{
                  // margin: 'auto',
                  marginLeft: "5%",
                  marginVertical: "5%",
                  fontSize: 17.5,
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Planning
              </Text>
              <Text
                style={{
                  // margin: 'auto',
                  marginLeft: "15%",
                  // marginVertical: 'auto',
                  fontSize: 15,
                  fontWeight: 400,
                  color: "black",
                }}
              >
                Doctor, Activities, Social
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/planning")}>
            <View style={styles.medication}>
              <Text
                style={{
                  // margin: 'auto',
                  marginLeft: "5%",
                  marginVertical: "auto",
                  fontSize: 17.5,
                  fontWeight: 600,
                  color: "black",
                }}
              >
                Medication
              </Text>

              <Text
                style={{
                  // margin: 'auto',
                  marginLeft: "15%",
                  marginVertical: "auto",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "black",
                }}
              >
                1:30 PM - Dopenzil - After Lunch
              </Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  medication: {
    marginTop: 10,
    backgroundColor: "rgb(236,236,250)",
    minHeight: 100,
    maxHeight: "auto",
    width: "95%",
    borderRadius: 25,
    margin: "auto",
  },

  planning: {
    // marginTop: 10,
    backgroundColor: "rgb(236,236,250)",
    minHeight: 100,
    maxHeight: "auto",
    width: "95%",
    borderRadius: 25,
    margin: "auto",
  },

  circularProgress: {
    display: "flex",
    alignSelf: "flex-end",
    position: "absolute",
    margin: "auto",
    paddingEnd: 25,
    marginVertical: 50,
  },

  dailyProgress: {
    marginTop: 10,
    // backgroundColor: "#7b68ee",
    height: 200,
    width: "95%",
    // borderRadius: 25,
    margin: "auto",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },

  notificationsBell: {
    // marginRight: 0,
    padding: 10,
    alignSelf: "flex-end",
  },
  taskCardIcon: {
    // marginRight: 0,
    padding: 10,
    alignSelf: "flex-start",
  },
  taskCardDone: {
    paddingEnd: 25,
    marginVertical: 50,
    opacity: 0.75,
    position: "absolute",
    alignSelf: "flex-end",
  },
  titleContainer: {
    // flexDirection: 'row',
    position: "relative",
    marginLeft: "5%",
    // padding: 10,
    fontWeight: "500",
    // marginVertical: '85%',
    alignItems: "center",
    fontSize: 32.5,
    // bottom: '-130%'
    // backgroundColor: '#0a7ea4'
    // gap: 8,
  },
  appLogo: {
    margin: "auto",
    height: 110,
    width: 110,
    marginVertical: "2.5%",

    alignItems: "center",
    // fontSize: '30px'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "relative",
    backgroundColor: "black",
  },
});
