import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import haversine from "haversine";
import * as Location from "expo-location";

export default function LocationTest() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const maxRadius = 2.5;

  const geoFence1 = {
    latitude: 30.849635,
    longitude: -83.24559,
  };

  const geoFence2 = {
    latitude: 27.950575,
    longitude: -82.457178,
  };

  const patientLocation = {
    latitude: location["coords"]["latitude"],
    longitude: location["coords"]["longitude"],
  };

  haversine1 = haversine(geoFence1, patientLocation);
  haversine2 = haversine(geoFence2, patientLocation);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
      {/* <Text>{JSON.stringify(patientLocation)}</Text> */}
      <Text>
        {JSON.stringify(
          haversine(geoFence1, patientLocation, {
            threshold: 3651,
          })
        )}
      </Text>
      <Text>{haversine1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
