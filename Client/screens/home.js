import React from 'react';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function Home({navigation}) {
  return (
    <View>
      <Text>This is Home</Text>
      <TouchableOpacity
        style={{backgroundColor: 'black'}}
        onPress={() => {
          navigation.navigate('Help');
        }}>
        <Text style={{color: 'white'}}>Go To Help</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
