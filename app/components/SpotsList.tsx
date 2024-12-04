import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Spot from "./Spot";
import { SpotData } from "@/types";

interface SpotsListProps {
  issummer: boolean;
}

export default function SpotsList({ issummer = false }: SpotsListProps) {
  const [spots, setSpots] = useState<SpotData[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // Initial load of spots
  useEffect(() => {
    const loadSpots = async () => {
      setLoading(true);
      try {
        if (spots.length === 0) {
          await fetchSpots();
        }
      } catch (error) {
        console.error("Error loading spots:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpots();
  }, [spots.length]);

  // Load favorites when screen is focused
  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const fetchSpots = async () => {
    try {
      const response = await fetch(
        "https://api.riedmann.rocks/windchecker/items/spots?fields=*.*.*&status=published&sort=name"
      );
      const data = await response.json();
      setSpots(
        data.data.filter((spot: SpotData) => spot.issummer === issummer)
      );
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

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={spots}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return <Spot {...item} isFav={favorites.has(item.id)} />;
      }}
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
});
