import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { Stack, useNavigation } from "expo-router";
import VoiceAssist from "@/components/VoiceAssist";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Recording } from "expo-av/build/Audio";

export default function Record() {
  const [recordingAudio, setRecordingAudio] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [transcript, setTranscript] = useState("");
  const [speed, setSpeed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const navigation = useNavigation();
  const animationRef = useRef<LottieView>(null);

  // useEffect(() => {
  //   animationRef.current?.play();

  //   // Or set a specific startFrame and endFrame with:
  //   animationRef.current?.play(3, 116);
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title
      headerBackTitleVisible: false, // Optional: Remove the back button title
    });
  }, [navigation]);

  const speak = () => {
    const thingToSay = "hello there, how are you doing!";
    Speech.speak(thingToSay);
  };

  // Function to read an audio file from assets
  const readAudioFile = async (assetUri) => {
    try {
      // Get the URI for the asset
      //   const assetUri = FileSystem.documentDirectory + filename;
      //   console.log(assetUri);

      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(assetUri);

      if (!fileInfo.exists) {
        throw new Error("File does not exist.");
      }

      // Read the file content
      const fileContent = await FileSystem.readAsStringAsync(assetUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileContent;
    } catch (error) {
      console.error("Error reading audio file from assets:", error);
      throw error;
    }
  };

  // const url = "https://speech.googleapis.com/v1/speech:recognize";
  // async function audioTranscription() {
  //   const requestBody = {
  //     config: {
  //       encoding: "LINEAR16",
  //       sampleRateHertz: 48000,
  //       audioChannelCount: 2,
  //       languageCode: "en-US",
  //     },
  //     audio: {
  //       content: base64String,
  //     },
  //   };
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-goog-user-project": "dementia-428310",
  //       Authorization:
  //         "Bearer ya29.a0AXooCgtThmn2Yl1PL4aCXv1K21pIU2HPG-NdnCtRAuGyhEyfruZR3uGgnddmLORhX8o00J8FEvqMMQpvl3vMLZwm0qsWNqGGoXG1sQ5oDzHwUNGD_PJ0xXXHJpLACDgIeTH5Gt9VDTo85pz8BYUhRn_OwHGsnL_Kd32X_C_tUQaCgYKATQSARASFQHGX2MilglqgSPdPKtkIVSCJgTbfA0177",
  //     },
  //     body: JSON.stringify(requestBody),
  //   });
  //   const transcription = await response.json();
  //   setTranscript(transcription);
  // }

  const url = "http://58.84.62.117:5000/talktome";
  async function talkToMe() {
    console.log("inside talk to me");
    const requestBody = {
      query: base64String,
    };
    console.log("test 0");
    const ttmResponse = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "applicatin/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("test1");
    console.log(ttmResponse.json());
    console.log(ttmResponse);
    setTranscript(ttmResponse);
    console.log("test 2");
  }

  const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
      extension: ".amr",
      outputFormat: Audio.AndroidOutputFormat.AMR_WB,
      audioEncoder: Audio.AndroidAudioEncoder.AMR_WB,
      sampleRate: 16000,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      linearPCMBitDepth: 16,
      bitDepthHint: 16,
      linearPCMIsBigEndian: false,
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 48000,
      numberOfChannels: 2,
      bitRate: 1536000,
      outputFormat: Audio.IOSOutputFormat.LINEARPCM,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 48000,
    },
  };

  async function startRecording() {
    try {
      setSpeed(1);
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        // Audio.RecordingOptionsPresets.HIGH_QUALITY
        recordingOptions
      );
      setRecordingAudio(recording);
      console.log("Recording started");
    } catch (err) {
      setSpeed(0);
      animationRef.current?.reset();
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setSpeed(0);
    animationRef.current?.reset();

    await recordingAudio.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recordingAudio.getURI();
    console.log("Recording stopped and stored at", uri);
    setAudioUri(uri);
    setRecordingAudio(undefined);

    readAudioFile(audioUri)
      .then((base64String) => {
        setBase64String(base64String);
        // Use the base64 string as needed
        // console.log(base64String);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // await audioTranscription();
    await talkToMe();
  }

  const playAudio = async () => {
    // if (audioUri) {
    //   const { sound } = await Audio.Sound.createAsync(
    //     { uri: audioUri },
    //     // { uri: require("@assets/audio/alisa-audio.m4a") },
    //     { shouldPlay: true }
    //   );
    //   setSound(sound);
    // }
    speak();
  };
  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  // console.log(Speech.getAvailableVoicesAsync());

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
          <Animated.View>
            <View
              style={{
                // flex: 1,

                // flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <LottieView
                ref={animationRef}
                source={require("@/assets/animations/mic-animation.json")}
                // autoPlay
                loop
                // speed={1}
                speed={speed}
                style={{
                  // flex: 1,
                  // alignContent: "center",
                  alignItems: "center",
                  // margin: "auto",
                  width: "95%",
                  height: "95%",
                }}
              />

              {/* <FontAwesome name="microphone" size={60} color="black" /> */}

              {/* FCB07E */}
              <Text
                style={{
                  padding: 10,
                  fontSize: 35,
                  fontWeight: 500,
                  margin: "auto",
                  paddingBottom: 50,
                }}
              >
                Talk to Medha
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
