
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Toast from "react-native-toast-message";
import { ServiceTypes } from "../../utils/serviceTypes";
import { ServiceTypesMen } from "../../utils/serviceTypesMen";


const { width } = Dimensions.get("window");

export const MyBookingsScreen: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchBookings(user.uid);
      } else {
        setUserId(null);
        setBookings([]);
      }
    });

    return unsubscribe;
  }, []);

  const fetchBookings = async (uid: string) => {
    try {
      const q = query(collection(db, "bookings"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const fetchedBookings: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedBookings.push({ id: doc.id, ...doc.data() });
      });
      setBookings(fetchedBookings);
    } catch (e) {
      console.error("Error fetching bookings: ", e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while fetching your bookings. Please try again.'
      });
    }
  };
 

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      Toast.show({
        type: 'success',
        text1: 'Booking Cancelled',
        text2: 'Your booking has been cancelled.'
      });
    } catch (e) {
      console.error("Error cancelling booking: ", e);
      Toast.show({
        type: 'success',
        text1: 'Booking Cancelled',
        text2: 'Your booking has been cancelled.'
      });
    }
  };
  const getServiceDisplayName = (serviceKey: string) => {
    return ServiceTypes[serviceKey as keyof typeof ServiceTypes] || ServiceTypesMen[serviceKey as keyof typeof ServiceTypesMen] || serviceKey;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <ScrollView contentContainerStyle={styles.bookingsContainer}>
        {bookings.length === 0 ? (
          <Text style={styles.noBookingsText}>You have no bookings.</Text>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>Service: {getServiceDisplayName(booking.service)}</Text>
              <Text style={styles.bookingText}>Day: {booking.day}</Text>
              <Text style={styles.bookingText}>Time: {booking.time}</Text>
              <Text style={styles.bookingText}>Hair Style: {booking.hairStyle}</Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelBooking(booking.id)}
              >
                <Text style={styles.cancelButtonText}>Cancel Booking</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
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
    color: "#f2f2f0",
    textAlign: "center",
    marginBottom: 20,
  },
  bookingsContainer: {
    flexGrow: 1,
  },
  noBookingsText: {
    fontSize: 18,
    color: "#f2f2f0",
    textAlign: "center",
    marginTop: 20,
  },
  bookingItem: {
    backgroundColor: "#272e4f",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bookingText: {
    fontSize: 16,
    color: "#f2f2f0",
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "#ff5e3a",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#f2f2f0",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});