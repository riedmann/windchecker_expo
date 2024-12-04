import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Line } from "react-native-svg";

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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=CRMvhmj2yd8oLgS3&lat=${latitude}&lon=${longitude}&windspeed=${windunit}&asl=396&format=json`
        );
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
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
        <ThemedText>
          Missing coordinates. Please select a spot with valid location data.
        </ThemedText>
      </ThemedView>
    );
  }

  if (loading || !data?.data_1h) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading weather data...</ThemedText>
      </ThemedView>
    );
  }

  const getDayName = (dateStr: string) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const chartData = {
    labels: [
      ...data.data_1h.time
        .filter(
          (time: string, index: number) =>
            index === 0 ||
            !time.startsWith(data.data_1h.time[index - 1].split(" ")[0])
        )
        .map((time: string) => getDayName(time.split(" ")[0])),
    ],
    datasets: [
      {
        data: data.data_1h.windspeed,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Wind Speed ({windunit})</ThemedText>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

          propsForVerticalLabels: {
            fontSize: 10,
          },
          horizontalOffset: 30,
        }}
        withHorizontalLines={true}
        withVerticalLines={false}
        withDots={false}
        withShadow={false}
        decorator={() => {
          const dayChangeIndexes = data.data_1h.time
            .map((time: string, index: number) =>
              index > 0 &&
              !time.startsWith(data.data_1h.time[index - 1].split(" ")[0])
                ? index
                : null
            )
            .filter((index: any) => index !== null);

          return (
            <>
              {dayChangeIndexes.map((index: any, i: any) => {
                const x =
                  (index / data.data_1h.windspeed.length) *
                    (Dimensions.get("window").width - 64) +
                  16;
                return (
                  <Line
                    key={i}
                    x1={x}
                    y1={16}
                    x2={x}
                    y2={220 - 16}
                    stroke="rgba(0, 0, 0, 0.2)"
                    strokeWidth="1"
                  />
                );
              })}
            </>
          );
        }}
        bezier
        style={styles.chart}
      />
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
