import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoutes = ({ component, isAuthenticated, ...rest }: any) => {
  const item: any = localStorage.getItem('user');
  const token = item ? JSON.parse(item) : null;

  const routeComponent = (props: any) =>
    token?.loginToken ? React.createElement(component, props) : <Redirect to={{ pathname: '/' }} />;
  return <Route {...rest} render={routeComponent} />;
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(PrivateRoutes);
