import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { collection,doc,setDoc,addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import firestore from '@react-native-firebase/firestore';
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import Toast from 'react-native-toast-message';
import { query, where, getDocs } from "firebase/firestore";

//import auth from '@react-native-firebase/auth';


const times = ["9:00", "10:00", "11:00", "12:00","13:00", "14:00", "15:00", "16:00","17:00"];
const { width } = Dimensions.get("window");

// const getDaysInMonth = () => {
//   const start = startOfMonth(new Date());
//   const end = endOfMonth(new Date());
//   return eachDayOfInterval({ start, end }).map(date => format(date, 'EEE dd'));
// };

type WomenScreenRouteProp = RouteProp<RootStackParamList, "WomenScreen">;

export const WomenScreen: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const route = useRoute<WomenScreenRouteProp>();

  useEffect(() => {
    setDaysOfMonth(getDaysInMonth());
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return unsubscribe;
  }, []);

  //Dani u mjesecu u real time
  const getDaysInMonth = () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    return eachDayOfInterval({ start, end }).map(date => format(date, 'EEE dd'));
  };
  
  
  const handleConfirm = async () => {
    if (!["hair_cut_color", "hair_cut", "hair_color"].includes(selectedService || ""))  {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Selection',
        text2: 'Please select service, day and time before confirming.'
      });
      return;
    }
// Provjera u bazi je li već postoji rezervacija za isti dan i vrijeme
    const querySnapshot = await getDocs(query(collection(db, 'bookings'),
      where('day', '==', selectedDay),
      where('time', '==', selectedTime)
    ));

    if (!querySnapshot.empty) {
      Toast.show({
        type: 'error',
        text1: 'Time Slot Already Booked',
        text2: 'Please select a different time slot.'
      });
      return;
    }
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: 'User not logged in',
        text2: 'Please log in to make a booking.'
      });
      return;
    };
    const hairStyle = route.params.hairStyle;

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
        type: 'success',
        text1: 'Booking Confirmed',
        text2: `Your booking ID is ${docRef.id}`
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while booking. Please try again.'
      });
    }
  };

  const handleDaySelection = (day: string) => {
    setSelectedDay(day);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking</Text>

      <RNPickerSelect
        onValueChange={(value) => setSelectedService(value)}
        items={[
          { label: "Hair Cut & Color", value: "hair_cut_color" },
          { label: "Hair Cut", value: "hair_cut" },
          { label: "Hair Color", value: "hair_color" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select a service...", value: null }}
      />

      <Text style={styles.subtitle}>Select Date & Time</Text>

      <ScrollView horizontal contentContainerStyle={styles.dateContainer}>
        {daysOfMonth.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => handleDaySelection(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal contentContainerStyle={styles.timeContainer}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => handleTimeSelection(time)}
          >
            <Text
              style={[
                styles.timeButtonText,
                selectedTime === time && styles.selectedTimeButtonText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.selectionSummary}>
        <Text>Selected Service: {selectedService || "None"}</Text>
        <Text>Selected Day: {selectedDay || "None"}</Text>
        <Text>Selected Time: {selectedTime || "None"}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c365d",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#2c365d",
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3b3f5c",
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: width / 5 - 20,
    alignItems: 'center',
  },
  dayButtonText: {
    fontSize: 14,
    color: "#f2f2f0",
  },
  selectedDayButton: {
    backgroundColor: "#ff5e3a",
  },
  selectedDayButtonText: {
    color: "#fff",
  },
  timeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3b3f5c",
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: width / 5 - 10,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 14,
    color: "#f2f2f0",
  },
  selectedTimeButton: {
    backgroundColor: "#ff5e3a",
  },
  selectedTimeButtonText: {
    color: "#fff",
  },
  selectionSummary: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#f2f2f0",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#272e4f",
    borderRadius: 4,
    color: "#2c365d",
    paddingRight: 30,
    marginBottom: 20,
    width: width * 0.9,
    textAlign: "center",
    backgroundColor: "#f2f2f0",
  },
});

export default WomenScreen;