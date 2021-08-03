// @ts-ignore

import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import React from "react";

export const Camera = ({ route, navigation }) => {
  // @ts-ignore
  const { didCaptureImg } = route.params;
  let camera: RNCamera;
  let RNFS = require("react-native-fs");

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(cam: RNCamera) => {
          camera = cam;
        }}
        type={RNCamera.Constants.Type.back}
        style={styles.container}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <Text>Tap</Text>
      </TouchableOpacity>
    </View>
  );

  async function checkAndroidPermission() {
    try {
      const permissionw = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permissionw);
      const permissionr = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      await PermissionsAndroid.request(permissionr);
      await Promise.resolve();
    } catch (error) {
      await Promise.reject(error);
    }
  }

  async function takePicture() {
    await checkAndroidPermission();
    const path = `${RNFS.ExternalStorageDirectoryPath}/Laicos`;
    await RNFS.mkdir(path);
    console.log(`hehehe ${path}`);
    if (camera) {
      // @ts-ignore
      const options = {
        quality: 1,
        base64: true,
        path: `${path}/${new Date().getTime().toString()}.png`,
      };
      let data = await camera.takePictureAsync(options);
      console.log("capture");

      didCaptureImg(data.uri);
      navigation.goBack();
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

export default Camera;
