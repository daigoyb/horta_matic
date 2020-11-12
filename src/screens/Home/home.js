import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Home = () => {
  function getTemperature() {
    database()
      .ref('/temperature')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log('Data_temp: ', snapshot.val());
          setTemperature(snapshot.val());
        }
      });
  }

  function getLumen() {
    database()
      .ref('/lumen')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log('Data_lumen: ', snapshot.val());
          setLumen(snapshot.val());
        }
      });
  }

  const [temperature, setTemperature] = useState(0);
  const [lumen, setLumen] = useState(0);
  const [initTime, setInitTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date(1598051730000));

  // temperatura
  useEffect(() => {
    let mounted = true;
    getTemperature();
    return () => (mounted = false);
  }, []);

  //lumen
  useEffect(() => {
    let mounted = true;
    getLumen();
    return () => (mounted = false);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>Data</Text>
      <View style={styles.dataContainer}>
        <Icon name="thermometer" size={50} color="#7D4F56" />
        <Text style={styles.DataText}>{temperature} ⁰C</Text>
      </View>
      <View style={styles.dataContainer}>
        <Icon name="water-outline" size={50} color="#7D4F56" />
        <Text style={styles.DataText}>50 %</Text>
      </View>
      <View style={styles.dataContainer}>
        <Icon name="sunny-outline" size={50} color="#7D4F56" />
        <Text style={styles.DataText}>{lumen} lm</Text>
      </View>
      <View style={styles.dataContainer}>
        <Icon name="flower-outline" size={50} color="#7D4F56" />
        <Text style={styles.DataText}>80 %</Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 36,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#7D4F56',
    paddingTop: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#C6D2A7',
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
  },
  DataText: {
    color: '#7D4F56',
    paddingTop: 10,
    fontSize: 24,
    marginLeft: 20,
  },
});

export default Home;
