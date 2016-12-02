import React from "react";
import SiteHeader from "../components/SiteHeader"
import { connect } from "react-redux";
import "../styles/views/ErrorView.scss";
import { push } from "react-router-redux";
import {logout} from '../actions/authActions';

@connect(
    (state) => ({
        nickname : state.auth.nickName
    })
)
export default class SiteView extends React.Component {

    logout() {
        this.props.dispatch( logout() );
        this.props.dispatch( push("/login") );
    }

    render() {
        return(
            <div>
                <SiteHeader nickname={this.props.nickname} logoutCallback={this.logout.bind(this)} />
                {this.props.children}
            </div>
        );
    }
}
