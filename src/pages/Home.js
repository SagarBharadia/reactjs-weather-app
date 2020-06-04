import react from "react";
import WeatherChart from "../weather-chart/WeatherChart";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
};

function Home() {
  return (
    <div style={styles.wrapper}>
      <WeatherChart />
    </div>
  );
}

export default Home;
