import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';


const {Marker} = MapView;
import _ from 'lodash';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location)
  }

  let mapLocation = undefined;

  if (location) {
    mapLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 100,
      longitudeDelta: 100
    }
  }

  const renderSites = () => {

    const sites = [
      {
          id: 1,
          title: 'Twin Lakes Hidden Spot',
          description: 'Beautiful view of Twin Lakes off this hidden forest road.',
          coordinate: {
              longitude: 37.4056,
              latitude: -122.0775
          }
      },
      {
          id: 2,
          title: 'Lily Lake',
          description: 'Nice view of the lilypads in this secluded spot, but a pretty tough road to reach it.',
          coordinate: {
              longitude: -106.368051,
              latitude: 39.351661
          }
      },
      {
          id: 3,
          title: 'Slide Lake',
          description: 'Pretty riverside camping, but a REALLY nasty road to get there.',
          coordinate: {
              longitude: -106.389204,
              latitude: 39.372171
          }
      }
  ];
      const renderedSites = _.map(sites, site => {
          const {title, description, coordinate, id} = site;

          return (
              <Marker
                  key={id}
                  title={title}
                  description={description}
                  coordinate={coordinate}
              />
          );
      });

      return renderedSites;
  };

  const renderMap = () => {
    return (
        <MapView
            style={styles.map}
            initialRegion={mapLocation}
            rotateEnabled={false}
        >

          {renderSites()}

        </MapView>
    )
  };

  return (
    <View style={styles.container}>
      {renderMap()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    color: '#888', 
    fontSize: 45
  },
  button: {
    backgroundColor: '#444', 
    padding: 5,
    margin: 3
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});
