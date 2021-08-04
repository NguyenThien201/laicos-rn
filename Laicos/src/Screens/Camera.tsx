// @ts-ignore

import {
  BackHandler,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import React, { useEffect } from "react";
import { Variable } from "../styles/theme.style";
import { captureIcon } from "../Assets/Images/SvgIcon/CaptureIcon";
import { cameraIcon } from "../Assets/Images/SvgIcon/CameraIcon";
import { SvgXml } from "react-native-svg";
export const Camera = ({ route, navigation }) => {
  // @ts-ignore
  const { didCaptureImg } = route.params;
  let camera: RNCamera;
  let RNFS = require("react-native-fs");
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
      ></RNCamera>
      <View
        style={[styles.container, { backgroundColor: "rgba(52, 52, 52, 0)" }]}
      />
      <View style={[styles.title]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flex: 0, flexDirection: "row" }}
        >
          <Image
            source={require("../Assets/Images/Icons/ic_back.png")}
            style={{ marginTop: 10, marginRight: 10 }}
          ></Image>
          <Text style={[styles.titleText]}>Trở về</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <SvgXml xml={captureIcon} width={80} height={80} />
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
    if (camera) {
      // @ts-ignore
      const options = {
        quality: 1,
        base64: true,
        path: `${path}/${new Date().getTime().toString()}.png`,
      };
      let data = await camera.takePictureAsync(options);
      didCaptureImg(data.uri);
      navigation.goBack();
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    margin: 20,
  },
  title: {
    position: "absolute",
    top: 20,
    left: 16,

    flexDirection: "row",
    alignContent: "flex-start",
  },
  titleText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
});

export default Camera;
