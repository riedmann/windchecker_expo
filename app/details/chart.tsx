import React, { useContext } from "react";

import { DataContext } from "./_layout";
import { WeatherChart } from "../components/WeatherChart";

export default function ChartScreen() {
  const { location } = useContext(DataContext);

  return (
    <WeatherChart
      latitude={location?.latitude || ""}
      longitude={location?.longitude || ""}
    />
  );
}
