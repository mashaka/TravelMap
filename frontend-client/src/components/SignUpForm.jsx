import React from "react"
import "../styles/components/SignUpForm.scss"
import DatePicker from "react-datepicker"

require('react-datepicker/dist/react-datepicker.css');

export default class SignUpForm extends React.Component {

    changeBirthDate( date ) {
        this.props.chooseBirthDate( date );
    }

    render() {
        return (
            <div className="signup-form">
                <form type="submit">
                    <div className="input-field">
                        <input id="email" type="text" className="validate" ref={(input)=>this.nickname = input}/>
                        <label for="email"> Login </label>
                    </div>
                    <div className="input-field">
                        <input id="email" type="email" className="validate" ref={(input)=>this.email = input}/>
                        <label for="email"> Email </label>
                    </div>
                    <div className="input-field">
                        <input id="email" type="password" className="validate" ref={(input)=>this.password = input}/>
                        <label for="email"> Password </label>
                    </div>
                    <div>
                        <input name="sex" type="radio" id="sex-male" value="male" checked={this.props.gender == "male"}/>
                        <label className="sex-label-element" for="sex-male" onClick={() => {
                            this.props.chooseGender("male")
                        }}>Male</label>
                        <input name="sex" type="radio" id="sex-female" value="female" checked={this.props.gender == "female"}/>
                        <label className="sex-label-element" for="sex-female" onClick={() => {
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
                        <button type="submit" className="waves-effect waves-light btn"
                                disabled={this.props.pending}
                                onClick={() => this.props.registrationCallBack(this.nickname.value, this.email.value, this.password.value,
                                    this.props.gender, this.props.birthDate._i)}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )}
}