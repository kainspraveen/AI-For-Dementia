import React, { View, Text } from "react-native";
import { useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";

export default function Alert() {
  return (
    <View
      style={{
        margin: "auto",
        alignItems: "center",
        height: 50,
        width: "95%",
        backgroundColor: `rgba(255, 59, 48, 0.1)`,
        borderRadius: 15,
        borderColor: `rgba(0, 0, 0, 0.4)`,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        marginBottom: 15,
      }}
    >
      <Feather
        name="alert-triangle"
        size={24}
        color="black"
        style={{
          margin: "auto",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          margin: "auto",
          color: `rgba(255, 59, 48, 1)`,
          fontWeight: 500,
        }}
      >
        Joe missed morning Tablet
      </Text>
    </View>
  );
}
