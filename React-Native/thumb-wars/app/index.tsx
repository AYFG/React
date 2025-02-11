import { Text, View } from "react-native";
import Login from "./Login";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-600">Edafsit app/index.tsx to edit this screen.</Text>
      <Login />
    </View>
  );
}
