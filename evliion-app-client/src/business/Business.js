import React from 'react';
import { Skeleton, Card, Typography } from 'antd';
import { getDistance } from 'geolib';
import CardCover from './CardCover'
import './Business.css'

const { Text } = Typography;

const bodyStyle = {
    height: 'auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
}

function Business ({business, currentLocation}) {    
    return (
        <Card
            hoverable
            style={{ width: '100%', marginTop: '16px', padding: '0px'}}
            cover={<CardCover url={business.photoUrl} />}
            bodyStyle={bodyStyle}
        >
            <Skeleton 
                loading={!currentLocation} 
                paragraph={false}
                size='small'
                active={true}
            >
                {
                    currentLocation && 
                    <React.Fragment>
                        <Text align='start' style={{width: '50%'}}>{business.name}</Text>
                        <Text align='end' style={{width: '50%'}}>{`Distance: ${getDistance(currentLocation, business.coordinates)} m`}</Text>
                    </React.Fragment>
                }
            </Skeleton>
        </Card>
    );
}

export default Business;