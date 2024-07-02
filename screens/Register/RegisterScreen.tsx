// src/RegisterScreen.tsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, doc, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { getDocs, query, limit } from "firebase/firestore";



export const RegisterScreen: React.FC = () => {
  const [Ime, setFirstName] = useState("");
  const [Prezime, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Lozinka, setPassword] = useState("");
  const [Datum_rodjenja, setBirthDate] = useState("");
  const [Telefon, setPhoneNumber] = useState("");
  const [Spol, setGender] = useState("");
  const [users, setUsers] = useState<any[]>([]);


  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const goToLogin = async () => {
    nav.navigate("Login");
  };

 const createProfile = async (response: any, role: string) => {
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, response.user.uid);
  
    await setDoc(userDoc, {
      Ime,
      Prezime,
      Email,
      Telefon,
      Spol,
      Datum_rodjenja,
      role
    });
  
    console.log("User profile created successfully", usersCollection, userDoc, response.user.uid);
  };
  const validateFields = () => {
    if (!Ime) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'First Name is required.'
      });
      return false;
    }
    if (!Prezime) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Last Name is required.'
      });
      return false;
    }
    if (!Email) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email is required.'
      });
      return false;
    }
    if (!Lozinka) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Password is required.'
      });
      return false;
    }
    if (!Datum_rodjenja) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Birth Date is required.'
      });
      return false;
    }
    if (!Telefon) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Phone Number is required.'
      });
      return false;
    }
    if (!Spol) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Gender is required.'
      });
      return false;
    }
    return true;
  };
  const registerAndGoToMainFlow = async () => {
    if (!validateFields()) {
      return;
    }
 
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Lozinka
      );
      const isFirstUser = (await getDocs(query(collection(db, "users"), limit(1)))).empty;
      createProfile(response, isFirstUser ? "admin" : "user");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setBirthDate("");
      setGender("");
      goToLogin();

      // Pokaži Toast obavijest nakon uspješne registracije
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'You have successfully registered.'
      });

    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={Ime}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Prezime}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={Lozinka}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={Datum_rodjenja}
        onChangeText={setBirthDate}
        placeholder="Birth Date (DD.MM.YYYY)"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={Spol}
        onChangeText={setGender}
        placeholder="Gender"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={Telefon}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={registerAndGoToMainFlow}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  title: {
    fontSize: 24,
    color: "#2c365d",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    fontSize: 16,
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
});

export default RegisterScreen;
