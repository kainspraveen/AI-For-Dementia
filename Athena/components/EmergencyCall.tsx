// App.js
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
export default function EmergencyCall() {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);
  const handleButtonPress = () => {
    // Functionality for Button 2
    console.log("Emergency call pressed");
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        />
        <Animated.View style={[styles.circle, styles.innerCircle]}>
          <View style={styles.icon}>
            <Feather name="phone-call" size={110} color="#fff" />
          </View>

          <Text
            style={{
              // marginTop: 30,
              bottom: 50,
              position: "absolute",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#fff",
            }}
          >
            Emergency Call
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b0b9", // Light turquoise background
  },
  circle: {
    position: "absolute",
    width: 320,
    height: 320,
    // backgroundColor: "rgba(0, 121, 107, 0.5)", // Lighter turquoise
    backgroundColor: "#80d6e0",
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 300,
    height: 300,
    backgroundColor: "#00b0b9", // Turquoise background for the circle
    borderRadius: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    // color: "#f5f5dc",
    // fontSize: 40,
    // marginTop: 50,
  },
});
