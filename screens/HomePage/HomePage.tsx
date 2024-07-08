import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
      <Text style={styles.title}>HairStyle Studio</Text>
      <Text style={styles.subtitle}>Hair Salon Calendar</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={goToRegistration}>
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#272e4f",
  },
  title: {
    fontSize: 36,
    color: "#f2f2f0",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#f2f2f0",
    fontStyle: "italic",
    marginBottom: 50,
  },
  buttonContainer: {
    width: "80%",
  },
  loginButton: {
    backgroundColor: "#f2f2f0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#2c365d",
    borderWidth: 1,
  },
  registerButton: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: "center",
    borderColor: "#2c365d",
    borderWidth: 1,
  },
  loginButtonText: {
    color: "#2c365d",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButtonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
  },
});

