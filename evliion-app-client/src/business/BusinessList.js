import React, { Component } from 'react';
import Business from '../business/Business';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, Row, Col, notification } from 'antd';
import { DEFAULT_CURRENT_LOCATION } from '../constants';
import { getCurrentLocation } from '../util/Helpers'
import './BusinessList.css';
import {connect} from 'react-redux';
import { getAllBusinessList } from "../store/actions";

const hasBusiness = (businessListRequest) => businessListRequest.data && businessListRequest.data.content && businessListRequest.data.content.length > 0
class BusinessList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: null
        };
        this.renderBusinessList = this.renderBusinessList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
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
        this.props.getAllBusinessList()
        this.loadingCurrentPosition()
    }

    handleLoadMore() {
        this.props.getAllBusinessList(this.state.page + 1)
    }

    renderBusinessList(businessListRequest) {
        return hasBusiness(businessListRequest) && 
        businessListRequest.data.content.map((business) => 
            (
                <Col key={business.id} xs={24} md={12} lg={8}>
                    <Business 
                        business={business}
                        currentLocation={this.state.currentLocation}
                    />
                </Col>
            )
        )       
    }

    render() {
        const businessListRequest = this.props.businessListRequest
        return (
            <Row gutter={[16, 4]}>
                { 
                    businessListRequest.error &&             
                    notification.error({
                        message: 'Business list fetch error',
                        description: 'Sorry! Something went wrong. Please try again!'
                    })  
                }
                { this.renderBusinessList(businessListRequest) }
                {
                    !businessListRequest.isFetching && !hasBusiness(businessListRequest) ? (
                        <div className="no-business-found">
                            <span>No Business Found.</span>
                        </div>    
                    ): null
                }  
                {
                    !businessListRequest.isFetching && !businessListRequest.last ? (
                        <div className="load-more-business"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={businessListRequest.isFetching}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }              
                {
                    businessListRequest.isFetching ? <LoadingIndicator /> : null                     
                }
            </Row>
        );    }
}

const mapStateToProps = state => {
    return {
        businessListRequest: state.businessList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBusinessList: () => dispatch(getAllBusinessList()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);