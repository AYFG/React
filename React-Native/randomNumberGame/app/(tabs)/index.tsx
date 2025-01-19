import StartGameScreen from "@/screens/StartGameScreen";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#ddb52f", "#4e0329"]} style={styles.rootScreen}>
      <StartGameScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
