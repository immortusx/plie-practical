import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventDetailCard from '../components/EventDetailCard';

const FavouritesScreen = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEvents = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/events-listing',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        const favoriteEvents = data.data.events.filter(event => event.isFavorite === 1);
        if (favoriteEvents.length > 0) {
            setEvents(favoriteEvents);
          } else {
            setEvents([]);
          }
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleFavorite = eventId => {
    setEvents(
      events.map(event =>
        event.event_id === eventId
          ? { ...event, isFavorite: event.isFavorite ? 0 : 1 }
          : event,
      ),
    );
  };

  const shareEvent = async eventUrl => {
    try {
      await Share.share({
        message: `Check out this event: ${eventUrl}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleOpenDetails = event => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseDetails = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventContainer}>
      <Image source={{ uri: item.event_profile_img }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.event_name}</Text>
        <Text style={styles.eventDate}>{item.readable_from_date}</Text>
        <View style={styles.eventMeta}>
          <Text style={styles.eventLocation}>
            {item.city}, {item.country}
          </Text>
          <Text style={styles.eventPrice}>
            {item.event_price_from === 0 && item.event_price_to === 0
              ? 'Free'
              : `€${item.event_price_from} - €${item.event_price_to}`}
          </Text>
        </View>
        <View style={styles.eventTags}>
          {item.danceStyles.map(style => (
            <View key={style.ds_id} style={styles.tag}>
              <Text style={styles.tagText}>{style.ds_name}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.rightArrow}
        onPress={() => handleOpenDetails(item)}>
        <Icon name="arrow-right" size={20} color="#333" />
      </TouchableOpacity>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => shareEvent(item.event_url)}>
          <Icon name="share" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.event_id)}>
          <Icon
            name={item.isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={item.isFavorite ? '#ff4081' : '#333'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNoFavorites = () => (
    <View style={styles.noFavoritesContainer}>
        <Icon
            name={'heart-o'}
            size={64}
            color={'#333'}
          />
      <Text style={styles.noFavoritesText}>No Favourites Available</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      {events.length === 0 ? (
        renderNoFavorites()
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.event_date_id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
      {selectedEvent && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <EventDetailCard event={selectedEvent} onClose={handleCloseDetails} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 2,
    position: 'relative',
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 10,
  },
  eventTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  eventPrice: {
    fontSize: 14,
    color: '#666',
  },
  eventTags: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  eventActions: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
    right: 10,
  },
  rightArrow: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#666',
  },
});

export default FavouritesScreen;