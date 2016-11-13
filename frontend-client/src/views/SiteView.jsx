import React from "react";
import SiteHeader from "../components/SiteHeader"

export default class SiteView extends React.Component {
    render() {
        return(
            <div>
                <SiteHeader />
                {this.props.children}
            </div>
        );
    }
}
