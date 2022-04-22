import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

function FilePicker() {
  const [fileResponse, setFileResponse] = useState(null);

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
            console.log(res);
            setFileResponse(res.assets[0]);
          }
        },
      );
    } catch (error) {
      console.log('This is selection error' + error);
    }
  };

  const getVideoResponse = response => {
    let formData = new FormData();
    formData.append('videoFile', {
      name: response?.type?.substr(6),
      type: response?.type,
      uri:
        Platform.OS !== 'android' ? 'file://' + response?.uri : response?.uri,
    });

    console.log(response?.type?.substr(6));

    try {
      fetch(`http://localhost:5000/processing`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
    } catch (error) {
      console.log('error : ' + error);
      return error;
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      {/* {(fileResponse || []).map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))} */}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    </SafeAreaView>
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

  uri: {
    paddingBottom: 8,
    paddingHorizontal: 18,
  },
});
