import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchScreen = () => {
  return (
    <View>
      <Header />
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="grey"
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 16,
    marginHorizontal: 10
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'grey'
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
