import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./screens/HomePage/HomePage";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import {ProfileScreen}from "./screens/Profile/ProfileScreen";
import { WomenScreenCopy } from "./screens/WomenScreen/WomenScreenCopy";
import { MenScreen } from "./screens/MenScreen/MenScreen";
import { MyBookingsScreen } from "./screens/MyBookingsScreen/MyBookingsScreen";
import Toast from 'react-native-toast-message';
import { RootSiblingParent } from 'react-native-root-siblings';
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserData, saveUserData, removeUserData } from './utils/storageUtils';

export type RootStackParamList = {
  WomenScreen: { hairStyle: "Women" };
  MenScreen: { hairStyle: "Men" };
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await getUserData();
      if (savedUser) {
        setUser(savedUser);
        setInitializing(false);
      } else {
        onAuthStateChanged(getAuth(), (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            saveUserData(firebaseUser);
          } else {
            setUser(null);
          }
          setInitializing(false);
        });
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      await removeUserData();
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  if (initializing) return null; // or a loading spinner

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                  title: "Profile",
                  headerShown: true,
                  headerTintColor: "#ff5e3a",
                  headerTitleStyle: { color: "white" },
                  headerStyle: {
                    backgroundColor: "rgb(28 35 48)",
                  },
                  headerRight: () => (
                    <Button
                      onPress={handleLogout}
                      title="Logout"
                      color="#ff5e3a"
                    />
                  ),
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
                name="MyBookings"
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
              <Stack.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{
                  title: "Admin Profile",
                  headerShown: true,
                  headerTintColor: "#ff5e3a",
                  headerTitleStyle: { color: "white" },
                  headerStyle: {
                    backgroundColor: "rgb(28 35 48)",
                  },
                }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;