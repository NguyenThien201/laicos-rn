import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Variable } from "../styles/theme.style";
import { formatter } from "../Utils/format";
import { IImage } from "../type";
import { SvgXml } from "react-native-svg";
import { penIcon } from "../Assets/Images/SvgIcon/PenIcon";
import { cameraIcon } from "../Assets/Images/SvgIcon/CameraIcon";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export const DetailTransaction = ({ route, navigation }) => {
  const { transaction } = route.params;
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    setImages(transaction.images ?? []);
    return;
  }, []);
  function didCaptureImg(uri: string) {
    const copyImage = images as IImage[];
    const newImg: IImage = { image: uri, title: "" };
    copyImage.push(newImg);
    setImages([...copyImage]);
  }
  function renderImage(position: number) {
    if (images[position] != null) {
      return (
        <View style={styles.thumbnail}>
          <Image
            style={styles.thumbnail}
            blurRadius={position == 1 && 2 < images.length ? 5 : 0}
            source={{
              uri: images[position].image,
            }}
          />
          {position == 1 && 2 < images.length && (
            <Text style={styles.headline}>+{images.length - 2}</Text>
          )}
          <View style={styles.imageTitle}>
            <TextInput
              style={[styles.input]}
              placeholderTextColor="white"
              onChangeText={(text) => {
                images[position].title = text;
              }}
            >
              {images[position].title}
            </TextInput>
            <SvgXml xml={penIcon} width={20} height={50} />
          </View>
        </View>
      );
    }
    return <View />;
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 0 }}
        >
          <View style={[styles.title]}>
            <Image
              source={require("../Assets/Images/Icons/ic_back.png")}
              style={{ marginTop: 10, marginRight: 10 }}
            ></Image>
            <Text style={[styles.titleText]}>Chi tiết giao dịch</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.action}>
          <TouchableOpacity>
            <Image
              source={require("../Assets/Images/Icons/ic_edit.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../Assets/Images/Icons/ic_delete.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      {images.length > 0 ? (
        <View style={styles.imgItem}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              const images = transaction.images as IImage[];

              navigation.navigate("ImageGallery", {
                images: images,
                setImages: setImages,
              });
            }}
          >
            {renderImage(0)}
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
      <View style={styles.item}>
        {transaction?.group.icon ? (
          <Image
            source={transaction.group.icon}
            style={{ width: 32, height: 32 }}
            resizeMode="contain"
          ></Image>
        ) : null}
        <Text style={styles.itemText}>{transaction.group.name}</Text>
        <Text
          style={[
            styles.itemText,
            transaction.group.type === "EARN"
              ? { color: Variable.GREEN_COLOR }
              : { color: Variable.RED_COLOR },
          ]}
        >
          {formatter(transaction.money)} VNĐ
        </Text>

        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Image
              source={require("../Assets/Images/Icons/ic_wallet.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>{transaction.wallet}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image
              source={require("../Assets/Images/Icons/ic_calendar.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              {moment(transaction.date).format("DD/MM/YYYY")}
            </Text>
          </View>

          {transaction.description.length > 0 ? (
            <View style={styles.infoItem}>
              <Image
                source={require("../Assets/Images/Icons/ic_description.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
              <Text style={styles.infoText} ellipsizeMode="clip">
                {transaction.description}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 16,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  action: {
    width: "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    alignContent: "flex-start",
  },
  titleText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    fontWeight: "bold",
  },
  item: {
    display: "flex",
    marginVertical: 24,
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    borderWidth: 1,
    borderColor: Variable.GREEN_LIGHT_COLOR,
    padding: 16,
    alignSelf: "center",
    width: "80%",
    alignItems: "center",
  },
  imgItem: {
    width: screenWidth * 0.4,
    // flex: 1,
    alignSelf: "center",
    aspectRatio: 0.8,
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    margin: 6,
    marginBottom: 6,
  },
  itemText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_LARGE,
    marginVertical: 2,
  },
  infoText: {
    marginLeft: 8,
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
  },
  info: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 3,
    width: "95%",
  },
  thumbnail: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 10,
    alignContent: "center",
    alignSelf: "center",
    color: "white",
  },
  imageTitle: {
    flexDirection: "row",
    alignContent: "stretch",
    marginLeft: 16,
    marginRight: 4,
    marginBottom: -4,
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
  imageIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
