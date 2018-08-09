// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore} from './../firebase/index';
import UserComment from './UserComment';
import uuidv4 from 'uuid/v4'
// # STYLED
const WrappedCommentList = styled.div`
    border-top: 1px solid ${colors.smoothdark};
    overflow-y: scroll;
    padding: 5px;
`;
// # COMPONENT
export default class CommentList extends Component {
    constructor(){
        super();
        this.sub = null;
        this.state = {
            comments: []
        }
    }
    componentDidMount(){
        //comments live update
        this.sub = firestore.collection('threads').doc(this.props.refID).collection('comments')
        .onSnapshot(() => {
            firestore.collection('threads').doc(this.props.refID).collection('comments').orderBy('created', 'desc').get().then((data) => {
                let filteredData = data.docs.filter((item) => {
                    if(item.ref.id !== 'template'){
                        return item;
                    }
                });
                this.setState({
                    comments: filteredData
                })
            }).catch((error) => {
                console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
            });
        });
    }
    componentWillUnmount(){
        this.sub();
    }
    render(){
        return(
            <WrappedCommentList className={this.props.className}>
                {this.state.comments.map((item, index) => {
                    return <UserComment 
                        comment={item.data().comment} 
                        authorID={item.data().authorID} 
                        authorURL={item.data().authorURL}
                        authorFirstname={item.data().authorFirstname}
                        authorSurname={item.data().authorSurname} 
                        key={uuidv4()}/>
                })}
            </WrappedCommentList>
        );
    }
}