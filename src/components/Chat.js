// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import ChatMessage from './ChatMessage';
import AddMessage from './AddMessage';
// # STYLED
const ChatArea = styled.div`
    height: 400px;
    overflow-y: scroll;
`;
const SendArea = styled.form`
    border-top: 1px solid ${colors.smoothdark};
`;
const WrappedChat = styled.div`
    border: 1px solid ${colors.smoothdark};
    border-radius: 10px;
    background: ${colors.dark};
    padding: 10px;
    width: 60%;
    ${SendArea}, ${ChatArea} {
        padding: 5px;
    }
`;
// # COMPONENT
class Chat extends Component {
    render() {
        return(
            <WrappedChat>
                <ChatArea>
                    {this.props.messages.messages.map((item ,index) => {
                        return <ChatMessage text={item.message} userID={item.userID} key={index}/>
                    })}
                </ChatArea>
                <SendArea>
                    <AddMessage/>
                </SendArea>
            </WrappedChat>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};
export default connect(mapStateToProps, null)(Chat);