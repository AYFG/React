import Title from "@/components/ui/Title";
import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";

export default function GameOverScreen() {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/images/success.png")} />
      </View>
      <Text>당신의 휴대폰은 X 번의 라운드만에 숫자 Y 를 맞혔습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    // margin: "auto",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
