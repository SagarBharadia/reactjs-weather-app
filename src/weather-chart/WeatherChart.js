import React, { Component } from "react";
import config from "../Config.json";

import IndividualDay from "./parts/IndividualDay";

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
        minWidth: "300px",
        maxWidth: "800px",
        minHeight: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
      poweredBy: {
        fontWeight: "300",
        fontSize: "1em",
      },
    };
  }

  groupWeatherInformation = (wI) => {
    const data = {};
    wI.forEach((info) => {
      const key = info.dt_txt.split(" ")[0];
      const exists = data.hasOwnProperty(key);
      if (exists) {
        data[key] = [...data[key], info];
      } else {
        data[key] = [info];
      }
    });
    return data;
  };

  loadWeatherInformation = () => {
    const weatherForecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=London&appid=${config.API_TOKEN}`;
    fetch(weatherForecastEndpoint)
      .then((res) => res.json())
      .then((data) => this.groupWeatherInformation(Array.from(data.list)))
      .then((groupedWeatherInformation) =>
        this.setState({
          loading: false,
          failedToLoad: false,
          weatherInformation: groupedWeatherInformation,
        })
      );
  };

  componentDidMount = () => {
    this.loadWeatherInformation();
  };

  render() {
    const { weatherInformation } = { ...this.state };
    return (
      <div>
        <h1>Upcoming Weather</h1>
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
