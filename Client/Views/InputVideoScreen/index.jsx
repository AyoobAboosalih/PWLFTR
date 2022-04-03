import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import testVideo from '../../test.mp4'
import { DocumentPicker, ImagePicker } from 'expo';

_pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
}


function InputVideoScreen() {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={testVideo}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <Button
            title='Select Document'
            onPress={this._pickDocument}
            />
      </View>
    )
}

export default InputVideoScreen


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


