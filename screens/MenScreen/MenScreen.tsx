import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { useHandleConfirm } from "../../utils/useHandleConfirm";
import { ServiceTypes, getServiceOptions } from "../../utils/serviceTypes";
import { useDateAndTime, useUserData } from "../../hooks/hooks";
import { getDisabledSlots } from "../../utils/getDisableSlots";

const { width } = Dimensions.get("window");

type MenScreenRouteProp = RouteProp<RootStackParamList, 'MenScreen'>;

export const MenScreen: React.FC = () => {

  const route = useRoute<MenScreenRouteProp>();
  const userId = useUserData();
  const { daysOfMonth, times } = useDateAndTime();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [disabledSlots, setDisabledSlots] = useState<
    { day: string; time: string }[]
  >([]);

  const handleDaySelection = (day: string) => {
    setSelectedDay(day);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = useHandleConfirm(
    selectedService,
    selectedDay,
    selectedTime,
    userId,
    route.params.hairStyle,
    db
  );

  useEffect(() => {
    const fetchDisabledSlots = async () => {
      const slots = await getDisabledSlots();
      setDisabledSlots(slots);
    };

    fetchDisabledSlots();
  }, [daysOfMonth, times]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking</Text>

      <RNPickerSelect
        onValueChange={(value) => setSelectedService(value)}
        items={getServiceOptions()}
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
        {times.map((time) => {
          const isDisabled = disabledSlots.some(
            (slot) => slot.day === selectedDay && slot.time === time
          );
          return (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedTimeButton,
                isDisabled && styles.disabledTimeButton,
              ]}
              onPress={() => !isDisabled && handleTimeSelection(time)}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  selectedTime === time && styles.selectedTimeButtonText,
                  isDisabled && styles.disabledTimeButtonText,
                ]}
              >
                {time}
            </Text>
          </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.selectionSummary}>
        <Text>
          Selected Service:
          {ServiceTypes[selectedService as keyof typeof ServiceTypes] || "None"}
        </Text>
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
    minWidth: width * 0.15,
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#f77f00",
  },
  dayButtonText: {
    color: "#fff",
    fontSize: 14,
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
    minWidth: width * 0.15,
    alignItems: "center",
  },
  selectedTimeButton: {
    backgroundColor: "#f77f00",
  },
  disabledTimeButton: {
    backgroundColor: "#b0b0b0",
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedTimeButtonText: {
    color: "#fff",
  },
  disabledTimeButtonText: {
    color: "#ddd",
  },
  selectionSummary: {
    marginVertical: 20,
  },
  confirmButton: {
    padding: 15,
    backgroundColor: "#2c365d",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});

export default MenScreen;