import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = 270;

interface ZoomableImageProps {
  url: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ url }) => {
  const random = Math.random();
  return (
    //@ts-ignore
    <ImageZoom
      cropWidth={SCREEN_WIDTH - 32}
      cropHeight={SCREEN_HEIGHT}
      imageWidth={SCREEN_WIDTH - 32}
      imageHeight={SCREEN_HEIGHT}
    >
      <Image
        source={{
          uri: url + "?random=" + random,
          cache: "reload",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </ImageZoom>
  );
};
export default ZoomableImage;
const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT,
    backgroundColor: "#ffffff",
  },
});
