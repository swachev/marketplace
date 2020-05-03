import React from 'react'
import { Input, Icon } from 'antd'
import PropTypes from 'prop-types'
import './PlaceFinder.css'

const getInputStyle = (searchInputVisible) => {
    return {
        width: searchInputVisible ? '85%' : '0%',
        padding: searchInputVisible ? '8px' : '0'
    }
}

function PlaceFinder({setSearchInputVisibility, searchInputVisible, searchBusinessList}) {
    return (
        <span className='input-appear-animation'>
            <Icon style={{ fontSize: '24px', marginRight: '16px' }} type="search" onClick={() => setSearchInputVisibility(!searchInputVisible)}/>
            <Input style={getInputStyle(searchInputVisible)} onChange={(e) => e.target.value.length > 3 && searchBusinessList(e.target.value)}/>
        </span>
    )
}

PlaceFinder.defaultProps = {
    searchBusinessList: PropTypes.func.isRequired,
    setSearchInputVisibility: PropTypes.func.isRequired,
    searchInputVisible: PropTypes.func.bool,
}

export default PlaceFinder;
