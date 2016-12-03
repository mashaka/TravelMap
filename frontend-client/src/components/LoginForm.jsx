import React from "react"
import "../styles/components/LoginForm.scss"

const LoginForm = ({isDisabled, loginCallback, login, password}) => (
    <div className="login-form">
        <form type="submit">
            <div className="input-field">
                <input id="email" type="text" className="validate" ref={(input)=>login=input} />
                <label for="email"> Login </label>
            </div>
            <div className="input-field">
                <input id="email" type="password" className="validate" ref={(input)=>password=input} />
                <label for="email"> Password </label>
            </div>
            <div>
                <button type="submit" className="waves-effect waves-light btn"
                        disabled={isDisabled}
                        onClick={(e) => {
                            e.preventDefault();
                            loginCallback( login.value, password.value );
                        }}>
                    Login
                </button>
            </div>
        </form>
    </div>
);

export default LoginForm;