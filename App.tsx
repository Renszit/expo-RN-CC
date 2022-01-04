import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainBoardComponent from './src/components/MainBoard/MainBoardComponent';

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
