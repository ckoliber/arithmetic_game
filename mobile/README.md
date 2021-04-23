This project was bootstrapped with [React Native CLI](https://github.com/react-native-community/cli).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the watcher and trying to connect `adb` connected device.<br />

The app will reload if you make edits.

### `npm test`

Launches the tests.

### `npm run android`

Starts android emulator if `adb device` was not found, then installs the app on devices.

### `npm run ios`

Starts ios emulator if `ios device` was not found, then installs the app on devices.

### Building

You can build release apk by these commands

```sh
cd android

./gradlew assembleRelease
```

## Learn More

You can learn more in the [React Native documentation](https://reactnative.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).
