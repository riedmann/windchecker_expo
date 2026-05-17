export const transformWeatherData = (input) => {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Group data by day
  const groupedData = input.data_1h.time.reduce((acc, timestamp, index) => {
    const date = new Date(timestamp);
    const day = daysOfWeek[date.getDay()];
    const time = timestamp.split(" ")[1]; // Extract only the time part

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push({
      time,
      temperature: input.data_1h.temperature[index],
      windSpeed: input.data_1h.windspeed[index],
      windDirection: input.data_1h.winddirection[index],
      pictocode: input.data_1h.pictocode[index],
      isDaylight: input.data_1h.isdaylight[index],
    });

    return acc;
  }, {});

  // Format the final output structure
  return {
    data: Object.entries(groupedData).map(([day, data]) => ({
      day,
      data,
    })),
  };
};
