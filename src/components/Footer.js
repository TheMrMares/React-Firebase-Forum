import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import colors from './../constants/colors';

const FooterTitle = styled.h1`
    border: 1px solid ${colors.special};
    font-size: 1.3em;
    border-radius: 10px;
    color: ${colors.special};
`;
const FooterNote = styled.p`
    font-size: 0.9em;
    color: ${colors.grey};
`;
const FooterList = styled.ul`
    list-style-type: none;
    margin: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid ${colors.grey};
    border-radius: 10px;
`;
const FooterItem = styled.li`
    padding: 5px 20px;
    display: flex;
    justify-content: center;
`;

const WrappedFooter = styled.footer`
    background: ${colors.fair};
    padding: 40px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${FooterTitle}, ${FooterNote} {
        margin: 5px;
        padding: 5px 10px;
    }
`;
export default class Footer extends Component {
    render(){
        return(
            <WrappedFooter>
                <FooterTitle>Just rules</FooterTitle>
                <FooterList>
                    <FooterItem>1. Stay gentle as well</FooterItem>
                    <FooterItem>2. Don't share your nazi/communist idea if you have any</FooterItem>
                    <FooterItem>3. Stay happy with our community!</FooterItem>
                </FooterList>
                <FooterNote>While you use our forum, you agree following rules</FooterNote>
            </WrappedFooter>
        );
    }
}