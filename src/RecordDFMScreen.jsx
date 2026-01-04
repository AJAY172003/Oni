import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import { insertRecord } from '../src/db';
import GlassModal from '../src/GlassModal';

const RecordDFMScreen = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRecording(false);
    } else {
   
      setIsRecording(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const handleSave = () => {
  if (seconds === 0) return;

  insertRecord(seconds);
  setSeconds(0);
  navigation.goBack();
};


  const formatTime = totalSec => {
    const m = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const playButtonSize = 72;

  return (
    <View style={styles.parent}>

    {
      infoVisible  && <GlassModal setInfoVisible ={setInfoVisible}/>
    }  
      <Image
        style={{
          resizeMode: 'cover',
          position: 'absolute',
          opacity: 0.1,
          width: '100%',
          height: '100%',
        }}
        source={require('../images/background.png')}
      />
      <View style={styles.header}>
   <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backArrow}
            source={require('../images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record DFM</Text>
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <Image
            style={styles.infoIcon}
            source={require('../images/Info.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.bubbleWrapper}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>Stop recording after</Text>
            <Text style={styles.bubbleText}>10 kicks</Text>
          </View>
          <View>
            <Image source={require('../images/polygon.png')} />
          </View>
        </View>

        <View style={styles.timerWrapper}>
          <View style={styles.timerPillOuter}>
            <View style={styles.timerPillMiddle}>
              <View style={styles.timerPillInner}>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={toggleRecording}
          activeOpacity={0.8}
          style={[
            styles.playButton,
            {
              width: playButtonSize,
              height: playButtonSize,
              borderRadius: playButtonSize / 2,
            },
          ]}
        >
          {isRecording ? (
            <View
              style={{
                width: 28,
                height: 28,
                backgroundColor: 'black',
              }}
            ></View>
          ) : (
            <View style={styles.playIcon}>
              <View style={styles.playTriangle} />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleSave}
        style={styles.saveButton} activeOpacity={0.85}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.bottomLink}>
            What if I am not getting{'\n'}enough kicks?
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default RecordDFMScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 22,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoIcon: {
    width: 32,
    height: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,

  },
  bubbleWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  bubble: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  bubbleText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  timerWrapper: {
    marginBottom: 50,
  },
  timerPillOuter: {
    padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    borderWidth: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  timerPillMiddle: {
    padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    borderWidth: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  timerPillInner: {
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 70,
    borderWidth: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FF4A4A',
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  playIcon: {
    width: '40%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderRadius: 5,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#111111',
  },
  saveButton: {
    width: '90%',
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  saveText: {
    fontSize: 18,
    fontWeight: '600',
  },
  bottomLink: {
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FF4A4A',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
