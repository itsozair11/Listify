import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = ({ navigation }) => {
  // To get the value from the TextInput
  const [textInputValue, setTextInputValue] = useState('');
  // To get the value from AsyncStorage
  const [savedValues, setSavedValues] = useState([]);


  const saveValueFunction = async () => {
    // Function to save the value in AsyncStorage
    if (textInputValue) {
      try {
        const values = await AsyncStorage.getItem('any_key_here');
        let savedValuesArray = values ? JSON.parse(values) : [];
        savedValuesArray.push(textInputValue);
        await AsyncStorage.setItem('any_key_here', JSON.stringify(savedValuesArray));
        setSavedValues(savedValuesArray);
        setTextInputValue('');
        alert('Task has been saved!');
      } catch (error) {
        console.log(error);
        alert('Tasks could not be loaded! Reload the app');
      }
    } else {
      alert('Please write a task');
    }
  };

  const deleteValueFunction = async (value) => {
    try {
      const values = await AsyncStorage.getItem('any_key_here');
      let savedValuesArray = values ? JSON.parse(values) : [];
      const updatedValuesArray = savedValuesArray.filter(item => item !== value);
      await AsyncStorage.setItem('any_key_here', JSON.stringify(updatedValuesArray));
      setSavedValues(updatedValuesArray);
    } catch (error) {
      console.log(error);
    }
  };


  const getValueFunction = async (value) => {
      try {
        const values = await AsyncStorage.getItem('any_key_here');
        let savedValuesArray = values ? JSON.parse(values) : [];
        setSavedValues(savedValuesArray);
      } catch (error) {
        console.log(error);
      }
  };

  getValueFunction();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          My To Do List
        </Text>
        <TextInput
          placeholder="Enter What You Need To Do"
          value={textInputValue}
          onChangeText={(data) => setTextInputValue(data)}
          underlineColorAndroid="transparent"
          style={styles.textInputStyle}
        />
        <TouchableOpacity
          onPress={saveValueFunction}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>SAVE TASK'S</Text>
        </TouchableOpacity>
        {savedValues.map((value, index) => (
          <View key={index} style={styles.listContainer}>
            <TouchableOpacity
              onPress={() => deleteValueFunction(value)}
              style={styles.deleteButton}
            >
              <Text style={styles.textStyle}>{value}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'pink',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 2,
    borderColor: 'pink',
  },
  listContainer: {
    borderColor: 'black',
    borderStyle: 'dashed',
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 2.5,
  }
});

export default App;