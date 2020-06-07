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

  render() {
    const date = new Date(this.date);
    return (
      <div style={this.styles.container}>
        <DateHeader date={date} />
      </div>
    );
  }
}

export default IndividualDay;
