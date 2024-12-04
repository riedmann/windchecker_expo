import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpotData } from "@/types";
import { useFavorites } from "../context/FavoritesContext";

const Spot: React.FC<SpotData> = ({
  name,
  description,
  id,
  longitude,
  latitude,
}) => {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav: any) => fav.id === id);

  const handlePress = () => {
    router.push({
      pathname: "/details",
      params: {
        id,
        name,
        description,
        longitude,
        latitude,
      },
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id,
      name,
      description,
      longitude,
      latitude,
      issummer: false,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#646464",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Spot;
