import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { cssInterop } from "nativewind";
cssInterop(Image, { className: "style" });

type socialButtonProps = {
  source: string;
  onPress: () => void;
};

export default function socialButton({ source, onPress }: socialButtonProps) {
  return (
    <View className="">
      <Pressable onPress={onPress}>
        <Image source={source} className="w-10 h-10" contentFit="cover" />
      </Pressable>
    </View>
  );
}
