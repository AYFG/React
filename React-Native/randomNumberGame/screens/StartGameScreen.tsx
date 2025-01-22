import PrimaryButton from "@/components/ui/PrimaryButton";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

export default function StartGameScreen({
  onPickNumber,
}: {
  onPickNumber: (pickedNumber: number) => void;
}) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(inputText: string) {
    setEnteredNumber(inputText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("제목: 유효하지 않은 숫자입니다.", "내용: 1과 99 사이의 숫자를 입력해주세요.", [
        { text: "확인", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
  }
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={enteredNumber}
        onChangeText={numberInputHandler}
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    elevation: 4, // android shadow
    shadowColor: "black", // ios shadow
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
  },
});
