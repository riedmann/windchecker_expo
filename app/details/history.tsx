import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Location: {id}</Text>
      <Text style={styles.text}>Items: {data.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: "#333",
    marginVertical: 5,
  },
});
