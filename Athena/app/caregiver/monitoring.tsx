import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
} from "react-native";
import { LineChartBicolor } from "react-native-gifted-charts";
import MapView, { Circle } from "react-native-maps";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import DottedGridBackground from "@/components/DottedGrid";
import TaskRow from "@/components/TaskRow";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import { Marker } from "react-native-maps";
import { Stack, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
export default function Routine() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title
      headerBackTitleVisible: false, // Optional: Remove the back button title
    });
  }, [navigation]);
  const data = [
    { value: -2, label: "Mon" },
    { value: 15, label: "Tue" },
    { value: 2, label: "Wed" },
    { value: -7, label: "Thu" },
    { value: 10, label: "Fri" },
    { value: 5, label: "Sat" },
  ];

  const patientCordinate = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const progressData = {
    labels: ["Meds", "Tasks"], // optional
    data: [0.4, 0.6],
  };
  const chartConfig = {
    backgroundGradientFrom: `rgba(242,242,242,1)`,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: `rgba(242,242,242,1)`,
    // backgroundGradientToOpacity: 0.5,
    // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    color: (opacity = 1) => `rgba(198, 0, 126, ${opacity})`,
    // color: (opacity = 1) => `rgba(0, 176, 185, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const yLabelFunction = (value) => {
    if (value <= -5) {
      // return "Very Unpleasant";
      return "☹️";
    } else if (value <= 0) {
      // return "Unpleasant";
      return "🙁";
    } else if (value <= 5) {
      // return "Normal";
      return "😐";
    } else if (value <= 10) {
      // return "Pleasant";
      return "😊";
    } else if (value <= 15) {
      // return "Very Pleasant";
      return "😄";
    }
    return "";
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: "#F5F5DC",
      }}
      // edges={["right", "left", "top"]}
    >
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          flex: 1,
        }}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            margin: "auto",
            padding: 10,
          }}
        >
          {" "}
          Monitoring View for Joe
        </Text>
        <Text
          style={{
            margin: "auto",
            fontSize: 15,
            fontWeight: 400,
            padding: 10,
          }}
        >
          GeoFence :{" "}
          <Text
            style={{
              margin: "auto",
            }}
          >
            Joe is currently at Home
          </Text>
        </Text>
        <View
          style={{
            flex: 1,
            margin: "auto",
            // backgroundColor: `rgba(128,x 214, 224, 0.45)`,
            width: "95%",
            maxHeight: "auto",
            minHeight: 200,
            borderRadius: 15,
            marginBottom: 15,
          }}
        >
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}
            style={{
              flex: 1,
              width: "95%",
              height: 200,
              // width: "",
              borderRadius: 15,
              margin: "auto",
            }}
          >
            <Circle
              center={patientCordinate}
              radius={100}
              strokeWidth={2}
              fillColor={`rgba(34, 153, 84, 0.25)`}
            ></Circle>
            <Marker
              coordinate={patientCordinate}
              // title="My Marker"
              // description="This is a marker"
              // image={require("@/assets/images/map-marker.png")}
            ></Marker>
          </MapView>
        </View>
        <View
          style={{
            margin: "auto",
            marginLeft: -10,
          }}
        >
          <Text
            style={{
              margin: "auto",
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            Mood history
          </Text>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [-6, 5, 0, 10, 15, 4, 2],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            formatYLabel={yLabelFunction}
            yLabelsOffset={10}
            yAxisLabel=""
            // yAxisLabel
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: `rgba(242,242,242,1)`,
              backgroundGradientFrom: `rgba(242,242,242,1)`,
              backgroundGradientTo: `rgba(242,242,242,1)`,
              decimalPlaces: 2, // optional, defaults to 2dp
              fillShadowGradientFrom: "#80d6e0",
              fillShadowGradientTo: "#80d6e0",

              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#80d6e0",
              },
            }}
            bezier
            style={{
              marginVertical: 5,
              borderRadius: 16,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              margin: "auto",
              fontSize: 15,
              fontWeight: 400,
              marginBottom: -2.4,
            }}
          >
            Task Status
          </Text>
          <ProgressChart
            data={progressData}
            width={Dimensions.get("window").width - 20}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />
        </View>
        <Text
          style={{
            margin: "auto",
            fontSize: 15,
            fontWeight: 400,
            paddingBottom: 5,
          }}
        >
          Today's Mood
        </Text>
        <View
          style={{
            margin: "auto",
            backgroundColor: `rgba(128, 214, 224, 0.15)`,
            width: "95%",
            height: "auto",
            borderRadius: 15,
            borderColor: `rgba(0,0,0,0.1)`,
            borderWidth: 1,
          }}
        >
          {/* Today's mood -{" "} */}
          <Text
            style={{
              margin: "auto",
              // marginLeft: "50%",
              padding: 10,
              fontWeight: 600,
              fontSize: 25,
              letterSpacing: 1.25,
            }}
          >
            Pleasant
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: 450,
              paddingLeft: 10,
              paddingTop: 10,
            }}
          >
            Mood best described by:
          </Text>
          <View
            style={{
              width: "auto",
              display: "flex",
              flexDirection: "row",
              margin: "auto",
              padding: 10,
              alignSelf: "baseline",
              flexWrap: "wrap",
              // display: "flex",
              // justifyContent: "space-between",

              // flexDirection: "row",
            }}
          >
            <Chip
              icon="heart"
              onPress={() => console.log("Pressed")}
              style={{ margin: 2.5 }}
              showSelectedOverlay={true}
            >
              Angry
            </Chip>
            <Chip
              icon="star"
              onPress={() => {
                console.log("Pressed");
              }}
              style={{ margin: 2.5 }}
            >
              Anxious
            </Chip>
            <Chip
              icon="weather-cloudy"
              onPress={() => console.log("Pressed")}
              style={{ margin: 2.5 }}
            >
              Worried
            </Chip>
            <Chip
              icon="information"
              onPress={() => console.log("Pressed")}
              style={{ margin: 2.5 }}
            >
              Lonely
            </Chip>
          </View>
        </View>
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
