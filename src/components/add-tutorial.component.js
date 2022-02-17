import React, { Component } from "react";
import MeterDataService from "../services/meter.service";

export default class AddMeter extends Component {
  constructor(props) {
    super(props);
    this.onChangeMeterNumber = this.onChangeMeterNumber.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.saveMeter = this.saveMeter.bind(this);
    this.newMeter = this.newMeter.bind(this);

    this.state = {
      id: null,
      meter_number: "",
      money: 0,
      token: "",
      days:0,
      remaining_days:0,
      submitted: false
    };
  }

  onChangeMeterNumber(e) {
    this.setState({
      meter_number: e.target.value
    });
  }

  onChangeMoney(e) {
    this.setState({
      money: e.target.value
    });
  }

  saveMeter() {
    var data = {
      meter_number: this.state.meter_number,
      money: this.state.money
    };

    MeterDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          meter_number: response.data.meter_number,
          money: response.data.money,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMeter() {
    this.setState({
      id: null,
      meter_number: "",
      money: 0,
      token: "",
      days:0,
      remaining_days:0,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMeter}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Meter number</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.meter_number}
                onChange={this.onChangeMeterNumber}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Money</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.money}
                onChange={this.onChangeMoney}
                name="description"
              />
            </div>

            <button onClick={this.saveMeter} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
