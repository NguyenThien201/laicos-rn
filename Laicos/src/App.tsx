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
import React from "react";

import { Variable } from "./styles/theme.style";
import { MainNavigator } from "./Navigators/MainBottomNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { GroupPicker } from "./Screens/GroupPicker";
import { NavigationActions, StackActions } from "react-navigation";
import { AddTransaction } from "./Screens/AddTransaction";
import { AddGroup } from "./Screens/AddGroup";
import { ParentGroupPicker } from "./Screens/ParentGroupPicker";
import { WalletPicker } from "./Screens/WalletPicker";
import { HistoryScreen } from "./Screens/HistoryScreen";
import { DetailTransaction } from "./Screens/DetailTransactionScreen";
import Camera from "./Screens/Camera";
import { ReviewImage } from "./Screens/ReviewImage";
import { ImageGallery } from "./Screens/ImageGallery";
const Stack = createStackNavigator();

const Index = () => {
  return <MainNavigator />;
};
export default function App() {
  const CustomDarkTheme: Theme = {
    colors: {
      background: Variable.BACKGROUND_COLOR,
      text: "#fff",
    },
  };

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
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="ImageGallery" component={ImageGallery} />
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
