import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Item } from "@/types";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

interface ItemViewProps {
  item: Item;
}

const Colors = {
  light: { tint: "#2196F3" },
  dark: { tint: "#ffffff" },
};

export const ItemView: React.FC<ItemViewProps> = ({ item }) => {
  const colorScheme = useColorScheme();
  const webviewRef = useRef<WebView>(null);

  const handleUrlPress = () => {
    Linking.openURL(item.url);
  };

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.title}>{item.name}</ThemedText>

      {item.type === "image" && (
        <View>
          <WebView
            source={{ uri: item.url }}
            style={styles.webview}
            cacheEnabled={false}
            originWhitelist={["*"]}
            renderLoading={() => (
              <ActivityIndicator color={Colors[colorScheme ?? "light"].tint} />
            )}
          />
        </View>
      )}
      {item.type === "iframe" && (
        <View>
          <WebView
            source={{ uri: item.url }}
            style={styles.webview}
            cacheEnabled={false}
            nestedScrollEnabled={true}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator color={Colors[colorScheme ?? "light"].tint} />
            )}
            onLoad={() => {
              webviewRef.current?.injectJavaScript(`
                document.body.style.backgroundColor = 'transparent';
              `);
            }}
            ref={webviewRef}
          />
        </View>
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
