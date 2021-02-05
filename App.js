import * as React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';

import Home from './src/screens/Home/Home';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});