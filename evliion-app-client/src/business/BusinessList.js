import React, { Component } from 'react';
import { getAllBusiness, getBusinessByPlace } from '../util/APIUtils';
import Business from '../business/Business';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon } from 'antd';
import { BUSINESS_LIST_SIZE, DEFAULT_CURRENT_LOCATION } from '../constants';
import { withRouter } from 'react-router-dom';
import { getCurrentLocation } from '../util/Helpers'
import './BusinessList.css';

class BusinessList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            business: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false,
            currentLocation: null
        };
        this.loadbusinessList = this.loadbusinessList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadbusinessList(page = 0, size = BUSINESS_LIST_SIZE) {
        let promise;
        if(this.props.place) {
            getBusinessByPlace(this.props.place, page, size);       
        } else {
            promise = getAllBusiness(page, size);
        }

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {
            const business = this.state.business.slice();
            this.setState({
                business: business.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
    }

    loadingCurrentPosition() {

        const promise = getCurrentLocation()

        if(!promise) {
            return;
        }

        promise
        .then((position) => {
            this.setState({
                currentLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            })
        })
        .catch((error) => {
            this.setState({
                currentLocation: DEFAULT_CURRENT_LOCATION,
            })
        })
    }

    componentDidMount() {
        this.loadbusinessList();
        this.loadingCurrentPosition();
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                business: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });    
            this.loadbusinessList();
        }
    }

    handleLoadMore() {
        this.loadbusinessList(this.state.page + 1);
    }

    render() {
        const businessViews = [];
        this.state.business.forEach((business) => {
            businessViews.push(<Business 
                key={business.id} 
                business={business}
                currentLocation={this.state.currentLocation}
            />)            
        });

        return (
            <div className="business-container">
                {businessViews}
                {
                    !this.state.isLoading && this.state.business.length === 0 ? (
                        <div className="no-business-found">
                            <span>No Business Found.</span>
                        </div>    
                    ): null
                }  
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-business"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }              
                {
                    this.state.isLoading ? 
                    <LoadingIndicator /> : null                     
                }
            </div>
        );
    }
}

export default withRouter(BusinessList);