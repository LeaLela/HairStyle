import { useCallback, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { validateSelection } from "./validations";
import { ServiceTypes } from "./serviceTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useHandleConfirm = (

  selectedService: string | null,
  selectedDay: string | null,
  selectedTime: string | null,
  userId: string | null,
  hairStyle: string | null,
  db: any
) => {
const nav = useNavigation<NativeStackNavigationProp<any>>();

  return useCallback(async () => {
    if (
      !["hair_cut_color", "hair_cut", "hair_color"].includes(
        selectedService || ""
      )
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete Selection",
        text2: "Please select service, day and time before confirming.",
      });
      return;
    }

    const querySnapshot = await getDocs(
      query(
        collection(db, "bookings"),
        where("day", "==", selectedDay),
        where("time", "==", selectedTime)
      )
    );

    if (!querySnapshot.empty) {
      Toast.show({
        type: "error",
        text1: "Time Slot Already Booked",
        text2: "Please select a different time slot.",
      });
      return;
    }

    if (!userId) {
      Toast.show({
        type: "error",
        text1: "User not logged in",
        text2: "Please log in to make a booking.",
      });
      return;
    }
    try {
      const bookingRef = collection(db, "bookings");
      const docRef = await addDoc(bookingRef, {
        hairStyle: hairStyle,
        service: selectedService,
        day: selectedDay,
        time: selectedTime,
        userId: userId,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      Toast.show({
        type: "success",
        text1: "Booking Confirmed",
        text2: `Your booking ID is ${docRef.id}`,
      });
      nav.navigate("Profile");
    } catch (e) {
      console.error("Error adding document: ", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong while booking. Please try again.",
      });
    }
  }, [selectedService, selectedDay, selectedTime, userId, hairStyle, db]);
};
