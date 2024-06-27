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
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const times = ["9:00", "10:00", "11:00", "12:00","13:00", "14:00", "15:00", "16:00","17:00"];
const { width } = Dimensions.get("window");

const getDaysInMonth = () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  return eachDayOfInterval({ start, end }).map(date => format(date, 'EEE dd'));
};

export const MenScreen: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

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

  const handleConfirm = async () => {
    if (!selectedService || !selectedDay || !selectedTime) {
      Alert.alert("Incomplete Selection", "Please select service, day and time before confirming.");
      return;
    }

    if (!userId) {
      Alert.alert("User not logged in", "Please log in to make a booking.");
      return;
    }

    try {
      const bookingRef = collection(db, "bookings");
      const docRef = await addDoc(bookingRef, {
        service: selectedService,
        day: selectedDay,
        time: selectedTime,
        userId: userId,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Booking Confirmed", `Your booking ID is ${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error", "Something went wrong while booking. Please try again.");
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
          { label: "Hair Cut & Shave", value: "hair_cut_shave" },
          { label: "Hair Cut", value: "hair_cut" },
          { label: "Shave", value: "shave" },
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

export default MenScreen;
