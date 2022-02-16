import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainBoardComponent from "./src/components/MainBoard/MainBoardComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MainBoardComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
