import React, {Component} from 'react';
import './App.css';
import {
    Route,
    withRouter,
    Switch
} from 'react-router-dom';
import {ACCESS_TOKEN} from '../constants';

import BusinessList from '../business/BusinessList';
import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import Payment from '../payment/Payment';
import Success from '../payment/Success';
import AppHeader from '../common/AppHeader';
import FooterMenu from '../common/FooterMenu';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import {connect} from 'react-redux';

import {Layout, notification} from 'antd';
import {getLoggedUser, logout} from "../store/actions";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    componentDidMount() {
        this.props.getLoggedUser();
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.props.logout({
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Evliion App',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'Evliion App',
            description: "You're successfully logged in.",
        });
        this.props.getLoggedUser();
        this.props.history.push("/");
    }

    render() {
        if (this.props.loggedUser.job.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.props.loggedUser.job.isAuthenticated}
                           currentUser={this.props.loggedUser}
                           onLogout={this.handleLogout}/>

                <Content className="app-content">
                    <div className="container">
                        <Switch>
                            <Route exact path="/"
                                   render={(props) => <BusinessList isAuthenticated={
                                       this.props.loggedUser.job.isAuthenticated}
                                                                currentUser={this.props.loggedUser}
                                                                handleLogout={this.handleLogout} {...props} />}>
                            </Route>
                            <Route path="/login"
                                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={
                                       this.props.loggedUser.job.isAuthenticated}
                                                               currentUser={this.props.loggedUser} {...props}  />}>
                            </Route>
                            <Route path="/payment" render={
                                props => <Payment
                                    isAuthenticated={/*this.state.isAuthenticated*/true}
                                    currentUser={/*this.state.currentUser*/{
                                        name: 'jimmy johnson', paymentMethods: [
                                            {id: 0, type: 'pay', balance: '1445.72'},
                                            {
                                                id: 1,
                                                type: 'visa',
                                                expiration: '12/2023',
                                                title: 'SBI Card ****',
                                                name: 'Amit_am'
                                            },
                                            {
                                                id: 2,
                                                type: 'mastercard',
                                                expiration: '12/2023',
                                                title: 'SBI Card ****',
                                                name: 'Amit_am'
                                            },
                                            {
                                                id: 3,
                                                type: 'amex',
                                                expiration: '12/2023',
                                                title: 'SBI Card ****',
                                                name: 'Amit_am'
                                            },
                                            {
                                                id: 4,
                                                type: 'discover',
                                                expiration: '12/2023',
                                                title: 'SBI Card ****',
                                                name: 'Amit_am'
                                            },
                                        ]
                                    }} {...props}/>
                            }>
                            </Route>
                            <Route path="/success" render={
                                props => <Success
                                    currentStation={this.state.currentStation}
                                    isAuthenticated={/*this.state.isAuthenticated*/true}
                                    currentUser={/*this.state.currentUser*/{name: 'jimmy johnson'}} {...props}/>
                            }>
                            </Route>
                            <Route
                                path="/business"
                                component={BusinessList}
                            />
                            <PrivateRoute
                                authenticated={this.props.loggedUser.job.isAuthenticated}
                                path="/poll/new"
                                component={NewPoll}
                                handleLogout={this.handleLogout}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
                <FooterMenu currentUser={this.props.loggedUser}/> 
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedUser: () => dispatch(getLoggedUser()),
        logout: (logoutData) => dispatch(logout(logoutData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
