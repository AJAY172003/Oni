import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordDFMScreen from './src/RecordDFMScreen'

import Home from './src/Home';
import { StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  return (
  
    <NavigationContainer>
        <StatusBar translucent barStyle="dark-content" backgroundColor={'transparent'}/>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
               <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
                <Stack.Screen
          name="record"
          component={RecordDFMScreen}
          options={{ title: 'Details' }}
        />
 

      </Stack.Navigator>
    </NavigationContainer>
  );
}