import React from "react"
import ErrorView from "../views/ErrorView"
import "../styles/components/ChangePasswordForm.scss"

const ChangePasswordForm = ({changePasswordCallback, changingPassword,
    errorChangingPassword, changingPasswordSuccess }) => {
    let newPassword;
    let oldPassword;
    return (
        <div>
            <p className="change-password-header">Change password</p>
            <form type="submit" onSubmit={(e) => {
                e.preventDefault();
                changePasswordCallback(oldPassword.value, newPassword.value);
                oldPassword.value = "";
                newPassword.value = "";
            }}>
                <div className="input-field col s12">
                    <input id="old-password" type="password" ref={(input)=>oldPassword=input} />
                    <label htmlFor="old-password" data-error="wrong" data-success="right"> Old password </label>
                </div>

                <div className="input-field col s12">
                    <input id="new-password" type="password" ref={(input)=>newPassword=input} />
                    <label htmlFor="new-password" data-error="wrong" data-success="right"> New password </label>
                </div>

                <button type="submit" className="waves-effect waves-light btn"
                        disabled={changingPassword}>
                    Change
                </button>
            </form>
            { errorChangingPassword ?
                <ErrorView /> : '' }
            { changingPasswordSuccess ?
                <p className="success-response"> Your password was successfully changed. </p> : '' }
        </div>
    );
};

export default ChangePasswordForm;