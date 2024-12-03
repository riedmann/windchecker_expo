import { Tabs } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalSearchParams } from "expo-router";
import { Item } from "@/types";

export const DataContext = createContext<{
  data: Item[];
  loading: boolean;
}>({ data: [], loading: true });

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
    <DataContext.Provider value={{ data, loading }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Details",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="info.circle.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="image"
          options={{
            title: "Image",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="photo.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: "Report",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="doc.text.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="forecast"
          options={{
            title: "Forecast",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="cloud.sun.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </DataContext.Provider>
  );
}
