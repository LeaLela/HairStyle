import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc, getDocs, query, limit } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { auth, db, provider } from "../../firebase";
import Toast from "react-native-toast-message";
import Role from "../Enums/user_role";
import { TextInputMask } from "react-native-masked-text";
import { Picker } from "@react-native-picker/picker";
import { Pressable } from 'react-native';

export const RegisterScreen: React.FC = () => {
  const [Ime, setFirstName] = useState("");
  const [Prezime, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Lozinka, setPassword] = useState("");
  const [Datum_rodjenja, setBirthDate] = useState("");
  const [Telefon, setPhoneNumber] = useState("");
  const [Spol, setGender] = useState("");

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToLogin = async () => {
    nav.navigate("Login");
  };

  const createProfile = async (user: any, role: Role) => {
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, user.uid);

    await setDoc(userDoc, {
      Ime,
      Prezime,
      Email: user.email,
      Telefon,
      Spol,
      Datum_rodjenja,
      role, 
    });

    console.log("User profile created successfully with role:", role);
  };

  const registerAndGoToMainFlow = async () => {
    if (
      !Ime ||
      !Email ||
      !Lozinka ||
      !Prezime ||
      !Telefon ||
      !Spol ||
      !Datum_rodjenja
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Lozinka
      );

      const isFirstUser = (await getDocs(query(collection(db, "users"), limit(1)))).empty;

      await createProfile(response.user, isFirstUser ? Role.Admin : Role.User);
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setBirthDate("");
      setGender("");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You have successfully registered",
      });
      goToLogin();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "Something went wrong",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isFirstUser = (await getDocs(query(collection(db, "users"), limit(1)))).empty;
      await createProfile(user, isFirstUser ? Role.Admin : Role.User);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You have successfully registered with Google",
      });
      goToLogin();
    } catch (error: any) {
      console.error("Error during Google sign-in", error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "Something went wrong",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={goToLogin}>
          <Text style={styles.headerText}>Login</Text>
        </Pressable>
        <Text style={[styles.headerText, styles.activeTab]}>Register</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
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
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD.MM.YYYY",
            }}
            value={Datum_rodjenja}
            onChangeText={setBirthDate}
            style={styles.input}
            placeholder="Birth Date (DD.MM.YYYY)"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          <Picker
            selectedValue={Spol}
            style={styles.input}
            onValueChange={(itemValue: string) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <TextInput
            style={styles.input}
            value={Telefon}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={registerAndGoToMainFlow}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
          <Image source={require("../../assets/google.png")} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Register with Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2330",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    color: "#f2f2f0",
    marginHorizontal: 15,
  },
  activeTab: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#ff5e3a",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff5e3a",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#2c365d",
    fontSize: 18,
    fontWeight: "bold",
  },
});
