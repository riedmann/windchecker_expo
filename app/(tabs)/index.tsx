import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Spot from "../components/Spot";
import { useRouter } from "expo-router";
import { SpotData } from "@/types";

export default function SpotsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [spots, setSpots] = useState<SpotData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpots();
  }, []);

  const handleSpotPress = (spot: SpotData) => {
    //@ts-ignore
    router.push({ pathname: "details", params: spot });
  };

  const fetchSpots = async () => {
    try {
      const response = await fetch(
        "https://api.riedmann.rocks/windchecker/items/spots?fields=*.*.*&status=published&sort=name"
      );
      const data = await response.json();
      console.log("data", data);
      setSpots(data.data);
    } catch (error) {
      console.error("Error fetching spots:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={spots}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Spot
              name={item.name}
              id={item.id}
              issummer={item.issummer}
              description={item.description}
              onPress={() => handleSpotPress(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
