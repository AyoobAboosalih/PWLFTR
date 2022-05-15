// Help page of the appplication
// It's give a brief documentation on how to use the application.

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>How to Use</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`1) You need to take a front facing video of yourself preforming a powerlifting squat`}</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`2) Crop the video to the start and end of the movement`}</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`3) Input the video by clicking the "Select 📑" button on the home page`}</Text>
    </View>
  );
}

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingTop: 40,
    paddingRight: 10,
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  bulletpoints: {
    fontFamily: 'Cochin',
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
});
