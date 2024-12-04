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

const Spot: React.FC<SpotData> = ({
  name,
  description,
  id,
  isFav,
  longitude,
  latitude,
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(isFav);

  useEffect(() => {
    const checkFavorite = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setIsFavorite(favorites.some((fav: any) => fav.id === id));
    };

    checkFavorite();
  }, [id]);

  const handlePress = () => {
    router.push({
      pathname: "/details",
      params: {
        id: id,
        name: name,
        description: description,
        longitude: longitude,
        latitude: latitude,
      },
    });
  };

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        favorites = favorites.filter((fav: any) => fav.id !== id);
      } else {
        favorites.push({ id, name, description, longitude, latitude });
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      console.log("favorites", favorites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </Pressable>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleFavorite}>
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
