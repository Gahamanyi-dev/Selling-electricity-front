import React, { Component } from "react";
import MeterDataService from "../services/meter.service";

export default class Meter extends Component {
  constructor(props) {
    super(props);
    this.onChangeMeterNumber = this.onChangeMeterNumber.bind(this);
    this.onChangeMoney = this.onChangeMoney.bind(this);
    this.getMeter = this.getMeter.bind(this);
    this.updateMeter = this.updateMeter.bind(this);
    this.deleteMeter = this.deleteMeter.bind(this);

    this.state = {
      currentMeter: {
        id: null,
        meter_number: "",
        money: 0,
        token: "",
        days:0,
        remaining_days:0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMeter(this.props.match.params.id);
  }

  onChangeMeterNumber(e) {
    const meterNumber = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMeter: {
          ...prevState.currentMeter,
          meterNumber: meterNumber
        }
      };
    });
  }

  onChangeMoney(e) {
    const money = e.target.value;
    
    this.setState(prevState => ({
      currentMeter: {
        ...prevState.currentMeter,
        money: money
      }
    }));
  }

  getMeter(id) {
    MeterDataService.get(id)
      .then(response => {
        this.setState({
          currentMeter: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMeter() {
    MeterDataService.update(
      this.state.currentMeter.id,
      this.state.currentMeter
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The meter was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMeter() {    
    MeterDataService.delete(this.state.currentMeter.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/meters')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMeter } = this.state;

    return (
      <div>
        {currentMeter ? (
          <div className="edit-form">
            <h4>Meter</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMeter.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMeter.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMeter.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentMeter.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMeter}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMeter}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a meter...</p>
          </div>
        )}
      </div>
    );
  }
}
