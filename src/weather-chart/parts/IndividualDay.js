import React, { Component } from "react";
import DateHeader from "./DateHeader";

class IndividualDay extends Component {
  constructor(props) {
    super(props);

    this.date = props.date;
    this.information = props.information;

    this.styles = {
      container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px #e9687e",
        width: "16%",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
      },
    };
  }

  averageTemperature = () => {
    let total = 0;
    this.information.forEach((slot) => {
      const slotAverage = (slot.main.temp_max + slot.main.temp_min) / 2;
      total += slotAverage;
    });
    return Math.round(total / this.information.length).toFixed(1);
  };

  render() {
    const date = new Date(this.date);

    return (
      <div style={this.styles.container}>
        <DateHeader date={date} />
        <p>
          {this.averageTemperature()}
          <sup>&#8451;</sup>
        </p>
      </div>
    );
  }
}

export default IndividualDay;
