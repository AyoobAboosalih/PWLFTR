import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import InputVideoScreen from './Views/InputVideoScreen';


export default function App() {
  

  return (
    <View style={styles.container}>
      <InputVideoScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
