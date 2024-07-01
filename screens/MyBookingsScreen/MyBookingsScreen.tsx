// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Toast from 'react-native-toast-message';

// interface Booking {
//   id: string;
//   date: string;
//   time: string;
//   type: string;
// }

// export const MyBookingsScreen: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const user = auth().currentUser;

//   useEffect(() => {
//     if (user) {
//       fetchBookings(user.uid);
//     }
//   }, [user]);

//   const fetchBookings = async (uid: string) => {
//     try {
//       const q = firestore().collection('bookings').where('userId', '==', uid);
//       const querySnapshot = await q.get();
//       const fetchedBookings: Booking[] = [];
//       querySnapshot.forEach((doc) => {
//         fetchedBookings.push({ id: doc.id, ...doc.data() } as Booking);
//       });
//       setBookings(fetchedBookings);
//     } catch (e) {
//       console.error("Error fetching bookings: ", e);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Something went wrong while fetching your bookings. Please try again.'
//       });
//     }
//   };

//   const handleCancelReservation = async (bookingId: string) => {
//     try {
//       await firestore().collection('bookings').doc(bookingId).delete();
//       setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
//       Alert.alert('Reservation cancelled');
//     } catch (error) {
//       console.error("Error cancelling reservation: ", error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Something went wrong while cancelling your reservation. Please try again.'
//       });
//     }
//   };

//   const renderItem = ({ item }: { item: Booking }) => (
//     <View style={styles.bookingItem}>
//       <Text style={styles.bookingText}>Date: {item.date}</Text>
//       <Text style={styles.bookingText}>Time: {item.time}</Text>
//       <Text style={styles.bookingText}>Type: {item.type}</Text>
//       <Button
//         title="Cancel Reservation"
//         onPress={() => handleCancelReservation(item.id)}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Bookings</Text>
//       <FlatList
//         data={bookings}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f0',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     color: '#2c365d',
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   bookingItem: {
//     backgroundColor: '#272e4f',
//     padding: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//   },
//   bookingText: {
//     fontSize: 18,
//     color: '#ffffff',
//   },
// });

// export default MyBookingsScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Toast from "react-native-toast-message";


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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <ScrollView contentContainerStyle={styles.bookingsContainer}>
        {bookings.length === 0 ? (
          <Text style={styles.noBookingsText}>You have no bookings.</Text>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>Service: {booking.service}</Text>
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
    backgroundColor: "#f2f2f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c365d",
    textAlign: "center",
    marginBottom: 20,
  },
  bookingsContainer: {
    flexGrow: 1,
  },
  noBookingsText: {
    fontSize: 18,
    color: "#2c365d",
    textAlign: "center",
    marginTop: 20,
  },
  bookingItem: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bookingText: {
    fontSize: 16,
    color: "#2c365d",
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

export default MyBookingsScreen;








