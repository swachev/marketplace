import React, { useEffect, useState } from 'react'
import { getCurrentReverseGeolocation } from '../../../util/Helpers'
import { notification, Icon, Typography } from 'antd'

const Text = Typography.Text

function CurrentAddress() {
    const [currentReverseGeolocation, setCurrentReverseGeolocation] = useState(null)
    
    useEffect(() => {
        getCurrentReverseGeolocation()
        .then((response) => {
            response.json().then(json => {
                if(!response.ok) {
                    notification.error({
                        message: 'Error fetching current location',
                        description: 'Sorry! Something went wrong. Please try again!'
                    });   
                }
                setCurrentReverseGeolocation(json)
            })
        })
    }, [])

    return (
        <React.Fragment>
            <Icon type="environment" />
            <Text strong style={{ marginLeft: '8px' }}>
                {
                    currentReverseGeolocation && currentReverseGeolocation.address &&
                    `${currentReverseGeolocation.address.city}, ${currentReverseGeolocation.address.road}`
                }
            </Text>
        </React.Fragment>
    )
}

export default CurrentAddress

