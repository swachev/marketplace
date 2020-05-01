import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Affix, Menu, Typography } from 'antd';
import { ShopOutlined, HeartOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import './FooterMenu.css'
const Footer = Layout.Footer;
const Text = Typography.Text
class FooterMenu extends Component {
    constructor(props) {
        super(props);   
    }

    render() {        
        return (
            <Affix style={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
                <Footer id='menu-footer'>
                    <Menu mode='horizontal'>
                        <Menu.Item direction='vertical' align='center'>
                            <Link to="/">
                                <div className='menu-footer_item'>
                                    <ShopOutlined style={{ marginRight: '0px', fontSize: '24px' }} />
                                    <Text>For you</Text>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item direction='vertical' align='center'>
                            <Link to="/favorites">
                                <div className='menu-footer_item'>
                                    <HeartOutlined style={{ marginRight: '0px', fontSize: '24px' }} />
                                    <Text>Favorite</Text>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item direction='vertical' align='center'>
                            <Link to="/list">
                                <div className='menu-footer_item'>
                                    <UnorderedListOutlined style={{ marginRight: '0px', fontSize: '24px' }} />
                                    <Text>Your list</Text>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item direction='vertical' align='center'>
                            <Link to={`/users/${this.props.currentUser.username}`}>
                                <div className='menu-footer_item'>
                                    <UserOutlined style={{ marginRight: '0px', fontSize: '24px' }} />
                                    <Text>Profile</Text>
                                </div>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Footer>
            </Affix>
        );
    }
}

export default FooterMenu;