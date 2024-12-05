import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { transformWeatherData } from "@/utils/script";
import WeatherStat from "./WeatherStat";

interface WeatherChartProps {
  latitude: string;
  longitude: string;
  windunit?: string;
}

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
        // Comment out the actual fetch
        /*const response = await fetch(
          `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=CRMvhmj2yd8oLgS3&lat=${latitude}&lon=${longitude}&windspeed=${windunit}&asl=396&format=json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();*/

        // Use local data instead
        const result = require("../../data.json");

        let statisticData = transformWeatherData(result);
        // console.log(JSON.stringify(statisticData, null, 2));
        setData(statisticData);
        setError(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error fetching weather data";
        setError(errorMessage);
        console.error("Error fetching weather data:", error);
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

  return (
    <ThemedView style={styles.container}>
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
});
