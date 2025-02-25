import { Image, type ImageSource } from "expo-image";
import { View } from "react-native";

type Props = {
  stickerSource: ImageSource;
  imageSize: number;
};

export default function EmojiSticker({ stickerSource, imageSize }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}
