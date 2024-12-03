import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{params.name}</ThemedText>
      <ThemedText>{params.description}</ThemedText>

      {/* Debug section */}
      <ThemedView style={styles.debugContainer}>
        <ThemedText type="subtitle">Debug Info:</ThemedText>
        <ThemedText>
          {Object.entries(params).map(([key, value]) => `${key}: ${value}\n`)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
