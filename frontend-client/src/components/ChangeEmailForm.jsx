import React from "react"
import ErrorView from "../views/ErrorView"

const ChangeEmailForm = ({changeEmailCallback, changingEmail, errorChangingEmail, changingEmailSuccess }) => {
    let newEmail;
    return (
        <div>
            <h1>Change email</h1>
            <form type="submit" onSubmit={(e) => {
                e.preventDefault();
                changeEmailCallback(newEmail.value);
                newEmail.value = "";
            }}>
                <input type="text" ref={(input)=>newEmail=input} />
                <button type="submit"
                        disabled={changingEmail}>
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