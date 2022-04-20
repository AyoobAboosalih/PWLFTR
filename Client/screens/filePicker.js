import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import DocumentPicker, {types} from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';

function FilePicker() {
  const [fileResponse, setFileResponse] = useState([]);

  useEffect(() => {
    if (fileResponse) {
      getVideoResponse(fileResponse);
    }
  }, [fileResponse]);

  // const handleDocumentSelection = async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       presentationStyle: 'fullScreen',
  //       type: types.video,
  //     });
  //     setFileResponse(response);
  //   } catch (error) {
  //     console.log('This is selection error' + error);
  //   }
  // };

  const handleDocumentSelection = async () => {
    try {
      ImagePicker.launchImageLibrary(
        {mediaType: 'video', includeBase64: true},
        response => {
          console.log(response);
          setFileResponse(response);
          console.log(fileResponse);
        },
      );
    } catch (error) {
      console.log('This is selection error' + error);
    }
  };

  const getVideoResponse = response => {
    const data = new FormData();
    data.append('video', {
      uri: response.uri,
      type: 'video/mp4',
      name: 'video.mp4',
    });

    if (data) {
      axios
        .post('http://localhost:5000/video', data, {
          'Content-Type': 'multipart/form-data',
        })
        .then(res => {
          console.log('this is response' + res);
        })
        .then(data => {
          console.log(data);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          throw error;
        });
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
