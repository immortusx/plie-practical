import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EventDetailCard = ({ event, onClose }) => {
  const handleOpenURL = () => {
    Linking.openURL(event.event_url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: event.event_profile_img }} style={styles.image} />
       <View style={{paddingHorizontal: 10}}>
       <Text style={styles.title}>{event.event_name}</Text>
        <Text style={styles.date}>{event.readable_from_date}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.location}>
          {event.city}, {event.country}
        </Text>
        <View style={styles.tagsContainer}>
          {event.danceStyles.map((style) => (
            <View key={style.ds_id} style={styles.tag}>
              <Text style={styles.tagText}>{style.ds_name}</Text>
            </View>
          ))}
        </View>
       </View>
       <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Icon name="chevron-left" size={24} color="#fff" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton} onPress={handleOpenURL}>
              <Text style={styles.moreButtonText}>More Details</Text>
            </TouchableOpacity>
          </View> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: '100%'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 20,
    width: '100%',
    zIndex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  moreButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetailCard;