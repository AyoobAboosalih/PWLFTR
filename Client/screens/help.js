import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>How to Use</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`\u2022 You need to take a front facing video of yourself preforming a powerlifting squat`}</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`\u2022 Crop the video to the start and end of the movement`}</Text>
      <Text
        style={
          styles.bulletpoints
        }>{`\u2022 Input the video by clicking the "Select 📑" button on the home page`}</Text>
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
    textDecorationLine: 'underline',
  },

  bulletpoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
});
