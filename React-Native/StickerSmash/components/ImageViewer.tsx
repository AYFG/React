import React from "react";
import { Image, StyleSheet } from "react-native";
import { type ImageSource } from "expo-image";

export default function ImageViewer({ imgSource }: { imgSource: ImageSource }) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
