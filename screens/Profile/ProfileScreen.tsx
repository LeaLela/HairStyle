import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase";
import { saveUserData, getUserData } from "../../utils/storageUtils";

export const ProfileScreen: React.FC = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await getUserData();
      if (savedUser) {
        setUser(savedUser);
      } else {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
            saveUserData(firebaseUser);
          }
        });
      }
    };

    checkUser();
  }, []);

  const goToWomenHairstyles = async () => {
    nav.navigate("WomenScreen", { hairStyle: "Women" });
  };
  const goToMenHairstyles = async () => {
    nav.navigate("MenScreen", { hairStyle: "Men" });
  };
  const goToMyBookings = async () => {
    nav.navigate("MyBookings");
  };

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text>Welcome, {user.email}!</Text>
          <TouchableOpacity style={styles.card} onPress={goToWomenHairstyles}>
            <Image
              source={require("../../assets/women_hairstyles.png")}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Women hairstyles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMenHairstyles}>
            <Image
              source={require("../../assets/men_hairstyles.png")}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>Men hairstyles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMyBookings}>
            <Image
              source={require("../../assets/my_bookings.png")}
              style={styles.image}
            />
            <Text style={styles.cardTitle}>My bookings</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f0",
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  card: {
    width: 250,
    height: 300,
    margin: 10,
    backgroundColor: "#e43a19",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;