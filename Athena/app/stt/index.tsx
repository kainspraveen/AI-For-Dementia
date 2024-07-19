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
  const [ttmResponse_, setTtmResponse_] = useState("");

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
    console.log("%%");
    const thingToSay = "You put your remote on the Top Shelf today Morning";
    // if (!thingToSay) {
    //   const thingToSay = transcript;
    // }
    console.log("%%");
    console.log(ttmResponse_);
    Speech.speak(thingToSay, { volume: 1.0 });
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
  async function getIntent() {
    if (transcript.includes("find")) {
      if (transcript.includes("remote")) {
        setTtmResponse_("Your put your remote on the Top Shelf!");
      } else if (transcript.includes("keys")) {
        setTtmResponse_("You put your keys on the Tv Drawer.");
      }
    } else if (transcript.includes("talk")) {
      setTtmResponse_("Hi Joe, what do you want to talk about");
    } else if (transcript.includes("remember")) {
      setTtmResponse_("Ok Done!");
    }
    console.log(ttmResponse_);
  }
  // }

  // const url = "https://speech.googleapis.com/v1/speech:recognize";
  // async function talkToMe() {
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
  //         "Bearer ya29.a0AXooCguttkdPNFe70sbtVY-MO9IKvdbNooiCu_h1f78ys1nygLYD4Ou_CkcLsoYFmTTAN0Mxv3p3AXafO4R9Tn82ogBGThuussZ2ihHyS0ERuwR1TeRrQKQztsKuR8je102nNxjiI1b4tD9056SCu1KeXmFA2h0-3AeLGElLTgaCgYKAToSARASFQHGX2MiKSbFwANAREHFLAMBPIIIwA0177",
  //     },
  //     body: JSON.stringify(requestBody),
  //   });
  //   console.log("test1");
  //   const transcription = await response.json();
  //   console.log(response);
  //   console.log(response.text());
  //   console.log("test2");
  //   setTranscript(transcription);
  //   speak();
  // }

  async function talkToMe() {
    const myHeaders = new Headers();
    myHeaders.append("x-goog-user-project", "dementia-428310");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer ya29.a0AXooCgv2eI-QSEyi3ykOXlmkUcUsw4SORlhH0dxv_6-OyZhwlFN6XzTGtsCSgqg6hApz94LYPw_4gQ3Xsg8-xbZJ1lDjVwXq02JLisglEBLnvaNosZq85ylFuZGlK9I_981FxnHXZsUrbuWoBLSiQn3YjFwMZq_y1Kem51czMAaCgYKAXkSARASFQHGX2MiLPrY7Q4cqxff_tbJ_g0e8A0177"
    );

    const raw = JSON.stringify({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 48000,
        audioChannelCount: 2,
        languageCode: "en-US",
      },
      audio: {
        content: base64String,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://speech.googleapis.com/v1/speech:recognize", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setTranscript(JSON.stringify(result));
        console.log("u ");
        console.log(transcript);
        console.log(" f");
        talkToMe2();
      })
      .catch((error) => console.error(error));
  }

  // const url = "http://35.195.190.151:80/talktome";
  // async function talkToMe2() {
  //   console.log("inside talk to me");
  //   const requestBody = {
  //     query: transcript,
  //     user_id: 1,
  //   };
  //   console.log("test 0");
  //   const ttmResponse = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "applicatin/json",
  //     },
  //     body: JSON.stringify(requestBody),
  //   });
  //   console.log("test1");
  //   console.log(ttmResponse.json());
  //   console.log(ttmResponse);
  //   setTtmResponse_(ttmResponse);
  //   console.log("test 2");
  //   speak();
  // }

  async function talkToMe2() {
    getIntent();
    // talkToMe3();
  }
  async function talkToMe3() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const raw = JSON.stringify({
    //   query: base64String,
    //   user_id: 1,
    // });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: ttmResponse_,
      redirect: "follow",
    };

    fetch("http://35.195.190.151:80/talktome", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
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
    await playAudio();
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
    await speak();
    console.log(ttmResponse_);
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
