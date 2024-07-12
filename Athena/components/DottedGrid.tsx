import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const DottedGridBackground = () => {
  const dotSize = 4;
  const dotSpacing = 40;

  const dots = [];
  for (let x = 0; x < width; x += dotSpacing) {
    for (let y = 0; y < height; y += dotSpacing) {
      dots.push(
        <Circle key={`${x}-${y}`} cx={x} cy={y} r={dotSize / 2} fill="black" />
      );
    }
  }

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        {dots}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default DottedGridBackground;
