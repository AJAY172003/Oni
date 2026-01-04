import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  FlatList,

  Dimensions,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { initDB, fetchRecords, formatDateLabel } from './db';

const { width, height: screenHeight } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    initDB();
    loadRecords();
  }, []);
useFocusEffect(
  React.useCallback(() => {
loadRecords();


  }, [])
);
  const loadRecords = () => {
    const data = fetchRecords();
    console.log(data._array);
    setRecords(data._array);
  };

  const formatTime = totalSec => {
    const m = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DFM (Kick counter)</Text>

        <View style={styles.counter}>
          <Image
            source={require('../images/baby.png')}
            style={styles.counterIcon}
          />
          <Text style={styles.counterText}>0</Text>
        </View>
      </View>

      <ImageBackground
        source={require('../images/mother.png')}
        blurRadius={1.5}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <LinearGradient
          style={{
            position: 'absolute',
            width: '100%',
            top: 0,
            height: '100%',
          }}
          colors={[
            'rgba(217, 217, 217, 0.9))',
            'transparent',
            'rgba(103, 103, 103, 1)',
          ]}
        />

        <View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            width: '100%',

            height: '100%',
            overflow: 'hidden',
            zIndex: 1,
          }}
        ></View>

        <View style={styles.overlay}>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Image
              source={require('../images/leap.png')}
              style={{ width: 48, height: 24, marginBottom: 8 }}
            />
            <Text style={styles.articleText}>Articles</Text>
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Image
              height={13}
              width={9}
              source={require('../images/bookmark.png')}
            />
            <Text style={styles.saveText}> Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <TouchableOpacity
        onPress={() => navigation.navigate('record')}
        style={styles.recordBtn}
      >
        <Text style={styles.recordText}>Record fetal movement</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Past records</Text>

      <FlatList
        data={records}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.recordCard}>
            <Text style={styles.recordDate}>
              {formatDateLabel(item.recordedAt)}
            </Text>
            <Text style={styles.recordTime}> {formatTime(item.duration)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    paddingTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 30,
    width: '80%',
    marginVertical: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  counterIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },

  counterText: {
    fontSize: 16,
    fontWeight: '600',
  },

  card: {
    width: width - 32,
    position: 'relative',
    height: 181,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },

  cardImage: {
    borderRadius: 20,
  },

  overlay: {
    position: 'absolute',
    padding: 16,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    zIndex: 10,

    justifyContent: 'space-between',
  },

  articleText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
  },

  saveBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,

    paddingVertical: 6,
    gap: 5,
    borderRadius: 20,
  },

  saveText: {
    fontWeight: '600',
  },

  recordBtn: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
  },

  recordText: {
    fontSize: 16,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  recordCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },

  recordDate: {
    fontSize: 15,
    fontWeight: '500',
  },

  recordTime: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Home;
