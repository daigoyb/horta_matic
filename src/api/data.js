import database from '@react-native-firebase/database';

function getTemperature() {
  database()
    .ref('/temperature')
    .on('value', (snapshot) => {
      console.log('Data: ', snapshot.val());
      return snapshot.val();
    });
}

function getLumem() {
  return 12;
}

export default {getTemperature, getLumem};
