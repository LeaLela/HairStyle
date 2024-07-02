import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage/HomePage";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { ProfileScreen } from "./screens/Profile/ProfileScreen";
import { WomenScreenCopy } from "./screens/WomenScreen/WomenScreenCopy";
import { MenScreen } from "./screens/MenScreen/MenScreen";
import { MyBookingsScreen } from "./screens/MyBookingsScreen/MyBookingsScreen";
import Toast from 'react-native-toast-message';
import { RootSiblingParent } from 'react-native-root-siblings';

export type RootStackParamList = {
  WomenScreen: { hairStyle: "Women" };
  MenScreen: { hairStyle: "Men" };
};

// type RootStackParamList = {
//   Home: undefined;
//   Register: undefined;
//   Login: undefined;
//   Profile: undefined;
//   Women: undefined;
//   // Dodajte ostale ekrane ako ih imate
// };

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
    <NavigationContainer>
    
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="WomenScreen"
          component={WomenScreenCopy}
          options={{
            title: "Hairstyles",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
          name="MenScreen"
          component={MenScreen}
          options={{
            title: "Hairstyles",
            headerShown: true,
            headerTintColor: "#ff5e3a",
            headerTitleStyle: { color: "white" },
            headerStyle: {
              backgroundColor: "rgb(28 35 48)",
            },
          }}
        />
        <Stack.Screen
        name="MyBookingsScreen"
        component={MyBookingsScreen}
        options={{
          title: "My Bookings",
          headerShown: true,
          headerTintColor: "#ff5e3a",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "rgb(28 35 48)",
          },
        }}
        />
     
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//     <NavigationContainer>
//             <MyBookingsScreen />
//             <Toast />
//       <StatusBar style="light" />
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomePage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterScreen}
//           options={{
//             headerShown: true,
//             headerTintColor: "#ff5e3a",
//             headerTitleStyle: { color: "white" },
//             headerStyle: {
//               backgroundColor: "rgb(28 35 48)",
//             },
//           }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             title: "Login",
//             headerShown: true,
//             headerTintColor: "#ff5e3a",
//             headerTitleStyle: { color: "white" },
//             headerStyle: {
//               backgroundColor: "rgb(28 35 48)",
//             },
//           }}
//         />
//           <Stack.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{
//               title: "Profile",
//               headerShown: true,
//               headerTintColor: "#ff5e3a",
//               headerTitleStyle: { color: "white" },
//               headerStyle: {
//                 backgroundColor: "rgb(28 35 48)",
//             },
//           }}
//         />
        
//         <Stack.Screen
//             name="WomenScreen"
//             component={WomenScreen}
//             options={{
//               title: "Hair styles",
//               headerShown: true,
//               headerTintColor: "#ff5e3a",
//               headerTitleStyle: { color: "white" },
//               headerStyle: {
//                 backgroundColor: "rgb(28 35 48)",
//             },
//           }}
//         />
//           <Stack.Screen
//             name="MenScreen"
//             component={MenScreen}
//             options={{
//               title: "Hair styles",
//               headerShown: true,
//               headerTintColor: "#ff5e3a",
//               headerTitleStyle: { color: "white" },
//               headerStyle: {
//                 backgroundColor: "rgb(28 35 48)",
//             },
//           }}
//         />
//           <Stack.Screen
//             name="MyBookingsScreen"
//             component={MyBookingsScreen}
//             options={{
//               title: "My bookings",
//               headerShown: true,
//               headerTintColor: "#ff5e3a",
//               headerTitleStyle: { color: "white" },
//               headerStyle: {
//                 backgroundColor: "rgb(28 35 48)",
            
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
