import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserData = async (user: any) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('@user_data', jsonValue);
  } catch (e) {
    console.error('Error saving user data', e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading user data', e);
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@user_data');
  } catch (e) {
    console.error('Error removing user data', e);
  }
};






