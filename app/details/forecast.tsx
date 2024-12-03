import React, { useContext } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { DataContext } from "./_layout";
import { ZoomableImage } from "../components/ZoomableImage";

export default function ForecastScreen() {
  const { data, loading } = useContext(DataContext);

  // Filter for items where art is "image"
  const imageItems = data.filter((item: any) => item.art === "forecast");

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

            {item.type === "image" && <ZoomableImage url={item.url} />}

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
    width: "100%",
    height: 300,
    backgroundColor: "#f0f0f0",
  },
  webview: {
    width: "100%",
    height: 300,
  },
});
