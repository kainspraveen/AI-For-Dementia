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
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");
  const navigation = useNavigation();
  const [moodMap, setMoodMap] = useState([
    "Content",
    "Calm",
    "Peaceful",
    "Indifferent",
  ]);
  const [moodDesc, setMoodDesc] = useState("");
  const moodMapping = {
    veryUnpleasant: ["Angry", "Anxious", "Scared", "Ashamed", "Annoyed"],
    unPleasant: ["Angry", "Anxious", "Scared", "Jealous", "Lonely", "Sad"],
    neutral: ["Content", "Calm", "Peaceful", "Indifferent"],
    pleasant: ["Peaceful", "Excited", "Happy", "Satisfied", "Grateful"],
    veryPleasant: ["Amazed", "Excited", "Happy", "Proud", "Passionate"],
  };
  //   const animationRef = useRef<LottieView>(null);
  const saveMood = async () => {
    const moodLog = { mood, note, date: new Date() };
    const apiUrl = "http://35.195.190.151:80/mood";
    const date = new Date();
    // console.log(moodDesc);
    // console.log(date);
    const requestBody = {
      name: "unpleasant",
      datetime: date,
      patient_id: 1,
    };
    console.log("test 0");
    const moodResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "applicatin/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("test1");
    console.log("66", JSON.stringify(moodResponse));
    console.log("test2");
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
  useLayoutEffect(() => {
    setMoodDesc(
      mood < -5
        ? "veryUnpleasant"
        : mood < 0
        ? "unPleasant"
        : mood < 5
        ? "neutral"
        : mood < 10
        ? "pleasant"
        : "veryPleasant"
    );
    setMoodMap(moodMapping[moodDesc] || []);
  }, [mood]);

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
          style={
            {
              // display: "flex",
              // margin: "auto",
              // flex: 1,
              // flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
              // alignSelf: "center",
              // backgroundColor: "gray",
            }
          }
        >
          <LottieView
            // ref={animationRef}
            source={require("@/assets/animations/Multi Shape Loader.json")}
            autoPlay
            loop
            speed={0.2}
            style={{
              // alignSelf: "center",
              // flex: 1,
              // marginLeft: -0.1,
              // position: "relative",
              marginBottom: 0,
              marginLeft: 5,
              display: "flex",
              margin: "auto",
              width: "85%",
              height: "85%",
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
            // marginBottom: 50,
          }}
          minimumValue={-10}
          maximumValue={15}
          step={0.01}
          value={mood}
          onValueChange={(value) => setMood(value)}
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
            // display: "flex",
            justifyContent: "space-between",
            // flexDirection: "row",
          }}
        >
          {moodMap.map((item, index) => (
            <Chip
              key={index}
              icon="heart"
              onPress={() => console.log("pressed")}
              style={{ margin: 4 }}
              // selected={true}
              showSelectedOverlay={true}
            >
              {item}
            </Chip>
          ))}
          {/* <Chip
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
          </Chip> */}
        </View>
        <Button title="Save Mood" onPress={saveMood} />
      </View>
    </SafeAreaView>
  );
};

export default MoodLoggingScreen;
