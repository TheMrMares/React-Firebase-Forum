import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import Item from './Item';
import {auth} from './../firebase/index';
import { connect } from "react-redux";

const StyledItem = styled(Item)`
    
`;
const SignOutButton = styled.button`
    padding: 5px 20px;
    background: none;
    border: 2px solid ${colors.special};
    color: ${colors.special};
    border-radius: 10px;
    font-weight: bolder;
    justify-self: flex-end;
    &:hover{
        color: ${colors.fair};
        background: ${colors.special};
    }
`;
const WrappedNavigation = styled.ul`
    background: ${colors.smooth};
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0px;
    margin: 30px 0px 0px 0px;
`;

const mapStateToProps = state => {
    return { 
        auths: state.auths
    };
};

class Navigation extends Component {
    constructor(){
        super()
        this.state = {
            items: [
                        {name: 'Login', path: '/login'},
                        {name: 'Register', path: '/register'},
                        {name: 'Landing', path: '/landing'},
                        {name: 'Home', path: '/'},
                    ]
        }
    }
    renderSignOut(){
        if(this.props.auths.isAuth === true) {
            return <SignOutButton onClick={this.handleSignOut.bind(this)}>Sign Out</SignOutButton>
        }
    }
    renderItem(text, url, key){
        return <StyledItem text={text} url={url} key={key}/>
    }
    handleSignOut(){
        auth.signOut().then(() => {
            console.log('Signed out');
        }).catch((error) => {
            console.log(`CODE: ${error.code}`);
            console.log(`MESSAGE: ${error.message}`);
        });
    }
    render(){
        return(
            <WrappedNavigation className={this.props.className}>
                    {this.state.items.map((item, index) => {
                        return this.renderItem(item.name, item.path, index);
                    })}
                    {this.renderSignOut()}
            </WrappedNavigation>
        );
    }
}

export default connect(mapStateToProps)(Navigation);