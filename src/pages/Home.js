import React from "react";
import WeatherChart from "../weather-chart/WeatherChart";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    padding: "10px",
  },
};

const Home = () => {
  return (
    <div style={styles.wrapper}>
      <WeatherChart />
    </div>
  );
};

export default Home;
