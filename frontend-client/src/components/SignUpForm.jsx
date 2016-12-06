import React from "react"
import "../styles/components/SignUpForm.scss"
import DatePicker from "react-datepicker"
import Countries from "../constants/flags/countries.json"

require('react-datepicker/dist/react-datepicker.css');

export default class SignUpForm extends React.Component {

    changeBirthDate( date ) {
        this.props.chooseBirthDate( date );
    }

    render() {
        return (
            <div className="signup-form">
                <form type="submit">
                    <div className="input-field col s12">
                        <input id="nickname" type="text" className="validate" ref={(input)=>this.nickname = input}/>
                        <label htmlFor="nickname"> Login </label>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" ref={(input)=>this.email = input}/>
                        <label htmlFor="email"> Email </label>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" ref={(input)=>this.password = input}/>
                        <label htmlFor="password"> Password </label>
                    </div>
                    <div>
                        <input name="sex" type="radio" id="sex-male" value="male" checked={this.props.gender == "male"}/>
                        <label className="sex-label-element" htmlFor="sex-male" onClick={() => {
                            this.props.chooseGender("male")
                        }}>Male</label>
                        <input name="sex" type="radio" id="sex-female" value="female" checked={this.props.gender == "female"}/>
                        <label className="sex-label-element" htmlFor="sex-female" onClick={() => {
                            this.props.chooseGender("female")
                        }}>Female</label>
                    </div>
                    <DatePicker
                        selected={this.props.birthDate}
                        onChange={this.changeBirthDate.bind(this)}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        placeholderText="Select your birth date"
                        isClearable={true}
                    />

                    <div>
                        <select className="browser-default" defaultValue="" ref={(input) => this.locale = input}>
                            <option value="" disabled>Choose your country</option>
                            {Object.keys(Countries).map( (key) => (
                                <option value={key} key={key}>{Countries[key]}</option>
                            ) ) }
                        </select>
                    </div>

                    <div>
                        <button type="submit" className="waves-effect waves-light btn signup-form__button"
                                disabled={this.props.pending}
                                onClick={(e) => {
                                        e.preventDefault();
                                        this.props.registrationCallBack( this.nickname.value, this.email.value, this.password.value, this.locale.value,
                                            this.props.gender, this.props.birthDate.date(), this.props.birthDate.month(), this.props.birthDate.year() );
                                    }
                                }>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )}
}