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
1️⃣ Install React Native community CLI

2️⃣ Configure Android SDK

Open Android Studio → Settings → SDK Manager

Make sure these are installed:

Android SDK Platform (latest)

Android SDK Platform-Tools

Android SDK Build-Tools

3️⃣ Set Environment Variables
macOS / Linux (~/.bashrc or ~/.zshrc)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

Windows (System Environment Variables)

Add:

ANDROID_HOME = C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk

Add to Path:

platform-tools

emulator

Restart terminal after this step.

📦 Install Dependencies

From the project root directory:

npm install


or if using yarn:

yarn install

▶️ Run the App on Android
1️⃣ Start Metro Bundler
npx react-native start

or

npm run android

Keep this terminal open.

2️⃣ Run on Android Emulator or Device

In a new terminal:

npx react-native run-android


✅ Make sure:

Emulator is running OR

Physical device is connected with USB debugging enabled

🧹 If You Face Errors (Common Fix)
Clean Android build
cd android
./gradlew clean
cd ..


Windows:

cd android
gradlew clean
cd ..

Clear Metro cache
npx react-native start --reset-cache

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
🏗 Build Production APK (Optional)
cd android
./gradlew assembleRelease


APK location:

android/app/build/outputs/apk/release/app-release.apk

