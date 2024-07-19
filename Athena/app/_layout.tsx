import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// // import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// // // Prevent the splash screen from auto-hiding before asset loading is complete.
// // SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [user, setUser] = useState(2);
//   const userType = { 1: "(tabs)", 2: "caregiver" };
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });
//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);
//   // useEffect(() => {
//   //   if (loaded) {
//   //     SplashScreen.hideAsync();
//   //   }
//   // }, [loaded]);
//   console.log(userType[user]);

//   if (!loaded) {
//     return null;
//   }

// return (
//   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//     <Stack>
//       <Stack.Screen name="index-d" options={{ headerShown: false }} />
//       {/* <Stack.Screen name="caregiver" options={{ headerShown: false }} /> */}
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   </ThemeProvider>
// );
// }
// app/_layout.js

// VERSION 2 That is working but problem with headers
import { Stack } from "expo-router";
import { UserProvider } from "@/components/UserContext";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack></Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
/////////////////////////////////////////////////////////////////////

// import { Slot } from "expo-router";
// import { SessionProvider } from "@/components/ctx";

// export default function Root() {
//   // Set up the auth context and render our layout inside of it.
//   return (
//     <SessionProvider>
//       <Slot />
//     </SessionProvider>
//   );
// }
