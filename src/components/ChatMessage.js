// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
import {firestore} from './../firebase/index';
// # STYLED
const Text = styled.p`
    margin: 7px 3px 3px 3px;
    font-size: 0.8em;
    font-family: Arial !important;
    word-wrap: break-word;
    max-width: 100%;
    padding: 10px;
    border-radius: 10px;
    background: ${colors.verydark};
`;
const Author = styled.h1`
    margin: 2px;
    font-size: 0.8em;
`;
const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border: 1px solid ${colors.smoothdark};
    border-radius: 100%;
`
const ContentArea = styled.div`
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-width: 90%;
`;
const AvatarArea = styled.div`
    padding-top: 10px;
    flex: 0 0 auto;  
`;
const WrappedMessage = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
`;
// # COMPONENT
export default class ChatMessage extends Component {
    constructor(){
        super();
        this.state = {
            author: null
        }
    }
    componentDidMount(){
        firestore.collection('users').doc(this.props.userID).get().then((doc) => {
            this.setState({
                author: doc.data()
            })
        }).catch((error) => {
            console.log(`# READ AUTHOR ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    getAuthor(fieldname){
        if(this.state.author != null){
            return this.state.author[fieldname];
        } else {
            return 'no image';
        }
        
    }
    render(){
        return(
            <WrappedMessage>
                <AvatarArea>
                    <Avatar src={this.getAuthor('imageURL')} onError={this.replaceImage.bind(this)}/>        
                </AvatarArea>
                <ContentArea>
                    <Author>{`${this.getAuthor('firstname')} ${this.getAuthor('surname')}`}</Author>
                    <Text>{this.props.text}</Text>
                </ContentArea>
            </WrappedMessage>
        );
    }
}