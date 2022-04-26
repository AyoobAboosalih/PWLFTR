import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  StatusBar,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

function FilePicker() {
  const [fileResponse, setFileResponse] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (fileResponse) {
      getVideoResponse(fileResponse);
    }
  }, [fileResponse]);

  const handleDocumentSelection = async () => {
    try {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'video',
        },
        res => {
          if (res) {
            setFileResponse(res.assets[0]);
          }
        },
      );
    } catch (error) {
      console.log('This is selection error' + error);
    }
  };

  const getVideoResponse = async response => {
    let formData = new FormData();
    formData.append('videoFile', {
      name: response?.type?.substr(6),
      type: response?.type,
      uri:
        Platform.OS !== 'android' ? 'file://' + response?.uri : response?.uri,
    });

    try {
      setisLoading(true);
      setResult(null);
      let response = await fetch(`http://localhost:5000/processvideo`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      let result = await response.text();
      setResult(result);
      setisLoading(false);
    } catch (error) {
      console.log('error : ' + error);
      return error;
    }
  };

  const SquatResult = () => {
    if (result) {
      return (
        <Text style={styles.resultText}>{`Squat result is: ${result}`}</Text>
      );
    }
    return <Text></Text>;
  };

  const DisplayVideo = () => {
    if (fileResponse) {
      return (
        <Video
          source={{uri: fileResponse?.uri}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
      );
    }
    return <Text></Text>;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.resultText}>{`Squat result is: ${result}`}</Text> */}
      <DisplayVideo />
      <Pressable style={styles.button} onPress={handleDocumentSelection}>
        <Text style={styles.text}>{'Select 📑'}</Text>
      </Pressable>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        animating={isLoading}
      />
      <SquatResult />
    </View>
  );
}

export default FilePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: '#2196f3',
    margin: 10,
  },
  text: {
    fontSize: 24,
    lineHeight: 25,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  resultText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
