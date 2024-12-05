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
        {Array.from({ length: 14 }, (_, i) => i + 8).map((hour) => (
          <ThemedText key={hour} style={styles.cell}>
            {hour.toString().padStart(2, "0")}
          </ThemedText>
        ))}
      </ThemedView>
    );
  };

  const renderDataRows = () => {
    if (!data || !Array.isArray(data.data)) return <Text>No data</Text>;

    return data.data.map((dayData, index) => {
      let key = dayData.day + index;
      return (
        <ThemedView key={key} style={styles.row}>
          <ThemedText style={[styles.cell, styles.dateCell]}>
            {dayData.day.substring(0, 3) || `Day ${index + 1}`}
          </ThemedText>
          {dayData.data
            .filter((point) => {
              const hour = parseInt(point.time.split(":")[0]);
              return hour >= 8 && hour <= 21;
            })
            .map((weatherPoint) => {
              const roundedWindSpeed = Math.round(weatherPoint.windSpeed);
              let backgroundColor;
              if (roundedWindSpeed > 22) {
                backgroundColor = "darkgreen";
              } else if (roundedWindSpeed > 18) {
                backgroundColor = "green";
              } else if (roundedWindSpeed > 13) {
                backgroundColor = "lightgreen";
              } else {
                backgroundColor = "white";
              }
              return (
                <ThemedText
                  key={weatherPoint.time}
                  style={[styles.cell, { backgroundColor: backgroundColor }]}
                >
                  {roundedWindSpeed}
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
    fontSize: 12,
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
    width: 20,
    padding: 4,
    textAlign: "center",
    fontSize: 10,
  },
  dateCell: {
    width: 30,
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default WeatherStat;
