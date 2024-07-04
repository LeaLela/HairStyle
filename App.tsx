import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, ActivityIndicator } from "react-native";
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
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserData, saveUserData, removeUserData } from './utils/storageUtils';
import Role from './screens/Enums/user_role';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { TouchableOpacity, Image } from 'react-native';

export type RootStackParamList = {
  WomenScreen: { hairStyle: "Women" };
  MenScreen: { hairStyle: "Men" };
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await getUserData();
      if (savedUser) {
        const userDoc = await getDoc(doc(db, "users", savedUser.uid));
        const role = userDoc.exists() ? userDoc.data().role : "user";
        setUserRole(role);
        setUser(savedUser);
        setInitializing(false);
      } else {
        onAuthStateChanged(getAuth(), async (firebaseUser) => {
          if (firebaseUser) {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const role = userDoc.exists() ? userDoc.data().role : "user";
            setUserRole(role);
            setUser(firebaseUser);
            saveUserData(firebaseUser);
          } else {
            setUser(null);
            setUserRole(null);
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
      setUserRole(null);
      await removeUserData();
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff5e3a" />
      </View>
    );
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          {user ? (
            userRole === Role.Admin ? (
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
                  headerRight: () => (
                    <TouchableOpacity onPress={handleLogout}>
                      <Image
                        source={require("../HairStyleCalendar/assets/logout.png")} 
                        style={{ width: 20, height: 20, marginRight: 10 }} 
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            ) : (
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
                      <TouchableOpacity onPress={handleLogout}>
                        <Image
                          source={require("../HairStyleCalendar/assets/logout.png")} 
                          style={{ width: 20, height: 20, marginRight: 10 }} 
                        />
                      </TouchableOpacity>
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
              </>
            )
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default App;