import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { transformWeatherData } from "@/utils/script";
import WeatherStat from "./WeatherStat";
import { API_URLS } from "../config/urls";

interface WeatherChartProps {
  latitude: string;
  longitude: string;
  windunit?: string;
}

const USE_MOCK_DATA = false; // Toggle this to switch between API and mock data

export const WeatherChart: React.FC<WeatherChartProps> = ({
  latitude,
  longitude,
  windunit = "kmh",
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let result;
        if (USE_MOCK_DATA) {
          // Use local data from root
          result = require("../../data.json");
        } else {
          const response = await fetch(`${API_URLS.METEOBLUE_BASE}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: latitude, longitude: longitude }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          result = await response.json();
        }

        let statisticData = transformWeatherData(result);
        setData(statisticData);
        setError(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error fetching weather data";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, windunit]);

  if (!latitude || !longitude) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>No Data available</ThemedText>
      </ThemedView>
    );
  }

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading weather data...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {USE_MOCK_DATA && (
        <ThemedText style={styles.mockDataBanner}>Using Mock Data</ThemedText>
      )}
      {!USE_MOCK_DATA && (
        <ThemedText style={styles.dataBanner}>Meteo Blue Data</ThemedText>
      )}
      <WeatherStat data={data} />
    </ThemedView>
  );
};

export default WeatherChart;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  dataBanner: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  mockDataBanner: {
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
});
