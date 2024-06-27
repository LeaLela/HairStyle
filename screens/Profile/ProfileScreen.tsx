import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export const ProfileScreen : React.FC = () => {  
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const goToWomenHairstyles = () => {
    nav.navigate("WomenScreen", { hairStyle: "Women" });
  };

  const goToMenHairstyles = () => {
    nav.navigate("MenScreen", { hairStyle: "Men" });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
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
        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/my_bookings.png")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>My bookings</Text>
        </TouchableOpacity>
      </ScrollView>
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
