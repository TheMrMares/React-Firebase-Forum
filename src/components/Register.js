import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';
import { Redirect } from 'react-router'

import {auth} from './../firebase/index';

const RegisterTitle = styled.h1`
    font-size: 1.3em;
`;
const RegisterSubtitle = styled.h2`
    font-size: 1em;
    margin: 5px;
`;
const RegisterForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px;
`;
const WrappedRegister = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;

export default class Register extends Component {
    constructor(){
        super()
        this.state = {
            emailValue: '',
            cemailValue: '',
            passwordValue: '',
            cpasswordValue: '',
            firstnameValue: '',
            surnameValue: '',
            redirect: false
        }
    }
    handleChange(evt){
        console.log();
        switch(evt.target.id){
            case 'regEmail':
                this.setState({emailValue: evt.target.value});
            break;
            case 'regEmailConfirmation':
                this.setState({cemailValue: evt.target.value});
            break;
            case 'regFirstname':
                this.setState({firstnameValue: evt.target.value});
            break;
            case 'regSurname':
                this.setState({surnameValue: evt.target.value});
            break;
            case 'regPassword':
                this.setState({passwordValue: evt.target.value});
            break;
            case 'regPasswordConfirmation':
                this.setState({cpasswordValue: evt.target.value});
            break;
            default:
            break;
        }
    }
    handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();
        console.log(this.state);
        //proceed register here
        auth.createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue).then(() => {
            this.setState({redirect: true});
        }).catch((error) => {
            console.log(`CODE: ${error.code}`);
            console.log(`MESSAGE: ${error.message}`);
        });
        
        
    }
    checkRender(){
        if(this.state.redirect === true) {
            return <Redirect to="/"/>
        }
    }
    render(){
        return(
            <WrappedRegister className={this.props.className}>
                {this.checkRender()}
                <RegisterTitle>Create new account</RegisterTitle>
                <RegisterForm>
                    <RegisterSubtitle>User email</RegisterSubtitle>
                    <input 
                        type='email' 
                        id='regEmail' 
                        placeholder='Your email' 
                        value={this.state.emailValue} 
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='email' 
                        id='regEmailConfirmation' 
                        placeholder='Repeat your email'
                        value={this.state.cemailValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <RegisterSubtitle>User personal information</RegisterSubtitle>
                    <input 
                        type='text' 
                        id='regFirstname' 
                        placeholder='Your first name'  
                        value={this.state.firstnameValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='text' 
                        id='regSurname' 
                        placeholder='Your  surname'  
                        value={this.state.surnameValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <RegisterSubtitle>User password</RegisterSubtitle>
                    <input 
                        type='password' 
                        id='regPassword' 
                        placeholder='Your password'  
                        value={this.state.passwordValue}
                        onChange={this.handleChange.bind(this)}
                    />
                    <input 
                        type='password' 
                        id='regPasswordConfirmation' 
                        placeholder='Repeat your password' 
                        value={this.state.cpasswordValue} 
                        onChange={this.handleChange.bind(this)}/>

                    <input type='submit' value='Register' onClick={this.handleSubmit.bind(this)}/>
                </RegisterForm>
            </WrappedRegister>
        );
    }
}