import React from "react"

import "../styles/components/Siteheader.scss"

const SiteHeader = () => (
    <div>
        <ul id="profile-dropdown__menu" className="dropdown-content">
            <li>
                <a href="#">Profile</a>
            </li>
            <li className="divider"></li>
            <li>
                <a href="#">Log out</a>
            </li>
        </ul>
        <nav className="blue darken-1">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">TravelMap</a>
                <a href="#" data-activates="side-bar" className="button-collapse">
                    <i className="material-icons">menu</i>
                </a>
                <ul className="right">
                    <li>
                        <a href="#">My Map</a>
                    </li>
                    <li className="active">
                        <a href="#">Shared Map</a>
                    </li>
                    <li>
                        <a className="dropdown-button" href="#" data-activates="profile-dropdown__menu">
                            <img className="circle profile-dropdown__image" src="https://placehold.it/100" />
                            <span>Your Mom<i className="material-icons right">arrow_drop_down</i></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
);

export default SiteHeader;