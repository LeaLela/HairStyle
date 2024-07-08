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
import { onAuthStateChanged } from "firebase/auth";
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
      <Text style={styles.headerText}>Services</Text>
      {user ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <TouchableOpacity style={styles.card} onPress={goToWomenHairstyles}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/women_hairstyles.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Women Hairstyles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMenHairstyles}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/men_hairstyles.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Men Hairstyles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={goToMyBookings}>
            <View style={styles.cardInner}>
              <Image
                source={require("../../assets/my_bookings.png")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>My Bookings</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2330",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f2f2f0",
    marginVertical: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#F2AA4C",
    textAlign: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#272e4f",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f2f2f0",
  },
});