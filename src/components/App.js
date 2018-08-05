// # IMPORTS
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled, { css, injectGlobal } from 'styled-components';
import colors from './../constants/colors';
import Header from './Header';
import Footer from './Footer';
import Land from './Land';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { connect } from "react-redux";

// # STYLED
const StyledHeader = styled(Header)``;
const StyledFooter = styled(Footer)``;
const StyledLand = styled(Land)``;
const StyledHome = styled(Home)``;
const StyledLogin = styled(Login)``;
const StyledRegister = styled(Register)``;

const WrappedApp = styled.div`
  width: 100%;
  min-height: 100vh
  display: flex;
  flex-direction: column;
  background: ${colors.dark};
  ${StyledHeader}, ${StyledFooter} {
    width: 100%;
  }
  ${StyledHeader} {
    border-bottom: 1px solid ${colors.smooth}
  }
  ${StyledFooter}{
    border-top: 1px solid ${colors.smooth}
  }
`;
injectGlobal`
  html,body {
    margin: 0; padding: 0;
    color: ${colors.dark};
  }
  img {
    max-width: 100%; position: relative;
  }
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    transition: 0.15s ease;
  }
  input {
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    appearance: none;
  }
  input[type=submit]{
    border: none;
    background: ${colors.special};
    color: ${colors.fair};
    text-transform: uppercase;
    font-weight: bold;
  }
  input[type=email], input[type=password], input[type=text]{
    border: 1px solid ${colors.grey};
    background: ${colors.fair};
  }
`;
// # COMPONENT

const ProtectedRoute = ({component: Component, authenticated, ...rest}) => {
  return(
    <Route {...rest} render={(props) => {
      if(authenticated === true) {
        return <Component {...props} {...rest} />
      } else {
        return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
    }}/>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <WrappedApp>
          <StyledHeader/>
            <Route exact path='/landing' component={StyledLand}/>
            <ProtectedRoute exact path='/' component={StyledHome} authenticated={this.props.auths.isAuth}/>
            <Route exact path='/login' component={StyledLogin}/>
            <Route exact path='/register' component={StyledRegister}/>
          <StyledFooter/>
        </WrappedApp>
      </Router>
    );
  }
}

// # REDUX
const mapStateToProps = state => {
  return { 
      auths: state.auths
  };
};

export default connect(mapStateToProps)(App);
