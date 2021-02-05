import * as React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import MapView from 'react-native-maps';

import { View, Text } from 'react-native';

import styles from './styles';

const { PROVIDER_GOOGLE } = MapView;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false,
      userLat: -1,
      userLon: -1
    };
  }

  async componentDidMount() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const { coords } = await Location.getLastKnownPositionAsync();

    this.setState({
      showMap: true,
      userLat: coords.latitude,
      userLon: coords.longitude
    });
  }

  render() {
    const { showMap, userLat, userLon } = this.state;

    return (
      <View style={styles.mainContainer}>
        {showMap && (
          <MapView
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: userLat,
              longitude: userLon,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121
            }}
            showsUserLocation
            style={styles.mapContainer}
          />
        )}

        {!showMap && (
          <View style={styles.noLocationContainer}>
            <Text style={styles.textLocationNeeded}>
              We need your location data...
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default Home;