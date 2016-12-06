import React from "react"
import { Link } from "react-router"
import NavItem from "./NavItem"
import ReactDOM from 'react-dom'

import "../styles/components/Siteheader.scss"

export default class SiteHeader extends React.Component {
    render() {
        return (
            <div>
                <ul id="profile-dropdown__menu" className="dropdown-content">
                    <li>
                        <Link to="/home">Profile</Link>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            this.props.logoutCallback();
                        }}>Log out</a>
                    </li>
                </ul>
                <nav className="blue darken-1">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">TravelMap</a>
                        <a href="#" data-activates="side-bar" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right">
                            <NavItem to="map" >
                                My Map
                            </NavItem>
                            <li>
                                Shared Map
                            </li>
                            <li>
                                <a className="dropdown-button" href="#" data-activates="profile-dropdown__menu" ref="dropdown">
                                    <img className="circle profile-dropdown__image" src="https://placehold.it/100" />
                                    <span>{this.props.nickname}<i className="material-icons right">arrow_drop_down</i></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}