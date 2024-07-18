import React, { useState, useRef, useLayoutEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chip } from "react-native-paper";
import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { Stack, useNavigation } from "expo-router";

// import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodLoggingScreen = ({}) => {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState("");
  const navigation = useNavigation();
  //   const animationRef = useRef<LottieView>(null);
  const saveMood = async () => {
    const moodLog = { mood, note, date: new Date() };
    // const existingLogs = JSON.parse(await AsyncStorage.getItem('moodLogs')) || [];
    // existingLogs.push(moodLog);
    // await AsyncStorage.setItem('moodLogs', JSON.stringify(existingLogs));
    // navigation.navigate('History');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title
      headerBackTitleVisible: false, // Optional: Remove the back button title
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text
        style={{
          margin: "auto",
          fontSize: 30,
          fontWeight: 500,
          // padding: 10,
          marginTop: 1,
        }}
      >
        How are you feeling?
      </Text>
      <Animated.View>
        <View
          style={{
            // display: "flex",
            margin: "auto",
            // flex: 1,
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <LottieView
            // ref={animationRef}
            source={require("@/assets/animations/Multi Shape Loader.json")}
            autoPlay
            loop
            speed={1}
            style={{
              alignSelf: "center",
              //   flex: 1,
              margin: "auto",
              width: "80%",
              height: "80%",
            }}
          />
        </View>
      </Animated.View>
      <View style={{ padding: 20 }}>
        <Slider
          style={{
            // width: "auto",
            height: 60,
            // backgroundColor: "gray",
          }}
          minimumValue={-12.5}
          maximumValue={12.5}
          step={0.01}
          value={mood}
          onValueChange={setMood}
        />
        {/* -10 - 5 Very Unpleasant
            -5 - 0 UnPleasant
            0-5 Neutral
            5-10 Pleasant
            10-15 Very Pleasant */}
        <Text
          style={{
            fontSize: 25,
            fontWeight: 500,
            margin: "auto",
          }}
        >
          {mood < -5
            ? "Very Unpleasant"
            : mood < 0
            ? "Unpleasant"
            : mood < 5
            ? "Neutral"
            : mood < 10
            ? "Pleasant"
            : "Very Pleasant"}
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
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Chip
            icon="heart"
            onPress={() => console.log("Pressed")}
            style={{}}
            showSelectedOverlay={true}
          >
            Angry
          </Chip>
          <Chip
            icon="star"
            onPress={() => {
              console.log("Pressed");
            }}
            style={{}}
          >
            Anxious
          </Chip>
          <Chip
            icon="weather-cloudy"
            onPress={() => console.log("Pressed")}
            style={{}}
          >
            Worried
          </Chip>
          <Chip
            icon="information"
            onPress={() => console.log("Pressed")}
            style={{}}
          >
            Lonely
          </Chip>
        </View>
        <Button title="Save Mood" onPress={saveMood} />
      </View>
    </SafeAreaView>
  );
};

export default MoodLoggingScreen;
