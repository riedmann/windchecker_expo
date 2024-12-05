import React, { useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";

import { SpotData } from "@/types";
import Spot from "../components/Spot";
import { API_URLS } from "../config/urls";

export default function FavoritesScreen() {
  const [spots, setSpots] = useState<SpotData[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const loadInitialData = async () => {
        if (spots.length === 0) {
          await fetchSpots();
        }
        await loadFavorites();
        setLoading(false);
      };

      loadInitialData();
    }, [spots.length])
  );

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const fetchSpots = async () => {
    try {
      const response = await fetch(API_URLS.SPOTS);

      const data = await response.json();
      setSpots(data.data);
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(
          new Set(JSON.parse(storedFavorites).map((fav: any) => fav.id))
        );
      } else {
        setFavorites(new Set());
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const favoriteSpots = spots.filter((spot) => favorites.has(spot.id));

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (favoriteSpots.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ThemedText style={styles.infoText}>
          Keine Favoriten vorhanden
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteSpots}
      renderItem={({ item }) => <Spot {...item} isFav={true} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#666",
  },
});
