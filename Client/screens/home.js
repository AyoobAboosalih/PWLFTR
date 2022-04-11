import React, { useState, useCallback } from 'react'
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
      <StatusBar barStyle={'dark-content'} />
      <Text>This is Home</Text>
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection}/>
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
