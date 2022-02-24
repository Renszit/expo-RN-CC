import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainBoardComponent from "./src/components/MainBoard/MainBoardComponent";
import { addPlugin } from "react-native-flipper";

export default function App() {
  const [status, setStatus] = useState("Waiting for Flipper ...");
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    addPlugin({
      getId() {
        return "ReactNativeCC";
      },
      onConnect(connection) {
        setStatus("Flipper connected");
        setConnection(connection);

        // request initial state
        connection.send("GetState");
      },
      onDisconnect() {
        setConnection(null);
        setStatus("Flipper disconnected...");
      },
    });
  }, []);
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
