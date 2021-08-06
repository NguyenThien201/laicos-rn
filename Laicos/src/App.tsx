/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import { NavigationContainer, Theme } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";

import { Variable } from "./styles/theme.style";
import { MainNavigator } from "./Navigators/MainBottomNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupPicker } from "./Screens/GroupPicker";
import { AddTransaction } from "./Screens/AddTransaction";
import { AddGroup } from "./Screens/AddGroup";
import { ParentGroupPicker } from "./Screens/ParentGroupPicker";
import { WalletPicker } from "./Screens/WalletPicker";
import { DetailTransaction } from "./Screens/DetailTransactionScreen";
import Camera from "./Screens/Camera";
import { ReviewImage } from "./Screens/ReviewImage";
import { ImageGallery } from "./Screens/ImageGallery";
import { AppState, AsyncStorage } from "react-native";
import DetailPlanner from "./Screens/DetailPlanner";
import { EditTransaction } from "./Screens/EditTransaction";
import { Notification } from "./Screens/NotificationScreen";
import { transaction } from "./data";
import {ITransaction, parseITransactionObject} from "./type";

const Stack = createStackNavigator();

const Index = () => {
  return <MainNavigator />;
};
export default function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    console.disableYellowBox = true;
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const CustomDarkTheme: Theme = {
    colors: {
      background: Variable.BACKGROUND_COLOR,
      text: "#fff",
    },
  };

  const _handleAppStateChange = (nextAppState) => {
    nextAppState === "active" ?  readData() : writeData();
    appState.current = nextAppState;
  };

  async function readData() {
    try {
      console.log("Reading data");
      const myArray = await AsyncStorage.getItem("laicos_itransaction");
      if (myArray !== null) {
        let data = JSON.parse(myArray);
        transaction.splice(0, transaction.length);
        data.forEach((transJson: JSON) => {
          transaction.push(parseITransactionObject(transJson));
        });
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  async function writeData() {
    try {
      console.log("Saving data");
      await AsyncStorage.setItem(
        "laicos_itransaction",
        JSON.stringify(transaction)
      );
    } catch (error) {
      // Error saving data
    }
  }

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      {/* <MainNavigator /> */}
      <Stack.Navigator headerMode="none" initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Chọn nhóm" component={GroupPicker} />
        <Stack.Screen name="Thêm" component={AddTransaction} />
        <Stack.Screen name="Thêm nhóm" component={AddGroup} />
        <Stack.Screen name="Chọn nhóm cha" component={ParentGroupPicker} />
        <Stack.Screen name="Chọn ví" component={WalletPicker} />
        <Stack.Screen name="Chi tiết giao dịch" component={DetailTransaction} />
        <Stack.Screen name="Sửa giao dịch" component={EditTransaction} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="ImageGallery" component={ImageGallery} />
        <Stack.Screen name="Detail Planner" component={DetailPlanner} />
        <Stack.Screen name="Thông báo" component={Notification} />
        <Stack.Screen
          name="ReviewImage"
          component={ReviewImage}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "clamp",
                }),
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
