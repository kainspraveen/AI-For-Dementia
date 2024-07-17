import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { View } from "react-native";
import Reactt, { useRef, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function VoiceAssist() {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(5, 116);
  }, []);

  return (
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
          autoPlay
          loop
          speed={1}
          style={{
            alignSelf: "center",
            width: "85%",
            height: "85%",
          }}
        />
        <TouchableOpacity onPress={startRecording}>
          <FontAwesome name="microphone" size={60} color="black" />
        </TouchableOpacity>
        {/* FCB07E */}
        <Text>Talk to Medha</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
