import React, { Component } from "react";
import DateHeader from "./DateHeader";

class IndividualDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px #e9687e",
        minWidth: "175px",
        width: "50%",
        maxWidth: "200px",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        margin: "10px",
      },
      mainTemp: {
        fontSize: "1.2em",
      },
      feelsLikeTemp: {
        fontSize: "0.8em",
      },
    };

    this.initialStyles = { ...this.styles };
  }

  hoveredStyles = () => {
    this.styles.container = {
      ...this.styles.container,
      backgroundColor: "#e9687e",
      cursor: "pointer",
      color: "#fff",
      boxShadow: "5px 10px 10px #fdc2b1",
    };
  };

  unhoveredStyles = () => {
    this.styles.container = this.initialStyles.container;
  };

  averages = () => {
    let totalTemp = 0;
    let totalFeelsLikeTemp = 0;
    let icon = null;
    let iconAlt = "";
    this.props.information.forEach((slot, index) => {
      const slotAverage = (slot.main.temp_max + slot.main.temp_min) / 2;
      totalTemp += slotAverage;
      totalFeelsLikeTemp += slot.main.feels_like;
      const splitTime = slot.dt_txt.split(" ")[1];
      if (splitTime === "12:00:00") {
        icon = slot.weather[0].icon;
        iconAlt = slot.weather[0].description;
      } else if (index === 0 && icon === null) {
        icon = slot.weather[0].icon;
        iconAlt = slot.weather[0].description;
      }
    });

    const returnLoad = {
      avgTemp:
        Math.round((totalTemp / this.props.information.length) * 10) / 10,
      avgFeelsLikeTemp:
        Math.round((totalFeelsLikeTemp / this.props.information.length) * 10) /
        10,
      avgIcon: icon,
      avgIconAlt: iconAlt,
    };
    return returnLoad;
  };

  toggleHover = () => {
    const newState = !this.state.hovered;
    this.setState({
      hovered: newState,
    });
  };

  render() {
    const date = new Date(this.props.date);

    const { avgTemp, avgFeelsLikeTemp, avgIcon, avgIconAlt } = {
      ...this.averages(),
    };

    this.state.hovered ? this.hoveredStyles() : this.unhoveredStyles();

    return (
      <div
        style={this.styles.container}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <DateHeader date={date} />
        <p style={this.styles.mainTemp}>
          {avgTemp}
          <sup>&#8451;</sup>
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${avgIcon}@2x.png`}
          alt={avgIconAlt}
        />
        <p style={this.styles.feelsLikeTemp}>
          Feels like
          <br />
          {avgFeelsLikeTemp}
          <sup>&#8451;</sup>
        </p>
      </div>
    );
  }
}

export default IndividualDay;
