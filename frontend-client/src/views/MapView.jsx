import React from "react"
import { MapChoropleth } from "react-d3-map-choropleth"
import * as TopoJson from "topojson"
import "../styles/Fonts.scss"
import "materialize-css/bin/materialize.css"
import "materialize-css/extras/noUiSlider/nouislider.css"
import "../styles/MapView.scss"
import "materialize-css/bin/materialize.js"
import NoUiSlider from "materialize-css/extras/noUiSlider/nouislider.js"
import World from "../constants/world-50m.json"
import Flags from "../constants/flags/flags.json"

/* TODO(dubov94): set up for small screens. */
export default class MapView extends React.Component {
    render() {
        let mesh = TopoJson.mesh(
            World, World.objects.countries, function(a, b) {
                return a !== b
            }
        )

        const SexCheckbox = (tag, caption) => {
            let id = "side-bar__sex--" + tag
            return (
                <div>
                    <input
                        type="checkbox" id={ id }
                        checked="checked" className="filled-in" />
                    <label htmlFor={ id }>{ caption }</label>
                </div>
            )
        }

        /* TODO(dubov94): Split into components. */
        return (
            <div>
                <ul id="side-bar" className="side-nav fixed">
                    <h5 className="center">Filters</h5>
                    <h6>Sex</h6>
                    <div className="side-bar__sex">
                        { SexCheckbox("male", "Male") }
                        { SexCheckbox("female", "Female") }
                    </div>
                    <h6>Age</h6>
                    <div className="side-bar__age"></div>
                    <h6>Locale</h6>
                    <div className="side-bar__locale">
                        <input type="text" id="side-bar__locale"
                            className="autocomplete" />
                        <label htmlFor="side-bar__locale">Country</label>
                    </div>
                </ul>
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
                {/* <MapChoropleth
                    dataMesh={ mesh }
                    projection={ "mercator" }
                    showGraticule={ false } /> */}
            </div>
        )
    }

    initializeSlider() {
        const slider = document.querySelector(".side-bar__age")
        NoUiSlider.create(slider, {
            start: [18, 90],
            connect: true,
            step: 1,
            range: {
                "min": 0,
                "max": 120
            },
            format: wNumb({
                decimals: 0
            })
        })
    }

    initializeAutoComplete() {
        $("input.autocomplete").autocomplete({
            data: Flags
        })
    }

    componentDidMount() {
        this.initializeSlider()
        this.initializeAutoComplete()
    }
}
