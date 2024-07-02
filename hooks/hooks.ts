import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { auth } from "../firebase";

export const useUserData = () => {
  const [userId, setUserId] = useState<string | null>(null);

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

  return userId;
};

export const useDateAndTime = () => {
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const getDaysInMonth = () => {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());
      return eachDayOfInterval({ start, end }).map((date) =>
        format(date, "EEE dd")
      );
    };

    const generateTimes = (startHour: number, endHour: number) => {
      let timeSlots = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        timeSlots.push(`${hour}:00`);
      }
      return timeSlots;
    };

    setDaysOfMonth(getDaysInMonth());
    setTimes(generateTimes(9, 17));
  }, []);

  return { daysOfMonth, times };
};
