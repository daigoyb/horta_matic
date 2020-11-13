import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

  function getLight() {
    database()
      .ref('/light')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val() === 'Ligado') {
            setIsLightOn({
              lightText: 'Ligado',
              iconType: 'bulb',
            });
          } else {
            setIsLightOn({
              lightText: 'Desligado',
              iconType: 'bulb-outline',
            });
          }
        }
      });
  }

  function setLightOn() {
    database()
      .ref('/light')
      .set('Ligado')
      .then(console.log('Light set - Ligado'));
  }

  function setLightOff() {
    database()
      .ref('/light')
      .set('Desligado')
      .then(console.log('Light set - Desligado'));
  }

  const [temperature, setTemperature] = useState(0);
  const [lumen, setLumen] = useState(0);
  // const [initTime, setInitTime] = useState(new Date().getTime());
  // const [endTime, setEndTime] = useState(new Date().getTime());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLightOn, setIsLightOn] = useState({
    lightText: 'Ligado',
    iconType: 'bulb',
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const handleLightClick = () => {
    if (isLightOn.lightText === 'Ligado' && isLightOn.iconType === 'bulb') {
      setIsLightOn({
        lightText: 'Desligado',
        iconType: 'bulb-outline',
      });
      setLightOff();
    } else {
      setIsLightOn({
        lightText: 'Ligado',
        iconType: 'bulb',
      });
      setLightOn();
    }
  };

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

  //light
  useEffect(() => {
    let mounted = true;
    getLight();
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
      <View style={styles.lightBtnContainer}>
        <TouchableOpacity style={styles.lightBtn} onPress={handleLightClick}>
          <Text>{isLightOn.lightText}</Text>
          <Icon name={isLightOn.iconType} size={35} color="#7D4F56" />
        </TouchableOpacity>
      </View>
      <View style={styles.timeContainer}>
        <TouchableOpacity style={styles.timeBtn} onPress={showDatePicker}>
          <Text>Início</Text>
          <Icon name="alarm-outline" size={35} color="#7D4F56" />
          {/* <Text>{initTime}</Text> */}
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity style={styles.timeBtn} onPress={showDatePicker}>
          <Text>Fim</Text>
          <Icon name="alarm" size={35} color="#7D4F56" />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
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
  timeContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  lightBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  lightBtn: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    borderRadius: 50,
    width: 150,
  },
  timeBtn: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    borderRadius: 50,
    width: 100,
    height: 80,
  },
});

export default Home;
