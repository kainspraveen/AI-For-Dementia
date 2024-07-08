import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";

export default function Record() {
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();
        setRecording(recording);
        console.log("started recording...");
      } else {
        alert("Permission to access microphone is required!");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setAudioUri(uri);

      // Implement uploading and streaming logic here
      const audioBytes = await fetch(uri).then((res) => res.arrayBuffer());

      transcribeAudio(audioBytes);

      setRecording(null);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const playAudio = async () => {
    if (audioUri) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(sound);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const transcribeAudio = async (audioBytes) => {
    // Implement your backend communication to stream audio bytes to Google Cloud
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{transcription}</Text>
      <Text>
        {audioUri ? "Recording saved!" : "Press the button to start recording"}
      </Text>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Play Recording" onPress={playAudio} disabled={!audioUri} />
    </View>
  );
}

// export default Record;
