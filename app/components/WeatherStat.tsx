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
              const roundedTemp = Math.round(weatherPoint.temperature);

              // Wind speed colors
              let windBackground;
              if (roundedWindSpeed > 22) {
                windBackground = "darkgreen";
              } else if (roundedWindSpeed > 18) {
                windBackground = "green";
              } else if (roundedWindSpeed > 13) {
                windBackground = "lightgreen";
              } else {
                windBackground = "white";
              }

              // Temperature colors
              let tempBackground;
              if (roundedTemp > 30) {
                tempBackground = "#FF4444"; // Red
              } else if (roundedTemp > 20) {
                tempBackground = "#FFA500"; // Orange
              } else if (roundedTemp > 10) {
                tempBackground = "#FFFF00"; // Yellow
              } else if (roundedTemp > 5) {
                tempBackground = "#F5F0CD"; // Light blue
              } else if (roundedTemp > 0) {
                tempBackground = "#C0D6E8"; // Royal blue
              } else if (roundedTemp > -5) {
                tempBackground = "#2C4E80"; // Blue
              } else {
                tempBackground = "#00008B"; // Dark blue
              }

              const getWindDirectionArrow = (degrees: number) => {
                // Normalize the degrees to 0-360 range and add 180 to flip the direction
                // (since wind direction indicates where wind comes FROM)
                degrees = (degrees + 180) % 360;

                // Round to nearest 45 degrees (8 directions)
                const dir = Math.round(degrees / 45);

                // Return appropriate arrow based on direction
                switch (dir % 8) {
                  case 0:
                    return "↑"; // N
                  case 1:
                    return "↗"; // NE
                  case 2:
                    return "→"; // E
                  case 3:
                    return "↘"; // SE
                  case 4:
                    return "↓"; // S
                  case 5:
                    return "↙"; // SW
                  case 6:
                    return "←"; // W
                  case 7:
                    return "↖"; // NW
                  default:
                    return "↑";
                }
              };

              return (
                <ThemedView key={weatherPoint.time} style={styles.dataCell}>
                  <ThemedText
                    style={[
                      styles.cellText,
                      { backgroundColor: windBackground },
                    ]}
                  >
                    {roundedWindSpeed}
                  </ThemedText>
                  <ThemedText style={styles.directionText}>
                    {getWindDirectionArrow(weatherPoint.windDirection)}
                  </ThemedText>

                  <ThemedText
                    style={[
                      styles.cellText,
                      { backgroundColor: tempBackground },
                    ]}
                  >
                    {roundedTemp}
                  </ThemedText>
                  {roundedTemp < 5 && (
                    <ThemedText style={styles.directionText}>❄️</ThemedText>
                  )}
                </ThemedView>
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
          <ScrollView showsVerticalScrollIndicator={true}>
            {renderDataRows()}
          </ScrollView>
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
    backgroundColor: "white",
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 4,
  },
  cell: {
    width: 25,
    padding: 4,
    textAlign: "center",
    fontSize: 10,
  },
  dateCell: {
    width: 35,
    fontWeight: "bold",
    fontSize: 10,
  },
  dataCell: {
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    width: "100%",
    padding: 2,
    textAlign: "center",
    fontSize: 10,
  },
  directionText: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default WeatherStat;
