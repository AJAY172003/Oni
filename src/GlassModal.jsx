import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import {
  Canvas,
  RoundedRect,
  BackdropBlur,
  LinearGradient,
  RadialGradient,
} from '@shopify/react-native-skia';
import GlassButton from './GlassButton';

const { width, height: screenHeight } = Dimensions.get('screen');

const MODAL_WIDTH = width - 32;
const MODAL_RADIUS = 20;
const ModalHeight = screenHeight * 0.562;
export default function GlassModal({ setInfoVisible }) {
  return (
    <View style={styles.wrapper}>
      <BlurView
        style={{
          position: 'absolute',
          width: width,
          height: screenHeight,
        }}
        blurType="light"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity
        onPress={() => {
          setInfoVisible(false);
        }}
        style={{
          position: 'absolute',
          top: screenHeight * 0.14,
          left: MODAL_WIDTH - 30,
          zIndex: 10,
        }}
      >
        <GlassButton />
      </TouchableOpacity>
      <Canvas style={styles.canvas}>
        <RoundedRect
          x={0}
          y={0}
          width={MODAL_WIDTH}
          height={ModalHeight}
          r={MODAL_RADIUS}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: MODAL_WIDTH, y: ModalHeight }}
            colors={[
              'rgba(255,255,255,0.45)',
              'rgba(255,255,255,0.12)',
              'rgba(255,255,255,0.05)',
            ]}
            positions={[0, 0.4, 1]}
          />
        </RoundedRect>

        <RoundedRect
          style={'stroke'}
          x={0}
          y={0}
          width={MODAL_WIDTH}
          height={ModalHeight}
          r={MODAL_RADIUS}
          strokeWidth={2}
        >
          <RadialGradient
            c={{ x: MODAL_WIDTH / 2, y: 0 }}
            r={MODAL_WIDTH}
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.35)',
            ]}
            positions={[0, 0.65, 1]}
          />
        </RoundedRect>
      </Canvas>

      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={{
              marginRight: 10,
              marginLeft: 15,
            }}
            source={require('../images/foot.png')}
          />
          <Text style={styles.headerText}>Steps to count fetal kicks</Text>
        </View>
        <View style={styles.footer}>
          {steps.map((item, index) => (
            <View
              key={index}
              style={[styles.row, (index + 1) % 2 === 0 && styles.altRow]}
            >
              <View
                style={{
                  width: MODAL_WIDTH - 30,
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}
              >
                <Text>{index + 1}. </Text>
                <Text style={styles.text}>{renderBoldText(item)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const steps = [
  'Choose a **time** when you are **least distracted** or when you typically **feel the fetus move**.',
  '**Get comfortable.** Lie on your **left side** or sit with your feet propped up.',
  '**Place your hands** on your belly.',
  '**Start a timer** or watch the clock.',
  '**Count each kick.** Keep counting until you get to **10 kicks / flutters / swishes / rolls**.',
  '**Once you reach 10 kicks**, jot down how many **minutes** it took.',
];
const renderBoldText = text => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={index} style={{ fontWeight: '700' }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: screenHeight,

    backgroundColor: 'rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  canvas: {
    alignSelf: 'center',
    alignItems: 'center',

    justifyContent: 'center',
    height: screenHeight * 0.6,

    width: width * 0.95,
  },
  content: {
    height: screenHeight * 0.6,
    paddingTop: 6,
    position: 'absolute',
    paddingRight: 10,
    zIndex: 5,

    width: MODAL_WIDTH,
  },
  footer: {
    overflow: 'hidden',
    alignSelf: 'center',

    width: MODAL_WIDTH - 10,

    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  header: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 5,
    alignItems: 'center',
    padding: 10,
    width: MODAL_WIDTH - 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  headerIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    height: 72,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  altRow: {
    height: 72,
    backgroundColor: 'rgba(239, 239, 239, 1)',
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
});
