import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../utils/getUserData';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data || {
        usr_profile_img: null,
        usr_fname: 'Guest',
        usr_lname: 'User',
        usr_username: 'guest',
        usr_email: 'guest@example.com',
        role: 'Guest',
        usr_status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      });
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
        {userData.usr_profile_img ? (
            <Image
              source={{ uri: userData.usr_profile_img }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.iconContainer}>
              <Icon name="user-circle" size={130} color="#00796b" />
            </View>
          )}
          <Text style={styles.name}>{userData.usr_fname} {userData.usr_lname}</Text>
          <Text style={styles.username}>@{userData.usr_username}</Text>
          <Text style={styles.email}>{userData.usr_email}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailTitle}>User Details:</Text>
            <Text style={styles.detail}>Role: {userData.role}</Text>
            <Text style={styles.detail}>Account Status: {userData.usr_status === 1 ? 'Active' : 'Inactive'}</Text>
            <Text style={styles.detail}>Created At: {new Date(userData.created_at).toLocaleDateString()}</Text>
            <Text style={styles.detail}>Updated At: {new Date(userData.updated_at).toLocaleDateString()}</Text>
          </View>

          <Button title="Logout" onPress={handleLogout} color="#d9534f" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  profileContainer: {
    height: "100%",
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    borderColor: '#e0e0e0',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'grey',
    marginBottom: 20,
    backgroundColor: '#e0f2f1',
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginHorizontal: 2,
    color: '#00796b',
  },
  username: {
    fontSize: 20,
    color: '#004d40',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#004d40',
    marginBottom: 25,
  },
  detailsContainer: {
    width: width - 40,
    borderTopWidth: 2,
    borderTopColor: '#00796b',
    paddingTop: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 20,
    color: '#00796b',
  },
});