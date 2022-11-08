import * as React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";

import firebase from "firebase";
import { firebaseConfig } from "./config";

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator  from './navigation/TabNavigator';



export default function App() {
  return (
    <NavigationContainer>
     <TabNavigator/>
    </NavigationContainer>
  );
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
/*
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}*/