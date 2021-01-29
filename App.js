import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
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
