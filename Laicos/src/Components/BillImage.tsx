import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Variable } from "../styles/theme.style";
import { SvgXml } from "react-native-svg";
import { cameraIcon } from "../Assets/Images/SvgIcon/CameraIcon";
import { ReviewImage } from "../Screens/ReviewImage";
import { white } from "react-native-paper/lib/typescript/styles/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// @ts-ignore
const months: Date[] = (): Date[] => {
  const d: Date[] = [new Date()];
  d[0].setMonth(d[0].getMonth() + 1);

  const numberOfMonths = 4;

  for (let i = 1; i <= numberOfMonths; i++) {
    const tempDate = new Date();
    tempDate.setMonth(d[0].getMonth() - i);
    d.push(tempDate);
  }
  d.reverse();
  return d;
};

export const BillImage = ({ navigation, image, setImages }) => {
  useEffect(() => {
    setImages([...image]);
  }, []);
  return (
    <View style={styles.pagerView}>
      <View style={styles.row}>
        <View style={[styles.item]}>
          <TouchableOpacity
            style={styles.imageIcon}
            onPress={() =>
              navigation.navigate("Camera", { didCaptureImg: didCaptureImg })
            }
          >
            <SvgXml xml={cameraIcon} width={60} height={60} />
          </TouchableOpacity>
        </View>
        <View style={[styles.item]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              const images = image as string[];
              if (images.length >= 1) {
                navigation.navigate("ReviewImage", { imageUri: images[0] });
              }
            }}
          >
            {renderImage(0)}
          </TouchableOpacity>
        </View>
        <View style={[styles.item]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              const images = image as string[];
              if (images.length == 2) {
                navigation.navigate("ReviewImage", { imageUri: images[1] });
              }
              if (images.length > 2) {
                navigation.navigate("ImageGallery", { images: images });
              }
            }}
          >
            {renderImage(1)}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function renderImage(position: number) {
    console.log("renmder render");
    const images = image as string[];
    console.log(images.toString());
    if (images[position] != null) {
      return (
        <View style={styles.thumbnail}>
          <Image
            style={styles.thumbnail}
            blurRadius={position == 1 && 2 < images.length ? 5 : 0}
            source={{
              uri: images[position],
            }}
          />
          {position == 1 && 2 < images.length && (
            <Text style={styles.headline}>+{images.length - 2}</Text>
          )}
        </View>
      );
    }
    return <View />;
  }

  function didCaptureImg(uri: string) {
    const copyImage = image as string[];
    copyImage.push(uri);
    setImages([...copyImage]);
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
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
  imageIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pagerView: {
    // marginLeft: -screenWidth / 2,a
    flex: 2,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  item: {
    flex: 1,
    height: screenWidth / 3,
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    margin: 6,
    marginBottom: 6,
  },
  monthTitle: {
    textAlign: "center",
    marginTop: 16,
    backgroundColor: Variable.GREEN_LIGHT_COLOR,
    fontSize: Variable.FONT_SIZE_SMALL_16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 16,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
  },
});
