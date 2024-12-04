import { Tabs } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalSearchParams } from "expo-router";
import { Item } from "@/types";

interface DataContextType {
  data: Item[];
  loading: boolean;
  location?: {
    longitude: string;
    latitude: string;
  };
  refetch: () => Promise<void>;
}

export const DataContext = createContext<DataContextType>({
  data: [],
  loading: true,
  refetch: async () => {},
});

export default function DetailsLayout() {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.riedmann.rocks/windchecker/items/item?filter[spots][eq]=${params.id}`
        );
        const result = await response.json();
        result.data.location = {
          longitude: params.longitude,
          latitude: params.latitude,
        };

        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        location: {
          longitude: params.longitude as string,
          latitude: params.latitude as string,
        },
        refetch: async () => {
          try {
            const response = await fetch(
              `https://api.riedmann.rocks/windchecker/items/item?filter[spots][eq]=${params.id}`
            );
            const result = await response.json();
            result.data.location = {
              longitude: params.longitude,
              latitude: params.latitude,
            };

            setData(result.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        },
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Webcam",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="webcam" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="file-document"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="forecast"
          options={{
            title: "Forecast",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="weather-partly-cloudy"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chart"
          options={{
            title: "Chart",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="chart-line"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </DataContext.Provider>
  );
}
