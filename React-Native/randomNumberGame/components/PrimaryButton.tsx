import React from "react";
import { Text, View } from "react-native";

export default function PrimaryButton({ children }: { children: string }) {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
}
