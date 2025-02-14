import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet, Text } from "react-native";

export default function Title({ children }: { children: string }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    // fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    // Platform 별로 다르게 지정하는 방법
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
