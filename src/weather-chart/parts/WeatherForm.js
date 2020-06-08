import React, { Component } from "react";
import config from "../../Config.json";

class WeatherForm extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      form: {
        display: "flex",
        flexDirection: "row",
      },
    };

    this.state = {
      city: "London",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.loadWeatherInformation();
  };

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
    const weatherForecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${this.state.city}&appid=${config.API_TOKEN}`;
    fetch(weatherForecastEndpoint)
      .then((res) => res.json())
      .then((data) => this.groupWeatherInformation(Array.from(data.list)))
      .then((groupedWeatherInformation) =>
        this.props.setWeatherInformation({
          loading: false,
          failedToLoad: false,
          weatherInformation: groupedWeatherInformation,
        })
      )
      .catch((error) =>
        this.props.setWeatherInformation({
          loading: false,
          failedToLoad: true,
          weatherInformation: [],
        })
      );
  };

  componentDidMount = () => {
    this.loadWeatherInformation();
  };

  render() {
    const { city } = { ...this.state };
    return (
      <form onSubmit={this.onSubmit} style={this.styles.form}>
        <input name="city" value={city} onChange={this.onChange} required />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default WeatherForm;
