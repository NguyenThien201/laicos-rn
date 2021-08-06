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
import { TitleHeader } from "./Title";

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
            // resizeMethod={"scale"}
            resizeMode={"contain"}
            blurRadius={position == 1 && 2 < images.length ? 5 : 0}
            source={images[position].image}
            // source={{
            // 	uri: images[position].image,
            // }}
          />
          {1 < images.length && (
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
          <TitleHeader title={"Chi tiết giao dịch"} />
        </TouchableOpacity>
        <View style={styles.action}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Sửa giao dịch", {
                transaction,
              })
            }
          >
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
      {/* Gallery */}
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
      ) : null}
      {/* Thông tin về giao dịch */}
      <View style={styles.item}>
        <Text style={styles.label}>Số tiền</Text>
        {/* Số tiền giao dịch */}
        {transaction.group ? (
          <Text
            style={[
              styles.itemText,
              transaction.group?.type === "EARN"
                ? { color: Variable.GREEN_COLOR }
                : { color: Variable.RED_COLOR },
            ]}
          >
            {formatter(transaction.money)} VNĐ
          </Text>
        ) : (
          <Text style={styles.itemText}>0 VNĐ</Text>
        )}
        {/* Ngày giao dịch */}
        <View style={styles.date}>
          <Image
            source={require("../Assets/Images/Icons/ic_calendar.png")}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.infoText}>
            {moment(transaction.date).format("DD/MM/YYYY")}
          </Text>
        </View>

        {/* Các thông tin còn lại */}
        <View style={styles.info}>
          {/* Nhóm giao dịch */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nhóm giao dịch</Text>
            <View style={[styles.infoItem]}>
              {transaction?.group?.icon ? (
                <Image
                  source={transaction.group.icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  resizeMode="contain"
                ></Image>
              ) : null}

              {transaction.group ? (
                <Text style={styles.infoText}>{transaction.group.name}</Text>
              ) : (
                <Text style={styles.infoText}>Ảnh chụp hóa đơn</Text>
              )}
            </View>
          </View>

          {/* Thông tin ví */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Ví </Text>
            <View style={styles.infoItem}>
              <Image
                source={require("../Assets/Images/Icons/ic_wallet.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
              <Text style={styles.infoText}>{transaction.wallet}</Text>
            </View>
          </View>

          {/* Ghi chú */}

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Ghi chú</Text>
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
          </View>
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
  item: {
    display: "flex",
    marginVertical: 24,
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
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
    fontSize: Variable.FONT_SIZE_LARGE + 4,
    marginVertical: 6,
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
  infoContainer: {
    marginVertical: 10,
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
    width: "95%",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    justifyContent: "center",
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    backgroundColor: Variable.GREEN_LIGHT_COLOR,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  thumbnail: {
    flex: 1,
    // aspectRatio: 0.8,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
  },
  headline: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 32,
    padding: 10,
    alignContent: "center",
    alignSelf: "center",
    color: "white",
  },
  imageTitle: {
    position: "absolute",
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
    fontSize: Variable.FONT_SIZE_SMALL,
  },
  imageIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: Variable.FONT_SIZE_SMALL,
    color: "#929292",
  },
});
