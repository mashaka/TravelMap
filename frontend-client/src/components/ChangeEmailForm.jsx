import React from "react"
import ErrorView from "../views/ErrorView"
import "../styles/components/ChangeEmailForm.scss"

const ChangeEmailForm = ({currentEmail, changeEmailCallback, changingEmail, errorChangingEmail, changingEmailSuccess }) => {
    let newEmail;
    return (
        <div>
            <p className="change-email-header">Change email</p>
            <form type="submit" onSubmit={(e) => {
                e.preventDefault();
                changeEmailCallback(newEmail.value);
            }}>
                <div className="input-field col s12">
                    <input id="email" type="email" defaultValue={currentEmail} className="validate" ref={(input)=>newEmail=input} />
                    <label htmlFor="email" data-error="wrong" data-success="right"></label>
                </div>
                <button type="submit"
                        disabled={changingEmail} className="waves-effect waves-light btn">
                    Change
                </button>
            </form>
            { errorChangingEmail ?
                <ErrorView /> : '' }
            { changingEmailSuccess ?
             <p className="success-response"> Successfully changed email. </p> : '' }
        </div>
    );
};

export default ChangeEmailForm;