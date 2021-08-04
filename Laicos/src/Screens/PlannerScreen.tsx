import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Modal from "react-native-modalbox";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradButton } from "../Components/LinearGradButton";
import { ITransaction, ITransactionGroup, IWallet } from "../type";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { transaction, wallets } from "../data";
import { ChosenGroupView } from "../Components/ChosenGroupVIew";
import { BillImage } from "../Components/BillImage";
import LinearGradient from "react-native-linear-gradient";
import { MonthlyHistory } from "../Components/MonthlyHistory";
import { WalletList } from "../Components/WalletList";
import { globalStyles, Variable } from "../styles/theme.style";
import { TitleHeader } from "./Title";
const PlannerScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView style={[styles.container]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ flex: 0 }}
        >
         <Text style={globalStyles.title}>
           Kế hoạch
         </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail Planner');
          }}
          style={{ flex: 0 }}
        >
          <View style={{ marginTop: 15, marginLeft: 10 }}>
            <Text style={[styles.tText]}>Budget</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={[styles.sText]}>
                Total: 204.000.000 đ{"\n"}Accumulated: 52.500.000 đ
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 25,
          }}
        />
        <TouchableOpacity>
          <View style={{ marginTop: -5, marginLeft: 10 }}>
            <Text style={[styles.tText]}>Event plan</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={[styles.sText]}>
                Total: 204.000.000 đ{"\n"}Accumulated: 52.500.000 đ
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 25,
          }}
        />
        <TouchableOpacity>
          <View style={{ marginTop: -5, marginLeft: 10 }}>
            <Text style={[styles.tText]}>Income plan</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={[styles.sText]}>
                Total: 204.000.000 đ{"\n"}Accumulated: 52.500.000 đ
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 25,
          }}
        />
        <TouchableOpacity>
          <View style={{ marginTop: -5, marginLeft: 10 }}>
            <Text style={[styles.tText]}>Expense plan</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={[styles.sText]}>
                Total: 204.000.000 đ{"\n"}Accumulated: 52.500.000 đ
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: Variable.GREEN_LIGHT_COLOR,
            borderBottomWidth: 1,
            marginVertical: 25,
          }}
        />
        <TouchableOpacity>
          <View style={{ marginTop: -5, marginLeft: 10 }}>
            <Text style={[styles.tText]}>Periodical transfer</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={[styles.sText]}>
                Total: 204.000.000 đ{"\n"}Accumulated: 52.500.000 đ
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
    marginLeft: 15,
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
  tText: {
    color: "white",
    fontSize: Variable.FONT_SIZE_MEDIUM,
    fontWeight: "bold",
  },
  sText: {
    color: "#BABABA",
    fontSize: Variable.FONT_SIZE_SMALL,
    fontWeight: "bold",
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
});
export default PlannerScreen;
