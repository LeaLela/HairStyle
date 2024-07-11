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
import { db } from "../../firebase";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { useHandleConfirm } from "../../utils/useHandleConfirm";
import { getServiceOptions } from "../../utils/serviceTypes";
import { useDateAndTime, useUserData } from "../../hooks/hooks";
import { getDisabledSlots } from "../../utils/getDisableSlots";
import { isToday, parse, getHours } from "date-fns";

const { width } = Dimensions.get("window");

type WomenScreenRouteProp = RouteProp<RootStackParamList, "WomenScreen">;

export const WomenScreen: React.FC = () => {
  const route = useRoute<WomenScreenRouteProp>();
  const userId = useUserData();
  const { daysOfMonth, times } = useDateAndTime();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [disabledSlots, setDisabledSlots] = useState<{ day: string; time: string }[]>([]);

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

  const filterTimes = (times: string[], selectedDay: string | null) => {
    if (selectedDay && isToday(parse(selectedDay, "EEE dd", new Date()))) {
      const currentHour = getHours(new Date());
      return times.filter(time => {
        const [hour] = time.split(":");
        return parseInt(hour) > currentHour;
      });
    }
    return times;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment</Text>

      <Text style={styles.subtitle}>Calendar</Text>
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

      <Text style={styles.subtitle}>Available Slots</Text>
      <ScrollView horizontal contentContainerStyle={styles.timeContainer}>
        {filterTimes(times, selectedDay).map((time) => {
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

      <Text style={styles.subtitle}>Choose Services</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedService(value)}
        items={getServiceOptions()}
        style={pickerSelectStyles}
        placeholder={{ label: "Select a service...", value: null }}
        useNativeAndroidPickerStyle={false}
      />

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
    backgroundColor: "#1c2330",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#272e4f",
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3a3a3c",
    borderWidth: 1,
    minWidth: width * 0.18,
  },
  selectedDayButton: {
    backgroundColor: "#ff5e3a",
    borderColor: "#ff9500",
  },
  dayButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedDayButtonText: {
    color: "#000000",
  },
  timeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#272e4f",
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3a3a3c",
    borderWidth: 1,
    minWidth: width * 0.18,
  },
  selectedTimeButton: {
    backgroundColor: "#ff5e3a",
    borderColor: "#ff9500",
  },
  disabledTimeButton: {
    backgroundColor: "#3a3a3c",
    borderColor: "#3a3a3c",
  },
  timeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedTimeButtonText: {
    color: "#000000",
  },
  disabledTimeButtonText: {
    color: "#a0a0a0",
  },
  confirmButton: {
    padding: 15,
    backgroundColor: "#ff5e3a",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#000000",
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
    borderRadius: 12,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  viewContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 20,
  },
});