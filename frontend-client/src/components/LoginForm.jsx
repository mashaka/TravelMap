import React from "react"

const LoginForm = ({isDisabled, loginCallback, login, password}) => (
    <div>
        <h1> Login form </h1>
        <form type="submit">
            <div>
                <input type="text" placeholder="Login" ref={(input)=>login=input} />
            </div>
            <div>
                <input type="password" placeholder="Password" ref={(input)=>password=input} />
            </div>
            <div>
                <button type="submit"
                        disabled={isDisabled}
                        onClick={loginCallback}>
                    Enter
                </button>
            </div>
        </form>
    </div>
);

export default LoginForm;