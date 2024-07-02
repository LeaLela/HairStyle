
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export const getDisabledSlots = async () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const daysArray = eachDayOfInterval({ start, end }).map((date) =>
    format(date, "EEE dd")
  );

  const slots: { day: string; time: string }[] = [];

  for (const day of daysArray) {
    const querySnapshot = await getDocs(
      query(collection(db, "bookings"), where("day", "==", day))
    );

    querySnapshot.forEach((doc) => {
      slots.push({ day: doc.data().day, time: doc.data().time });
    });
  }

  return slots;
};
