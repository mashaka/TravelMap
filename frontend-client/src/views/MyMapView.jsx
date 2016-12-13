import React from "react"
import "../styles/Fonts.scss"
import "../styles/views/MapView.scss"
import Flags from "../constants/flags/flags.json"
import Tags from "../constants/flags/tags.json"
import { connect } from "react-redux"
import * as mapActions from "../actions/mapActions"
import { bindActionCreators } from "redux"

@connect(
    (state) => ({
        token: state.auth.token,
        visited: state.map.visited,
        recommended: state.map.recommended
    }),
    (dispatch) => ({
        actions: bindActionCreators(mapActions, dispatch)
    })
)
export default class MyMapView extends React.Component {
    render() {
        const addCountry = () => {
            // onChange does not fire when the value is set by autocomplete.
            let field = $('#side-bar__country')
            let country = field.val()
            if(Tags.hasOwnProperty(country)) {
                let code = Tags[country]
                if(this.props.visited.indexOf(code) === -1) {
                    field.val('')
                    field.focus()
                    this.props.actions.postVisited(this.props.token, code)
                }
            }
        }

        return (
            <div>
                <ul id="side-bar" className="side-bar side-nav fixed">
                    <h5>Add country</h5>
                    <div className="side-bar__country input-field col s12">
                        <input type="text" id="side-bar__country"
                            className="autocomplete" />
                        <label htmlFor="side-bar__country">Country</label>
                    </div>
                    <a className="waves-effect waves-light btn" onClick={ addCountry }>Add</a>
                </ul>
                <div id="world-map"></div>
            </div>
        )
    }
    
    initializeMap() {
        this.map = new jvm.Map({
            container: $("#world-map"),
            map: "world_mill",
            series: {
                regions: [{
                    values: this.props.recommended,
                    scale: ["#FFFFFF", "#FF0000"]
                }]
            },
            regionsSelectable: true,
            regionStyle: {
                selected: {
                    fill: "green"
                }
            },
            onRegionSelected: (e, code, isSelected, selectedRegions) => {
                if(isSelected && this.props.visited.indexOf(code) === -1) {
                    this.props.actions.postVisited(this.props.token, code)
                }
            },
            onRegionClick: (e, code) => {
                if(this.props.visited.indexOf(code) !== -1) {
                    return false
                }
            }
        })
    }

    initializeAutoComplete() {
        $("input.autocomplete").autocomplete({
            data: Flags
        })
    }
    
    componentDidUpdate() {
        if(this.map) {
            this.map.setSelectedRegions(this.props.visited.filter((code) => code.length === 2))
        }
    }

    componentDidMount() {
        this.props.actions.fetchVisited(this.props.token)
        this.props.actions.fetchRecommended(this.props.token)
        $(document).ready(() => {
            this.initializeAutoComplete()
            this.initializeMap()
        })
    }
}