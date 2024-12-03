import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SpotData } from "@/types";

const Spot: React.FC<SpotData> = ({ name, description, id, issummer }) => {
  const router = useRouter();

  const handlePress = () => {
    console.log("Spot clicked:", {
      name,
      description,
      id,
      issummer,
    });

    router.push({
      pathname: "/details",
      params: {
        id: id,
        name: name,
        description: description,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <MaterialCommunityIcons
          size={24}
          name={issummer ? "white-balance-sunny" : "snowflake"}
          color={issummer ? "#FFB800" : "#00A5FF"}
        />
      </View>
    </Pressable>
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
});

export default Spot;
