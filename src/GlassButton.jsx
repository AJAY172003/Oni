import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Canvas,
  Circle,
  Group,

  LinearGradient,
} from '@shopify/react-native-skia';


const SIZE = 44;
const R = SIZE / 2;

export default function GlassButton() {
  return (
    <View style={styles.container}>
      <Canvas  style={{ width: SIZE, height: SIZE }}>

        <Group 
         layer
        >
      
          <Circle
  
          antiAlias={false}
          cx={R} cy={R} r={Math.floor(R) }>
           <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: SIZE, y: SIZE }}
              colors={[
                'rgba(255,255,255,0.35)',
                'rgba(255,255,255,0.35)',
                'rgba(255,255,255,0.85)',
              ]}
                    positions={[0, 0.6, 1]}
            />
          </Circle>


          <Circle
            antiAlias={false}
            cx={Math.floor(R)} 
            cy={Math.floor(R)}
     
            r={R - (1/2 + 0.5)}
     
            style="stroke"
            strokeWidth={1}
            x={0.5}  
            y={0.5}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: SIZE, y: SIZE }}
              colors={[
                'rgba(255,255,255,0.85)',
                'rgba(255,255,255,0.0)',
                'rgba(255,255,255,0.85)',
              ]}
            />
          </Circle>
        </Group>
      </Canvas>

<Image  style={
  styles.icon
}
source={require('../images/cross.png')}
/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
borderRadius: SIZE / 2,
    backgroundColor:'rgba(0,0,0,0.11)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
  },
});

