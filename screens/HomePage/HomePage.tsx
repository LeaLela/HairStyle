import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const HomePage: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    nav.push("Register");
  };
  const goToLogin = async () => {
    nav.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/favicon.png")}
        style={styles.globe}
      />
      <Image
        source={require("../../assets/favicon.png")}
        style={styles.gsLogo}
      />
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTwo}>Hair Style Studio Calendar</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToRegistration}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globe: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  gsLogo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 30,
  },
  welcomeTextContainer: {
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 28,
    color: "#2c365d",
    fontWeight: "bold",
  },
  textContainer: {
    marginBottom: 40,
    marginHorizontal: 20,
    opacity: 0.7,
  },
  textTwo: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    backgroundColor: "#2c365d",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#2c365d",
    textAlign: "center",
  },
  loginButtonText: {
    color: "#ff5e3a",
    fontWeight: "bold",
  },
});
