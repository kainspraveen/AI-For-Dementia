import { FontAwesome } from "@expo/vector-icons";

import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

const CircularRevolvingAnimation = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000, // Duration of one complete rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotate.start();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]}>
        <View style={styles.innerCircle}>
          <FontAwesome name="microphone" size={60} color="#003366" />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#7edce2", // Light turquoise color
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#000", // Background color for the inner circle
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularRevolvingAnimation;
