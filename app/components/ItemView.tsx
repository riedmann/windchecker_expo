import React, { useState } from "react";
import { StyleSheet, Pressable, Linking, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { WebView } from "react-native-webview";
import { ZoomableImage } from "./ZoomableImage";
import { Item } from "@/types";
import { ImageOverlay } from "./ImageOverlay";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ItemViewProps {
  item: Item;
}

export const ItemView: React.FC<ItemViewProps> = ({ item }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const colorScheme = useColorScheme();

  const handleUrlPress = () => {
    Linking.openURL(item.url);
  };

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.title}>{item.name}</ThemedText>

      {item.type === "image" && (
        <View>
          <ZoomableImage url={item.url} />
          <Pressable
            style={[
              styles.openIcon,
              { backgroundColor: Colors[colorScheme ?? "light"].tint + "80" },
            ]}
            onPress={() => setIsOverlayVisible(true)}
          >
            <Ionicons name="open-outline" size={30} color="white" />
          </Pressable>
          <ImageOverlay
            isVisible={isOverlayVisible}
            imageUrl={item.url}
            onClose={() => setIsOverlayVisible(false)}
          />
        </View>
      )}

      {item.type === "iframe" && (
        <WebView
          source={{ uri: item.url }}
          style={styles.webview}
          nestedScrollEnabled={true}
        />
      )}

      {item.type === "Link" && (
        <Pressable onPress={handleUrlPress}>
          <ThemedText style={styles.link}>{item.url}</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
};

export default ItemView;
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  webview: {
    width: "100%",
    height: 400,
  },
  link: {
    color: "#2196F3",
    textDecorationLine: "underline",
    marginTop: 8,
  },
  imagePressable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  openIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "rgba(10,70, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
});
