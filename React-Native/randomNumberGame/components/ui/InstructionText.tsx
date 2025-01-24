import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";

import { TextStyle } from "react-native";

export default function InstructionText({
  children,
  style,
}: {
  children: string;
  style?: TextStyle;
}) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
