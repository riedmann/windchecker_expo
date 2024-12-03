import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = 300;

interface ZoomableImageProps {
  url: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ url }) => {
  return (
    //@ts-ignore
    <ImageZoom
      cropWidth={SCREEN_WIDTH - 32}
      cropHeight={SCREEN_HEIGHT}
      imageWidth={SCREEN_WIDTH - 32}
      imageHeight={SCREEN_HEIGHT}
    >
      <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
    </ImageZoom>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT,
    backgroundColor: "#f0f0f0",
  },
});
