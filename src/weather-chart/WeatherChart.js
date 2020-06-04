import React, { Component } from "react";
import config from "../Config.json";

class WeatherChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherInformation: [],
      failedToLoad: true,
      loading: true,
    };
  }

  groupWeatherInformation = (wI) => {
    const map = new Map();
    wI.forEach((info) => {
      const key = info.dt_txt.split(" ")[0];
      const collection = map.get(key);
      !collection ? map.set(key, [info]) : collection.push(info);
    });
    return map;
  };

  loadWeatherInformation = () => {
    const weatherForecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${config.API_TOKEN}`;
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
    return <div></div>;
  }
}

export default WeatherChart;
