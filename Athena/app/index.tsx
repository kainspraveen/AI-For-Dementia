// app/index.js
import React, { useLayoutEffect, useContext, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter, useNavigation, router, Redirect, Link } from "expo-router";
import { UserContext } from "@/components/UserContext";
import { TextInput } from "react-native-paper";

export default function Login() {
  const router = useRouter();
  // const navigation = useNavigation();
  // console.log(router);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "", // Remove the header title
  //     headerBackTitleVisible: false, // Optional: Remove the back button title
  //   });
  // }, [navigation]);

  const { setUserID } = useContext(UserContext);
  const [textID, setTextID] = useState("");
  return (
    <View>
      <Text style={styles.title}>Log in to Medha</Text>
      <View
        style={{
          height: 300,
          width: "95%",
          margin: "auto",
        }}
      >
        <Image
          source={require("@/assets/images/psychology.png")}
          style={{
            height: 200,
            width: 200,
            margin: "auto",
          }}
        ></Image>
      </View>
      <View>
        <TextInput
          style={{ margin: 15 }}
          mode="outlined"
          label="User"
          placeholder="Enter your Name"
          onChangeText={(text) => setTextID(text)}
          right={<TextInput.Affix text="/100" />}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Patient Login"
          onPress={() => {
            router.push("/(tabs)");
            // setUserID("kainspraveen33@gmail.com");
            setUserID(textID);
          }}
          // onPress={() => <Link href={"/index/(tabs)"} replace></Link>}
        />
        <Button
          title="Caregiver Login"
          onPress={() => {
            router.push("/caregiver");
            setUserID(textID);
          }}
          // onPress={() => <Link href={"/index/caregiver"} replace></Link>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    margin: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    margin: "auto",
    padding: 15,
  },
});
