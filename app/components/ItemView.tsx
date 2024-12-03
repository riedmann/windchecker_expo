import React from "react";
import { StyleSheet, Pressable, Linking } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { WebView } from "react-native-webview";
import { ZoomableImage } from "./ZoomableImage";
import { Item } from "@/types";

interface ItemViewProps {
  item: Item;
}

export const ItemView: React.FC<ItemViewProps> = ({ item }) => {
  const handleUrlPress = () => {
    Linking.openURL(item.url);
  };

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.title}>{item.name}</ThemedText>

      {item.type === "image" && <ZoomableImage url={item.url} />}

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
    height: 300,
  },
  link: {
    color: "#2196F3",
    textDecorationLine: "underline",
    marginTop: 8,
  },
});
