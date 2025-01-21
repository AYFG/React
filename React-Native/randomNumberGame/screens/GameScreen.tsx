import Title from "@/components/Title";
import { StyleSheet, Text, View } from "react-native";

export default function GameScreen() {
  return (
    <View style={styles.screen}>
      <Title>상대방의 추측</Title>
      <View>
        <Text>Higher or lower?</Text>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
});
