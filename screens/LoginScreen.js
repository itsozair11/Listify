import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Alert, Button, BackHandler } from 'react-native';

const LoginScreen = ({ navigation, route }) => {
  const [hasSeenLogin, setHasSeenLogin] = useState(false);

  useEffect(() => {
    async function checkIfSeen() {
      const seen = await AsyncStorage.getItem('hasSeenLogin');
      if (seen) {
        setHasSeenLogin(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    }
    checkIfSeen();
    const unsubscribe = navigation.addListener('focus', () => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    });

    return () => {
        unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleBackPress = () => {
    Alert.alert('Cannot go back', 'You are already on the Home screen', [{ text: 'OK' }]);
    return true;
  };
  const handlePress = async () => {
    await AsyncStorage.setItem('hasSeenLogin', 'true');
    setHasSeenLogin(true);
    navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
    });
  };

  if (hasSeenLogin) {
    return null;
  }

  return (
    <View style={styles.background}>
      <Text style={styles.titleFront}>Welcome to Listify!</Text>
      <View style={styles.buttonOne}>
        <Button
          title="Go to your list"
          onPress={handlePress}
        />
        <Text>Before you go... Quick Note: In order to delete tasks all you have to do is click on them!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOne: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 5,
    marginTop: 5,
  },
  titleFront: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    fontSize: 50,
    textAlign: 'center',
  },
});

export default LoginScreen;
