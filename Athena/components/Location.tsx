import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import haversine from "haversine";
import * as Location from "expo-location";

export default function LocationTest() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [patientLocation, setPatinetLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log("fdefefs");
      let location_ = await Location.getCurrentPositionAsync({});
      // console.log(location_);
      setLocation(location_);
      setPatinetLocation({
        latitude: location_?.coords?.latitude,
        longitude: location_?.coords?.longitude,
      });
    })();
  }, []);

  // useEffect(() => {
  //   console.log("----------", location);
  // }, [location]);

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

  haversine1 = haversine(geoFence1, patientLocation);
  haversine2 = haversine(geoFence2, patientLocation);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text>{JSON.stringify(patientLocation)}</Text>
      <Text>
        {JSON.stringify(
          haversine(geoFence1, patientLocation, {
            threshold: 3651,
          })
        )}
      </Text>
      {/* <Text>{JSON.stringify(location)}</Text> */}
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
