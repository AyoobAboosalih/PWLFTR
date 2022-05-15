// The defualt screen of the application
// User can choose to upload a video for validation
// or navigate to the help page to understand how to use the application.

import React from 'react';
import {Text, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import FilePicker from './filePicker';

function Home({navigation}) {
  const navigateToHelp = () => {
    navigation.navigate('Help');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilePicker />
      {/* <Button style={styles.button} title="Help" onPress={navigateToHelp} /> */}
      <Pressable style={styles.button} onPress={navigateToHelp}>
        <Text style={styles.text}>{'Help'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'purple',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
