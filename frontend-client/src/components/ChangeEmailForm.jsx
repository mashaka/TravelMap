import React from "react"
import ErrorView from "../views/ErrorView"
import "../styles/components/ChangeEmailForm.scss"

const ChangeEmailForm = ({changeEmailCallback, changingEmail, errorChangingEmail, changingEmailSuccess }) => {
    let newEmail;
    return (
        <div>
            <p className="change-email-header">Change email</p>
            <form type="submit" onSubmit={(e) => {
                e.preventDefault();
                changeEmailCallback(newEmail.value);
                newEmail.value = "";
            }}>
                <div className="input-field">
                    <input id="email" type="email" className="validate" ref={(input)=>newEmail=input} />
                    <label for="email" data-error="wrong" data-success="right"> New email </label>
                </div>
                <button type="submit"
                        disabled={changingEmail} className="waves-effect waves-light btn">
                    Change
                </button>
            </form>
            { errorChangingEmail ?
                <ErrorView /> : '' }
            { changingEmailSuccess ?
             <p> Confirmation letter was sent to new email address. </p> : '' }
        </div>
    );
};

export default ChangeEmailForm;