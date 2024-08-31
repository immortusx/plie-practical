import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};
