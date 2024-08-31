import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {getUserData} from '../utils/getUserData';

const Header = () => {
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUsername(userData.usr_username);
      }else{
        setUsername('Guest')
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello {username}!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
