import React from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Variable } from "../styles/theme.style";

export const ImageGallery = ({ navigation, route }) => {
  const { images } = route.params;

  function renderItem(uri: string) {
    console.log("item");
    return (
      <TouchableOpacity
        style={(styles.thumbnail, styles.GridViewBlockStyle)}
        onPress={() => {
          navigation.navigate("ReviewImage", { imageUri: uri });
        }}
      >
        <Image
          style={styles.thumbnail}
          source={{
            uri: uri,
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <FlatList
        data={images as string[]}
        renderItem={({ item }) => renderItem(item)}
        numColumns={3}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  title: {
    flexDirection: "row",
    alignContent: "flex-start",
  },
  thumbnail: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
  },
  titleText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
  GridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    aspectRatio: 1,
    margin: 5,
  },

  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    justifyContent: "center",
  },
  form: {
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: 16,
  },
  input: {
    margin: 14,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    padding: 6,
  },
  modalView: {
    margin: 0,

    justifyContent: "flex-end",
    height: 300,
  },
  calendarView: {},
});
