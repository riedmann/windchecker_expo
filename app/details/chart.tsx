import React, { useContext } from "react";
import { StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { WebView } from "react-native-webview";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { DataContext } from "./_layout";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = 300; // You can adjust this value

export default function ImageScreen() {
  const { data, loading } = useContext(DataContext);
  const imageItems = data.filter((item) => item.type === "image");

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {imageItems.map((item: any) => (
          <ThemedView key={item.id} style={styles.itemContainer}>
            <ThemedText style={styles.title}>{item.name}</ThemedText>

            {item.type === "image" && (
              <Image
                source={{ uri: item.url }}
                style={styles.image}
                resizeMode="contain"
              />
            )}

            {item.type === "iframe" && (
              <WebView
                source={{ uri: item.url }}
                style={styles.webview}
                nestedScrollEnabled={true}
              />
            )}
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
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
  image: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT,
    backgroundColor: "#f0f0f0",
  },
  webview: {
    width: "100%",
    height: 300,
  },
});
