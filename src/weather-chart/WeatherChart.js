import React, { Component } from "react";
import config from "../Config.json";

import IndividualDay from "./parts/IndividualDay";
import WeatherForm from "./parts/WeatherForm";

class WeatherChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherInformation: [],
      failedToLoad: true,
      loading: true,
      initialLocation: "London",
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

  loadWeatherInformation = (city) => {
    const weatherForecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${config.API_TOKEN}`;
    fetch(weatherForecastEndpoint)
      .then((res) => res.json())
      .then((data) => this.groupWeatherInformation(Array.from(data.list)))
      .then((groupedWeatherInformation) =>
        this.setState({
          loading: false,
          failedToLoad: false,
          weatherInformation: groupedWeatherInformation,
        })
      )
      .catch((error) =>
        this.setState({
          loading: false,
          failedToLoad: true,
          weatherInformation: [],
        })
      );
  };

  componentDidMount() {
    this.loadWeatherInformation(this.state.initialLocation);
  }

  render() {
    const { weatherInformation, initialLocation } = { ...this.state };
    return (
      <div>
        <h1>Upcoming Weather</h1>
        <WeatherForm
          loadWeatherInformation={this.loadWeatherInformation}
          initialLocation={initialLocation}
        />
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
