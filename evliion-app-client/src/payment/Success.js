import React, { Component } from 'react';
import LoadingIndicator  from '../common/LoadingIndicator';
import './Success.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            order: {
                id: 172492424,
                date: new Date(),
                price: '23.0',
                station: {
                    name: 'Ketan super market'
                }
            }
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(nextProps) {
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
            this.props.isAuthenticated && this.props.currentUser ? (
                <div className="success">
                    <div className="success-inner">
                        <h4>Paid Successfully To</h4>
                        <h2>{this.state.order.station.name}</h2>

                        <h2 className="price"><span className="rupee">₹</span>{this.state.order.price}</h2>

                        <div className="info">Order ID: {this.state.order.id}</div>

                        <div className="info">{this.state.order.date.toString()}</div>

                        <a href="/issue">Have an issue?</a>
                    </div>
                </div>
            ): null
        );
    }
}

export default Success;
