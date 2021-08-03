// @ts-ignore

import {
  Dimensions,
  Image,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradButton } from "../Components/LinearGradButton";
import { globalStyles, Variable } from "../styles/theme.style";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export const ReviewImage = ({ route, navigation }) => {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
      </View>
      <View style={styles.button}>
        <LinearGradButton
          color={Variable.BUTTON_CANCEL}
          text={"HỦY"}
          action={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Variable.BACKGROUND_COLOR,
  },
  image: {
    borderRadius: 30,
    width: screenWidth * 0.8,
    height: screenHeight - 20,
    resizeMode: "center",
  },
  center: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
