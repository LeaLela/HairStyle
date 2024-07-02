import { getDocs, query, where, collection } from "firebase/firestore";

import { ServiceTypes } from "./serviceTypes";

export const validateSelection = (
  selectedService: ServiceTypes | null,
  selectedDay: string | null,
  selectedTime: string | null
) => {
  if (
    !selectedService ||
    !Object.values(ServiceTypes).includes(selectedService)
  ) {
    return "Please select a valid service.";
  }
  if (!selectedDay) {
    return "Please select a day.";
  }
  if (!selectedTime) {
    return "Please select a time.";
  }
  return null;
};

export const checkIfSlotIsBooked = async (
  db: any,
  selectedDay: string | null,
  selectedTime: string | null
) => {
  if (!selectedDay || !selectedTime) return false;

  const querySnapshot = await getDocs(
    query(
      collection(db, "bookings"),
      where("day", "==", selectedDay),
      where("time", "==", selectedTime)
    )
  );

  return !querySnapshot.empty;
};
