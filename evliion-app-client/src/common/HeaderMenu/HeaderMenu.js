import React, { useState } from 'react';
import { Layout, Row, Col, Typography , Button} from 'antd';
import PlaceFinder from './PlaceFinder'
import CurrentAddress from './CurrentAddress';

const Header = Layout.Header;
const Text = Typography.Text

const Badge = () => <Button style={{ fontSize: '18px', color: '#fff', background: '#bfbfbf'}} shape='round' icon='shopping-cart'>
    <Text style={{fontSize: '14px', color: '#fff'}}>0</Text>
</Button>

function HeaderMenu () {
    const [searchInputVisible, setSearchInputVisibility] = useState(false)
    return (
        <Header style={{ borderBottom: '1px solid #808080', paddingLeft: '16px', paddingRight: '16px' }}>
            <Row>
                <Col align='start' span={!searchInputVisible ? 6 : 24}>
                    <PlaceFinder setSearchInputVisibility={setSearchInputVisibility} searchInputVisible={searchInputVisible} />
                </Col>
                <Col align='center' style={{ display: searchInputVisible ? 'none' : 'inherit'}} span={12}><CurrentAddress /></Col>
                <Col align='end' style={{ display: searchInputVisible ? 'none' : 'inherit'}} span={6}><Badge /></Col>
            </Row>
        </Header>
    );
}

export default HeaderMenu;