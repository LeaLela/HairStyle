import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { collection, query, getDocs, deleteDoc, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

interface Reservation {
  id: string;
  service: string;
  day: string;
  time: string;
  hairStyle: string;
  userId: string;
}

export const AdminScreen: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const q = query(collection(db, "bookings"));
        const querySnapshot = await getDocs(q);
        const fetchedReservations: Reservation[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReservations.push({ id: doc.id, ...doc.data() } as Reservation);
        });
        setReservations(fetchedReservations);
      } catch (e) {
        console.error("Error fetching reservations: ", e);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong while fetching reservations. Please try again.'
        });
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", reservationId));
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Reservation deleted successfully',
      });
    } catch (e) {
      console.error("Error deleting reservation: ", e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while deleting the reservation. Please try again.'
      });
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail) {
      Alert.alert('Error', 'Please enter an email');
      return;
    }

    try {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(query(usersCollection, where("email", "==", newAdminEmail)));
      const userDoc = userSnapshot.docs[0];

      if (userDoc) {
        await updateDoc(doc(db, 'users', userDoc.id), { role: 'admin' });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: `User ${newAdminEmail} is now an admin`,
        });
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <Text style={styles.subtitle}>Reservations</Text>
      <ScrollView contentContainerStyle={styles.bookingsContainer}>
        {reservations.length === 0 ? (
          <Text style={styles.noBookingsText}>No reservations available.</Text>
        ) : (
          reservations.map((reservation) => (
            <View key={reservation.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>Service: {reservation.service}</Text>
              <Text style={styles.bookingText}>Day: {reservation.day}</Text>
              <Text style={styles.bookingText}>Time: {reservation.time}</Text>
              <Text style={styles.bookingText}>Hair Style: {reservation.hairStyle}</Text>
              <Text style={styles.bookingText}>User ID: {reservation.userId}</Text>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleDeleteReservation(reservation.id)}
              >
                <Text style={styles.cancelButtonText}>Delete Reservation</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <Text style={styles.subtitle}>Add New Admin</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter user email"
        value={newAdminEmail}
        onChangeText={setNewAdminEmail}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAdmin}>
        <Text style={styles.addButtonText}>Add Admin</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c365d',
    marginBottom: 10,
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
  input: {
    borderBottomWidth: 1,
    height: 50,
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#2c365d',
  },
  addButton: {
    backgroundColor: "#2c365d",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#f2f2f0",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AdminScreen;