import React, {useState, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';

function FilePicker() {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: types.video,
      });
      console.log(response);
      const data = new FormData();
      data.append('name', 'testName'); // you can append anyone.
      data.append('photo', {
        uri: response.uri,
        type: response.type,
        name: response.name,
      });

      fetch('http://192.168.1.4:3000/video', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(res => {
          console.log('this is response' + res);
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
          throw error;
        });
      setFileResponse(response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
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
