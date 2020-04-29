import React, {Component} from 'react';
import PollList from '../../poll/PollList';
import {getUserProfile} from '../../util/APIUtils';
import {Avatar, Tabs} from 'antd';
import {getAvatarColor} from '../../util/Colors';
import {formatDate} from '../../util/Helpers';
import LoadingIndicator from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import PaymentCards from "../payementCards/PaymentCards";
import {connect} from 'react-redux';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        };
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    render() {
        const loggedUser = this.props.loggedUser;
        if (loggedUser.job.isLoading) {
            return <LoadingIndicator/>;
        }

        if (loggedUser.job.error) {
            return <NotFound/>;
        }

        if (loggedUser.job.error) {
            return <ServerError/>;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };
        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle"
                                            style={{backgroundColor: getAvatarColor(loggedUser.name)}}>
                                        {loggedUser.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{loggedUser.name}</div>
                                    <div className="username">@{loggedUser.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(loggedUser.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                      animated={false}
                                      tabBarStyle={tabBarStyle}
                                      size="large"
                                      className="profile-tabs">
                                    <TabPane tab={`${loggedUser.pollCount} Polls`} key="1">
                                        <PollList username={loggedUser.username}
                                                  type="USER_CREATED_POLLS"/>
                                    </TabPane>
                                    <TabPane tab={`${loggedUser.voteCount} Votes`} key="2">
                                        <PollList username={loggedUser.username} type="USER_VOTED_POLLS"/>
                                    </TabPane>
                                    <TabPane tab={`${loggedUser.paymentCardCount} Payement Cards`} key="3">
                                        <PaymentCards/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser
    }
};

export default connect(mapStateToProps)(Profile);
