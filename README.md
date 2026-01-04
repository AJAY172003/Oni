🚀 Prerequisites

***This project does not uses expo.***

Make sure you have the following installed on your system:

Node.js (LTS recommended)

npm or yarn

Java JDK 17 (recommended for React Native)

Android Studio

Android SDK

VS Code (optional but recommended)

🔧 Environment Setup

Follow This Guide to setup React Native Environemnt.
https://reactnative.dev/docs/set-up-your-environment

Node version tested on:- v23.10.0
📦 Clone the repo && Install Dependencies using npm install.

▶️ Then ,Run the App on Android using "npm run android".


📁 **Project Structure **
```
├── App.jsx
├── Gemfile
├── README.md
├── __tests__
├── android
├── app.json
├── babel.config.js
├── images
├── index.js
├── ios
├── jest.config.js
├── metro.config.js
├── node_modules
├── package-lock.json
├── package.json
├── src
├── tree.txt
└── tsconfig.json
```


⭐️ Dependencies Used

@react-native-community/blur

@react-navigation/native-stack

@shopify/react-native-skia

react-native-linear-gradient

react-native-nitro-modules

react-native-nitro-sqlite

react-native-safe-area-context

react-native-screens

⭐️ I have used raect-native-nitro-sqlite for storing the data locally and stored each record in form of object entity  with fields 
{
id,
recordedAt,
duration
}
sorting is based on the time of creation.
I have assumed that data can be deleted and app can have upto Thousands of past records ,thats'why uses sqlite locally and sorting is done at time of insertion.

