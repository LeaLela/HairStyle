import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { getAuth } from "firebase/auth";

export const HomePage: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToRegistration = () => {
    nav.push("Register");
  };
  const goToLogin = async () => {
    nav.navigate("Login");
  };

  // const user = getAuth().currentUser;
  // console.log(user?.phoneNumber);
  // useEffect(() => {
  //   if (user) {
  //     nav.navigate("Home");
  //   }
  // }),
  //   [user];

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
        <Text style={styles.textTwo}>
          Hair Style Studio Calendar
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToRegistration}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginButtonText}> Login</Text>
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
    opacity: 0.4, // Prozirnost za efektan izgled
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f2f2f0", // Tamna pozadina za moderan izgled
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
//  PRIJAŠNJI GENERIC IZGLED 
//return (
//     <>
//       <View style={styles.container}>
//         <Image
//           source={require("../../assets/favicon.png")}
//           style={styles.globe}
//         />
//         <View
//           style={{
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//             alignContent: "center",
//             display: "flex",
//             flex: 1,
//           }}
//         >
//           <Image
//             source={require("../../assets/favicon.png")}
//             style={styles.gsLogo}
//           />
//         </View>

//         <View style={styles.welcomeText}>
//           <Text style={{ color: "white" }}>Dobrodosli u naš frizerski salon!</Text>
//         </View>
//         <View
//           style={{
//             gap: 10,
//             flex: 1,
//             padding: 20,
//           }}
//         >
//           <Text style={styles.textTwo}>
//             How to start development with react native!
//           </Text>
//           <View style={styles.buttonContainer}>
//             <Button title="Sign Up" onPress={goToRegistration} />
//             <Text style={{ color: "white", textAlign: "center" }}>
//               Alredy have an account?
//               <Button title="Login" onPress={goToLogin} />
//             </Text>
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   globe: {
//     display: "flex",
//     opacity: 0.8,  // Blaga prozirnost za vizuelni efekat
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 50, 100, 0.5)', // Plava poluprozirna pozadina
//     zIndex: -1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#282c34", // Moderan tamno sivi ton
//   },
//   gsLogo: {
//     width: 180,
//     height: 110,
//     resizeMode: "contain",
//     marginBottom: 30,  // Dodatni razmak za vizuelni odmor
//   },
//   welcomeText: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 25,
//   },
//   textTwo: {
//     fontSize: 24,
//     color: "white",
//     backgroundColor: '#444',
//     padding: 12,
//     borderRadius: 8,
//     textAlign: "center",
//     marginHorizontal: 50,  // Horizontalni razmak za bolje centriranje
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: "space-evenly",
//     alignItems: 'center',
//     marginTop: 20,
//   }
// });
export default HomePage;
