import { StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { LinearGradButton } from "../Components/LinearGradButton";
import { transactionGroup } from "../data";
import { Variable } from "../styles/theme.style";
import { ITransactionGroup } from "../type";

// @ts-ignore
export const AddGroup = ({ route, navigation }) => {
  const { type, setChosenGroup } = route.params;
  const [groupName, setGroupName] = useState("");
  const [groupType, setType] = useState(type);
  const [chosenParentGroup, setChosenParentGroup] =
    useState<ITransactionGroup | null>(null);

  const createNewGroup = () => {
    if (groupName !== "") {
      const newGroup: ITransactionGroup = {
        id: transactionGroup.length + 1,
        name: groupName,
        icon: "",
        type: groupType === "EARN" ? "EARN" : "SPEND",
        parent: chosenParentGroup ? chosenParentGroup.id : null,
      };
      transactionGroup.push(newGroup);
      setChosenGroup(newGroup);

      navigation.dispatch(StackActions.pop(2));
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, margin: 16 }} behavior="height">
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ flex: 0 }}
      >
        <View style={[styles.title]}>
          <Image
            source={require("../Assets/Images/Icons/ic_back.png")}
            style={{ marginTop: 10, marginRight: 10 }}
          />
          <Text style={[styles.titleText]}>Thêm nhóm chi tiêu mới</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.form]}>
        <TextInput
          placeholder="Tên nhóm"
          placeholderTextColor="white"
          onChangeText={setGroupName}
          value={groupName}
          style={[styles.input]}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chọn nhóm cha", {
              navigation: navigation,
              chosenGroup: chosenParentGroup,
              setChosenGroup: setChosenParentGroup,
              groupType: groupType,
            })
          }
        >
          {chosenParentGroup ? (
            <ChosenGroupView chosenGroup={chosenParentGroup} />
          ) : (
            <Text style={[styles.input]}>Nhóm cha</Text>
          )}
        </TouchableOpacity>

        {/* Chọn loại nhóm */}
        <RadioButton.Group
          onValueChange={(newValue) => setType(newValue)}
          value={groupType}
        >
          <View
            style={[
              styles.radioButtonStyle,
              {
                justifyContent: "space-around",
                marginBottom: 14,
              },
            ]}
          >
            <View style={[styles.radioButtonStyle]}>
              <RadioButton
                value="SPEND"
                uncheckedColor="white"
                color={Variable.GREEN_LIGHT_COLOR}
              />
              <Text style={{ color: "white" }}>Khoản chi</Text>
            </View>
            <View style={[styles.radioButtonStyle]}>
              <RadioButton
                value="EARN"
                uncheckedColor="white"
                color={Variable.GREEN_LIGHT_COLOR}
              />
              <Text style={{ color: "white" }}>Khoản thu</Text>
            </View>
          </View>
        </RadioButton.Group>
        {/* Buttons */}
      </View>
      <View style={[{ flex: 1, marginTop: 26 }]}>
        <LinearGradButton
          color={Variable.BUTTON_PRIMARY}
          text={"LƯU"}
          action={createNewGroup}
        />
        <LinearGradButton
          color={Variable.BUTTON_CANCEL}
          text={"HỦY"}
          action={() => {
            navigation.goBack();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
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
  form: {
    backgroundColor: Variable.BACKGROUND_ITEM_COLOR,
    borderRadius: Variable.BORDER_RADIUS_MEDIUM,
    marginTop: 20,
  },
  input: {
    margin: 14,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    padding: 6,
  },
  radioButtonStyle: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
  },
});
