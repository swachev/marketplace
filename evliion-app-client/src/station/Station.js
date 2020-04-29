import React, { Component } from 'react';
import { getStation, getVehicle } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import './Station.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { Button } from 'antd';

class Station extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            station: null,
            vehicle: null,
            datetime: null,
            ampm: 'pm'
        }
        this.loadStation = this.loadStation.bind(this);
        this.loadVehicle = this.loadVehicle.bind(this);
    }

    loadStation(stationId) {
        this.setState({
            isLoading: true
        });
        // getStation(stationId)
        // .then(response => {
            this.setState({
                station: /*response,*/ {id: 1, name: 'CCD Koramangala'},
                isLoading: false
            });
        // }).catch(error => {
        //     if(error.status === 404) {
        //         this.setState({
        //             notFound: true,
        //             isLoading: false
        //         });
        //     } else {
        //         this.setState({
        //             serverError: true,
        //             isLoading: false
        //         });        
        //     }
        // });        
    }
      
    loadVehicle(vehicleId) {
        this.setState({
            isLoading: true
        });
        // getVehicle(vehicleId)
        // .then(response => {
            this.setState({
                vehicle: /*response,*/ {id: 1, name: 'Mahindra E20'},
                isLoading: false
            });
    }

    componentDidMount() {
        const stationId = this.props.match.params.stationId;
        this.loadStation(stationId);
        this.loadVehicle('4');
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.stationId !== nextProps.match.params.stationId) {
            this.loadStation(nextProps.match.params.stationId);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (
            <div className="station">
                { 
                    this.state.station ? (
                        <div className="station-profile">
                            <h2>Charging Options</h2>
                            <div className="station-details">
                                <div className="station-summary">
                                    <label className="station-name-label">Station name</label>
                                    <div className="station-name">{this.state.station.name}</div>
                                    <label className="vehicle-name-label">Your vehicle</label>
                                    <div className="vehicle-name">{this.state.vehicle.name}</div>
                                    <label>Expected time to charge</label>
                                    <div className="expected-charge-time">70 min.</div>
                                </div>
                            </div>

                            <div className="station-charge-date">
                                <label>Select Date</label>
                                <div className="station-flex">
                                    <input type="number" min="1" max="31" placeholder="Day"/>
                                    <input type="number" min="1" max="12" placeholder="Month"/>
                                    <input type="number" min="2019" placeholder="Year"/>
                                </div>
                            </div>

                            <div className="station-charge-time">
                                <label>Select Charging Time</label>
                                <div className="station-flex">
                                    <input type="number" min="1" max="12" placeholder="H"/>
                                    <input type="number" min="0" max="59" placeholder="M"/>
                                    <select value={this.state.ampm} onChange={e => this.setState({ampm: e.target.value})}>
                                        <option value="am">AM</option>
                                        <option value="pm">PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="station-start">
                                <label>Estimated Payable Amount <span className="price"><span>₹</span>{20}</span></label>
                                <Button type="primary" size="large" className="">Proceed to pay</Button>
                            </div>
                        </div>
                    ): null
                }
            </div>
        );
    }
}

export default Station;