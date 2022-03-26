import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
//import video from '0.mp4'

export default function App() {
  

  return (
    <View style={styles.container}>
      <Text>Adjusting this text!!!!!</Text>
      <StatusBar style="auto" />
      <Video source={{uri: "0"}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
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
});
