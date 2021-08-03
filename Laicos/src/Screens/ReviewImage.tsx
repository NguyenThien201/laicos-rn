// @ts-ignore

import {
  BackHandler,
  Dimensions,
  Image,
  ImageCropData,
  KeyboardAvoidingView,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradButton } from "../Components/LinearGradButton";
import { Variable } from "../styles/theme.style";
import { IImage } from "../type";
import { SvgXml } from "react-native-svg";
import { penIcon } from "../Assets/Images/SvgIcon/PenIcon";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export const ReviewImage = ({ route, navigation }) => {
  let { imageData, images, setImages, refresh } = route.params;
  const backAction = () => {
    saveChange();
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  function saveChange() {
    setImages([...images]);
    refresh();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <View style={styles.container}>
        <View style={styles.center}>
          <Image
            style={styles.image}
            source={{
              uri: (imageData as IImage).image,
            }}
          />
          <View style={styles.imageTitle}>
            <TextInput
              style={[styles.input]}
              placeholderTextColor="white"
              onChangeText={(text) => {
                (imageData as IImage).title = text;
              }}
            >
              {(imageData as IImage).title}
            </TextInput>
            <SvgXml xml={penIcon} width={20} height={50} />
          </View>
        </View>

        <View style={styles.button}>
          <LinearGradButton
            color={Variable.BUTTON_CANCEL}
            text={"QUAY LẠI"}
            action={() => {
              saveChange();

              navigation.goBack();
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Variable.BACKGROUND_COLOR,
  },
  input: {
    // backgroundColor: "red",

    width: screenWidth * 0.6,
    textAlign: "center",
    borderColor: "white",
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    marginBottom: 160,
  },
  imageTitle: {
    flexDirection: "row",
    alignContent: "stretch",
    marginLeft: 16,
    marginRight: 4,
    marginBottom: -4,
  },
  image: {
    borderRadius: 30,
    width: screenWidth * 0.8,
    aspectRatio: 0.8,
    resizeMode: "center",
  },
  center: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
