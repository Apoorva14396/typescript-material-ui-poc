import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import DataEdit from './components/data/DataEdit';
import DataList from './components/data/DataList';
import DataView from './components/data/DataView';
import Header from './components/header/Header';
import LandingPage from './components/landingPage/LandingPage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import history from './history';
import { connection } from './lib/axiosInstance';
import PrivateRoute from './PrivateRoutes';
import { setUserInfo } from './redux/actions/userInfoAction';
import DepartmentAnalytics from './components/data/DepartmentAnalytics';
import UserRegisteredAnalytics from './components/data/UserRegisteredAnalytics';

const App = ({ setUserInfo }: any) => {
  React.useEffect(() => {
    const item: any = localStorage.getItem('user');
    const user = item ? JSON.parse(item) : null;

    if (user) {
      connection.defaults.headers.authorization = user['loginToken'];
      setUserInfo(user);
    }
  });

  var sectionStyle = {
    width: '100%',
    height: '200vh',
    backgroundColor: '#AD288C'
  };
  return (
    <div style={sectionStyle}>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/list' exact component={DataList} />
            <PrivateRoute path='/data/view/:id' exact component={DataView} />
            <PrivateRoute path='/data/edit/:id' exact component={DataEdit} />
            <PrivateRoute path='/genderPerDepartmentAnalytics' exact component={DepartmentAnalytics} />
            <PrivateRoute path='/userRegisteredPerHourAnalytics' exact component={UserRegisteredAnalytics} />
          </Switch>
        </div>
      </Router>
      <ToastContainer position='bottom-right' />
    </div>
  );
};
const mapDispatchToProps = {
  setUserInfo: setUserInfo
};

export default connect(null, mapDispatchToProps)(App);
