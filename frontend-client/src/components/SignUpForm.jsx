import React from "react"

const SignUpForm = ({pending, registrationCallBack, nickname, gender, birthDate, email, password}) => (
    <div>
        <h1> Registration form </h1>
        <form type="submit">
            <div>
                <input type="text" placeholder="NickName" ref={(input)=>nickname=input} />
            </div>
            <div>
                <input type="text" placeholder="e-mail" ref={(input)=>email=input} />
            </div>
            <div>
                <input type="password" placeholder="Password" ref={(input)=>password=input} />
            </div>
            <div>
                <button type="submit"
                        disabled={pending}
                        onClick={registrationCallBack}>
                    Enter
                </button>
            </div>
        </form>
    </div>
);

export default SignUpForm;