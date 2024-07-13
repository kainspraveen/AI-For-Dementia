import { useState, useEffect, useLayoutEffect } from "react";
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
export default function Record() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [transcript, setTranscript] = useState("");

  const navigation = useNavigation();

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

  const url = "https://speech.googleapis.com/v1/speech:recognize";
  async function audioTranscription() {
    const requestBody = {
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 48000,
        audioChannelCount: 2,
        languageCode: "en-US",
      },
      audio: {
        content: base64String,
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-user-project": "dementia-428310",
        Authorization:
          "Bearer ya29.a0AXooCgtThmn2Yl1PL4aCXv1K21pIU2HPG-NdnCtRAuGyhEyfruZR3uGgnddmLORhX8o00J8FEvqMMQpvl3vMLZwm0qsWNqGGoXG1sQ5oDzHwUNGD_PJ0xXXHJpLACDgIeTH5Gt9VDTo85pz8BYUhRn_OwHGsnL_Kd32X_C_tUQaCgYKATQSARASFQHGX2MilglqgSPdPKtkIVSCJgTbfA0177",
      },
      body: JSON.stringify(requestBody),
    });
    const transcription = await response.json();
    setTranscript(transcription);
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
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    setAudioUri(uri);

    readAudioFile(audioUri)
      .then((base64String) => {
        setBase64String(base64String);
        // Use the base64 string as needed
        console.log(base64String);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    await audioTranscription();
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
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  console.log(Speech.getAvailableVoicesAsync());

  return (
    <GestureHandlerRootView>
      {/* <Stack.Screen name="stt/index" options={{ headerShown: false }} /> */}
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Button
              title={recording ? "Stop Recording" : "Start Recording"}
              onPress={recording ? stopRecording : startRecording}
            />
            <Button
              title="Play Recording"
              onPress={playAudio}
              disabled={!audioUri}
            />
            <Text>{JSON.stringify(recording)}</Text>
            {/* <Button title="Encode b64" onPress={displayB64}></Button> */}
            {/* <Text>Base 64 : {base64String}</Text> */}
            <Text>Transcript: {JSON.stringify(transcript)}</Text>
            <Text>{JSON.stringify(Speech.getAvailableVoicesAsync())}</Text>
          </View>
        </ScrollView>
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
