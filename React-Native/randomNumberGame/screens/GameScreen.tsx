import NumberContainer from "@/components/game/NumberContainer";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Title from "@/components/ui/Title";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function generateRandomBetween(min: number, max: number, exclude: number) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber }: { userNumber: number }) {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {
    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
  }

  return (
    <View style={styles.screen}>
      <Title>상대방의 추측</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.buttonContainer}>
        <PrimaryButton>+</PrimaryButton>
        <PrimaryButton>-</PrimaryButton>
      </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
});
