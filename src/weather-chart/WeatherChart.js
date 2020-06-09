import React, { Component } from "react";

import IndividualDay from "./parts/IndividualDay";
import WeatherForm from "./parts/WeatherForm";

class WeatherChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherInformation: [],
      failedToLoad: true,
      loading: true,
    };

    this.styles = {
      container: {
        width: "90vw",
        maxWidth: "800px",
        minHeight: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexWrap: "wrap",
      },
      poweredBy: {
        fontWeight: "300",
        fontSize: "0.7em",
      },
    };
  }

  setWeatherInformation = (data) => {
    this.setState({
      failedToLoad: data.failedToLoad,
      loading: data.loading,
      weatherInformation: data.weatherInformation,
    });
  };

  render() {
    const { weatherInformation } = { ...this.state };
    return (
      <div>
        <h1>Upcoming Weather</h1>
        <WeatherForm setWeatherInformation={this.setWeatherInformation} />
        <p style={this.styles.poweredBy}>
          Powered by{" "}
          <a
            href="https://openweathermap.org/forecast5"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeatherMap API
          </a>
          .
        </p>
        <div style={this.styles.container}>
          {Object.keys(weatherInformation).map((key) => (
            <IndividualDay
              key={key}
              date={key}
              information={weatherInformation[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherChart;
