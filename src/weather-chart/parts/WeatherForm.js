import React, { Component } from "react";

class WeatherForm extends Component {
  constructor(props) {
    super(props);

    this.styles = {
      form: {
        display: "flex",
        flexDirection: "row",
      },
      inputField: {
        border: "none",
        outlin: "none",
        borderBottom: "solid 1px #000",
        marginRight: "20px",
      },
      button: {
        background: "#f7e298",
        outline: "0",
        border: "none",
        padding: "5px 20px",
        borderRadius: "5px",
      },
    };

    this.state = {
      city: this.props.initialLocation,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loadWeatherInformation(this.state.city);
  };

  render() {
    const { city } = { ...this.state };
    return (
      <form onSubmit={this.onSubmit} style={this.styles.form}>
        <input
          name="city"
          value={city}
          onChange={this.onChange}
          style={this.styles.inputField}
          required
        />
        <button type="submit" style={this.styles.button}>
          Go
        </button>
      </form>
    );
  }
}

export default WeatherForm;
