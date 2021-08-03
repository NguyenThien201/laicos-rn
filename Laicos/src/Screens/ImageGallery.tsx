import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Variable } from "../styles/theme.style";
import { SvgXml } from "react-native-svg";
import { penIcon } from "../Assets/Images/SvgIcon/PenIcon";
import { IImage } from "../type";

export const ImageGallery = ({ navigation, route }) => {
  const backAction = () => {
    saveChange();
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    setState([...images]);
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { images, setImages } = route.params;

  const [state, setState] = useState<IImage[]>([]);

  function saveChange() {
    setImages([...images]);
  }

  function refresh() {
    setState([...images]);
  }
  function renderItem(imageData: IImage) {
    return (
      <TouchableOpacity
        style={(styles.thumbnail, styles.block)}
        onPress={() => {
          navigation.navigate("ReviewImage", {
            imageData: imageData,
            images: images,
            setImages: setImages,
            refresh: refresh,
          });
        }}
      >
        <Image
          style={styles.thumbnail}
          source={{
            uri: imageData.image,
          }}
        />
        <View style={styles.imageTitle}>
          <TextInput
            style={[styles.input]}
            placeholderTextColor="white"
            onChangeText={(text) => {
              imageData.title = text;
            }}
          >
            {imageData.title}
          </TextInput>
          <SvgXml xml={penIcon} width={20} height={50} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <TouchableOpacity
        onPress={() => {
          saveChange();
          navigation.goBack();
        }}
        style={{ flex: 0 }}
      >
        <View style={[styles.title]}>
          <Image
            source={require("../Assets/Images/Icons/ic_back.png")}
            style={{ marginTop: 10, marginRight: 10 }}
          />
          <Text style={[styles.titleText]}>Bộ sưu tập</Text>
        </View>
      </TouchableOpacity>
      {images && (
        <FlatList
          data={images as IImage[]}
          extraData={state}
          renderItem={({ item }) => renderItem(item)}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  title: {
    flexDirection: "row",
    alignContent: "flex-start",
    marginBottom: 16,
  },
  imageTitle: {
    flexDirection: "row",
    alignContent: "stretch",
    marginLeft: 16,
    marginRight: 4,
    marginBottom: -4,
  },
  thumbnail: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
  },
  titleText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
  block: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    aspectRatio: 0.8,
    margin: 6,
  },

  GridViewInsideTextItemStyle: {
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
    flex: 1,
    textShadowRadius: 10,
    textShadowColor: "black",
    // backgroundColor: "red",
    textAlign: "right",
    borderColor: "white",
    color: "white",
    fontSize: Variable.FONT_SIZE_SMALL_14,
  },
  modalView: {
    margin: 0,
    justifyContent: "flex-end",
    height: 300,
  },
  calendarView: {},
});
