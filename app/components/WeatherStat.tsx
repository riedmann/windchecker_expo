import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface WeatherDataPoint {
  time: string; // Format: HH:mm
  temperature: number; // Temperature in degrees (e.g., Celsius)
  windSpeed: number; // Wind speed in chosen units
  windDirection: number; // Wind direction in degrees
}

interface DailyWeather {
  day: string; // Name of the day
  data: WeatherDataPoint[]; // Array of hourly weather data
}

interface WeatherData {
  data: { data: DailyWeather[] }; // Array of daily weather objects
}

export const WeatherStat: React.FC<WeatherData> = ({ data }) => {
  const renderHourHeaders = () => {
    return (
      <ThemedView style={styles.headerRow}>
        <ThemedText style={[styles.cell, styles.dateCell]}>Date</ThemedText>
        {Array.from({ length: 24 }, (_, i) => (
          <ThemedText key={i} style={styles.cell}>
            {i.toString().padStart(2, "0")}
          </ThemedText>
        ))}
      </ThemedView>
    );
  };

  const renderDataRows = () => {
    if (!data || !Array.isArray(data.data)) return null;
    data.data.map((dayData) => {
      console.log("day", dayData);
    });

    return data.data.map((dayData, index) => {
      let key = dayData.day + index;
      return (
        <ThemedView key={key} style={styles.row}>
          <ThemedText style={[styles.cell, styles.dateCell]}>
            {dayData.day.substring(0, 3) || `Day ${index + 1}`}
          </ThemedText>
          {dayData.data.map((weatherPoint) => {
            let textColor;
            if (weatherPoint.windSpeed > 20) {
              textColor = "darkgreen";
            } else if (weatherPoint.windSpeed > 15) {
              textColor = "green";
            } else if (weatherPoint.windSpeed > 10) {
              textColor = "lightgreen";
            } else {
              textColor = "white"; // Default color
            }
            return (
              <ThemedText
                key={weatherPoint.time}
                style={[styles.cell, { backgroundColor: textColor }]}
              >
                {Math.floor(weatherPoint.windSpeed)}
              </ThemedText>
            );
          })}
        </ThemedView>
      );
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <ThemedView>
          {renderHourHeaders()}

          {renderDataRows()}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

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
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    width: 30,
    padding: 4,
    textAlign: "center",
  },
  dateCell: {
    width: 80,
    fontWeight: "bold",
  },
});

export default WeatherStat;
