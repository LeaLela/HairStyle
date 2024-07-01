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

  // const createProfile = async (response: any) => {
  //   const usersCollection = collection(db, "users");
  //   const userDoc = doc(usersCollection, response.user.email);

  //   await setDoc(userDoc, {
  //     name,
  //     lastName,
  //     phoneNumber,
  //     email,
  //   });

  //   console.log("User profile created successfully");
  // };
 const createProfile = async (response: any) => {
    const usersCollection = collection(db, "users");
    const userDoc = doc(usersCollection, response.user.uid);
  
    await setDoc(userDoc, {
      Ime,
      Prezime,
      Email,
      Telefon,
      Spol,
      Datum_rodjenja
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
    // Additional validation for email format, password length, etc. can be added here
    return true;
  };
  const registerAndGoToMainFlow = async () => {
    if (!validateFields()) {
      return;
    }
    // if (!Ime || !Email || !Lozinka || !Prezime || !Telefon || !Spol || !Datum_rodjenja) {
    //   Alert.alert("Error", "Please fill in all fields");
    //   return;
    // }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        Email,
        Lozinka
      );
      createProfile(response);
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

 
  

  // const handleRegister = async () => {
  //   if (Ime && Prezime && Email && Lozinka && Datum_rodjenja && Telefon && Spol) {
  //     await createUserWithEmailAndPassword(auth, Email, Email);
  //     alert("User registered successfully!");
  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //     setPassword("");
  //     setBirthDate("");
  //     setPhoneNumber("");
  //     setGender("");
  //     fetchUsers(); // Refresh user list after registration
  //     console.log("Test12")
  //   } else {
  //     alert("Please fill in all fields");
  //     console.log("Err")
  //   }
  //   getUsers();
  //   console.log("Success")
  // };

  // const fetchUsers = async () => {
  //   const users = await getUsers( );
  //   setUsers(users);
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

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





  //PRIJASNJI GENERIC IZGLED
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>First Name</Text>
//       <TextInput
//         style={styles.input}
//         value={Ime}
//         onChangeText={setFirstName}
//         placeholder="Enter first name"
//       />
//       <Text style={styles.label}>Last Name</Text>
//       <TextInput
//         style={styles.input}
//         value={Prezime}
//         onChangeText={setLastName}
//         placeholder="Enter last name"
//       />
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         value={Email}
//         onChangeText={setEmail}
//         placeholder="Enter email"
//         keyboardType="email-address"
//       />
//       <Text style={styles.label}>Lozinka</Text>
//       <TextInput
//         style={styles.input}
//         value={Lozinka}
//         onChangeText={setPassword} // Ažuriranje stanja lozinke
//         placeholder="Unesite lozinku"
//         secureTextEntry={true} // Skrivanje unosa lozinke
//       />
//       <Text style={styles.label}>Datum rođenja</Text>
//       <TextInput
//         style={styles.input}
//         value={Datum_rodjenja}
//         onChangeText={setBirthDate} // Ažuriranje stanja datuma rođenja
//         placeholder="DD.MM.YYYY"
//         keyboardType="numeric" // Postavljanje tipkovnice za numerički unos
//       />
//       <Text style={styles.label}>Phone Number</Text>
//       <TextInput
//         style={styles.input}
//         value={Telefon}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//         placeholder="Enter phone number"
//       />
//       <Text style={styles.label}>Gender</Text>
//       <TextInput
//         style={styles.input}
//         value={Spol}
//         onChangeText={setGender}
//         placeholder="Enter gender"
//       />
//       <Button title="Register" onPress={registerAndGoToMainFlow} />
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View>
//             <Text>
//               {item.Ime} {item.Prezime}
//             </Text>
//             <Text>{item.Email}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   padding: 20,
//   // },
//   // label: {
//   //   fontSize: 16,
//   //   marginBottom: 8,
//   // },
//   // input: {
//   //   height: 40,
//   //   borderColor: "gray",
//   //   borderWidth: 1,
//   //   marginBottom: 12,
//   //   paddingHorizontal: 8,
//   // }
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5', // Adds a light gray background color to the container
//   },
//   label: {
//     fontSize: 16,
//     color: '#333', // Dark gray color for better readability
//     marginBottom: 8,
//     fontWeight: 'bold', // Makes the label text bold
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc', // Lighter gray border color for the input
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//     borderRadius: 5, // Rounded corners for the input field
//     backgroundColor: '#fff', // White background for the input field
//   }
// });
