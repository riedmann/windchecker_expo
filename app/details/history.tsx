import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { DataContext } from "./_layout";

export default function HistoryScreen() {
  const { id } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://windchecker.riedmann.rocks/api/images?name=${id}`
        );
        const json = await response.json();
        setData(json.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const renderItem = ({
    item: image,
  }: {
    item: { date: string; url: string };
  }) => (
    <View style={styles.imageContainer}>
      <Text style={styles.dateText}>
        {new Intl.DateTimeFormat("de-DE", {
          weekday: "long",
          day: "numeric",
          month: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date(image.date))}{" "}
        Uhr
      </Text>
      <Image
        source={{ uri: image.url }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Keine Bilder verfügbar</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  image: {
    width: 300,
    height: 200,
  },
  infoText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
