import React from "react"
import "../styles/Fonts.scss"
import "../styles/views/MapView.scss"
import Flags from "../constants/flags/flags.json"

/* TODO(dubov94): set up for small screens. */
export default class MapView extends React.Component {
    render() {

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
                <ul id="side-bar" className="side-bar side-nav fixed">
                    <h5 className="center">Filters</h5>
                    <h6>Sex</h6>
                    <div className="side-bar__sex">
                        { SexCheckbox("male", "Male") }
                        { SexCheckbox("female", "Female") }
                    </div>
                    <h6>Age</h6>
                    <div className="side-bar__age"></div>
                    <h6>Locale</h6>
                    <div className="side-bar__locale input-field col s12">
                        <input type="text" id="side-bar__locale"
                            className="autocomplete" />
                        <label htmlFor="side-bar__locale">Country</label>
                    </div>
                </ul>
                <div id="world-map"></div>
            </div>
        )
    }

    initializeSlider() {
        const slider = document.querySelector(".side-bar__age")
        noUiSlider.create(slider, {
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

    initializeMap() {
        this.visited = ['RU', 'US']
        this.recommendations = { UK: 0, CA: 25, FR: 75 }


        $("#world-map").vectorMap({
            map: "world_mill",
            series: {
                regions: [{
                    values: this.recommendations,
                    scale: ["#FFFFFF", "#FF0000"]
                }]
            },
            regionsSelectable: true,
            regionStyle: {
                selected: {
                    fill: "green"
                }
            },
            selectedRegions: this.visited,
            onRegionSelected: (e, code, isSelected, selectedRegions) => {
                if(isSelected) {
                    console.log(code)
                }
            },
            onRegionClick: (e, code) => {
                if(this.visited.indexOf(code) !== -1) {
                    return false
                }
            }
        });
    }

    componentDidMount() {
        $(document).ready(() => {
            this.initializeSlider()
            this.initializeAutoComplete()
            this.initializeMap()
        })
    }
}
