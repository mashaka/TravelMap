import React from "react"
import update from "immutability-helper"
import "../styles/Fonts.scss"
import "../styles/views/MapView.scss"
import { connect } from "react-redux"
import * as mapActions from "../actions/mapActions"
import { bindActionCreators } from "redux"

/* TODO(dubov94): set up for small screens. */
@connect(
    (state) => ({
        token: state.auth.token,
        distribution: state.map.distribution
    }),
    (dispatch) => ({
        actions: bindActionCreators(mapActions, dispatch)
    })
)
export default class SharedMapView extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = { 
            male: true, 
            female: false,
            age: [18, 90]
        }
    }

    render() {
        const SexCheckbox = (tag, caption) => {
            const setSex = (event) => {
                let stateUpdate = {}
                stateUpdate[tag] = update(this.state[tag], { $set: event.target.checked }) 
                this.setState(stateUpdate)
            }
            let id = "side-bar__sex--" + tag
            return (
                <div>
                    <input
                        type="checkbox" id={ id }
                        checked={ this.state[tag] } className="filled-in"
                        onChange={ setSex } />
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
                </ul>
                <div id="world-map"></div>
            </div>
        )
    }

    initializeSlider() {
        const slider = document.querySelector(".side-bar__age")
        noUiSlider.create(slider, {
            start: this.state.age,
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
        slider.noUiSlider.on('update', (values, handle) => {
            this.setState({ age: update(this.state.age, { $set: values.map((x) => parseInt(x)) }) })
        })
    }

    initializeMap() {
        this.map = new jvm.Map({
            container: $("#world-map"),
            map: "world_mill",
            series: {
                regions: [{
                    values: { FR: 75 },
                    scale: ["#FFFFFF", "#FF0000"]
                }]
            }
        })
    }

    componentDidMount() {
        this.props.actions.fetchDistribution(this.props.token)
        $(document).ready(() => {
            this.initializeSlider()
            this.initializeMap()
        })
    }
}
