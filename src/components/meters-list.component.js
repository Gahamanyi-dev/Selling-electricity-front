import React, { Component } from "react";
import MeterDataService from "../services/meter.service";
import { Link } from "react-router-dom";

export default class MetersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchToken = this.onChangeSearchToken.bind(this);
    this.retrieveMeters = this.retrieveMeters.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMeter = this.setActiveMeter.bind(this);
    this.removeAllMeters = this.removeAllMeters.bind(this);
    this.searchToken = this.searchToken.bind(this);

    this.state = {
      meters: [],
      curentMeter: null,
      currentIndex: -1,
      searchToken: ""
    };
  }

  componentDidMount() {
    this.retrieveMeters();
  }

  onChangeSearchToken(e) {
    const searchToken = e.target.value;

    this.setState({
      searchToken: searchToken
    });
  }

  retrieveMeters() {
    MeterDataService.getAll()
      .then(response => {
        this.setState({
          meters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMeters();
    this.setState({
      curentMeter: null,
      currentIndex: -1
    });
  }

  setActiveMeter(meter, index) {
    this.setState({
      curentMeter: meter,
      currentIndex: index
    });
  }
  
  removeAllMeters() {
    MeterDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchToken() {
    this.setState({
      curentMeter: null,
      currentIndex: -1
    });

    MeterDataService.getByToken(this.state.searchToken)
      .then(response => {
        this.setState({
          meters: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchToken, meters, curentMeter, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchToken}
              onChange={this.onChangeSearchToken}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchToken}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Meters List</h4>
<div>
          <ul className="list-group">
            {/* {meters && */}
              {meters.map((meter, index) => (
                <li
                data-testid={`meter-${index}`}
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMeter(meter, index)}
                  key={index}
                >
                  {meter.meter_number}
                </li>
              ))}
          </ul>
          </div>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllMeters}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {curentMeter ? (
            <div>
              <h4>Meters</h4>
              <div>
                <label>
                  <strong>Meter number:</strong>
                </label>{" "}
                {curentMeter.meter_number}
              </div>
              <div>
                <label>
                  <strong>Money:</strong>
                </label>{" "}
                {curentMeter.money}
              </div>
              {/* {curentMeter.remaining_days !== 0? ( */}
  {/* <div>
  <label>
    <strong>Token:</strong>
  </label>{" "}
  {curentMeter.token.token}
</div> */}
              {/* ):null} */}
            
              <div>
                <label>
                  <strong>Remaining days:</strong>
                </label>{" "}
                {curentMeter.remaining_days}
              </div>
{curentMeter.remaining_days === 0?(
  <Link
                to={"/tutorials/" + curentMeter._id}
                className="badge badge-warning"
              >
                buy token
              </Link>
):null
}
              
            </div>
          ) : (
            <div>
              <br />
              <p data-testid="please_click">Please click on a meter...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}