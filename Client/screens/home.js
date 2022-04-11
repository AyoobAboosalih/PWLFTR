import React, { useState, useCallback } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import FilePicker from './filePicker';


function Home({navigation}) {
  const [fileResponse, setFileResponse] = useState([]);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Home</Text>
      <FilePicker/>
      <TouchableOpacity
        style={{backgroundColor: 'black'}}
        onPress={() => {
          navigation.navigate('Help');
        }}>
        <Text style={{color: 'white'}}>Go To Help</Text>
      </TouchableOpacity>
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
  },
});
