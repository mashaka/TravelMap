import React from "react"
import ErrorView from "../views/ErrorView"

const ChangePasswordForm = ({changePasswordCallback, changingPassword,
    errorChangingPassword, changingPasswordSuccess }) => {
    let newPassword;
    let oldPassword;
    return (
        <div>
            <h1>Change password</h1>
            <form type="submit" onSubmit={(e) => {
                e.preventDefault();
                changePasswordCallback(oldPassword.value, newPassword.value);
                oldPassword.value = "";
                newPassword.value = "";
            }}>
                <div>
                    Old password:
                    <input type="text" ref={(input)=>oldPassword=input} />
                </div>
                <div>
                    New password:
                    <input type="text" ref={(input)=>newPassword=input} />
                </div>
                <button type="submit"
                        disabled={changingPassword}>
                    Change
                </button>
            </form>
            { errorChangingPassword ?
                <ErrorView /> : '' }
            { changingPasswordSuccess ?
                <p> Your password was successfully changed. </p> : '' }
        </div>
    );
};

export default ChangePasswordForm;