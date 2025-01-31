import GameOverScreen from "@/screens/GameOverScreen";
import GameScreen from "@/screens/GameScreen";
import StartGameScreen from "@/screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { Colors } from "../../constants/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function HomeScreen() {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("@/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("@/assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
  }

  function pickedNumberHandler(pickedNumber: number) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds: number) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
