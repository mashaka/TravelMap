import React from "react"
import "../styles/components/UserInfo.scss"

const UserInfo = ({userName, email, gender, age, locale}) => (
    <div className="user-info-card">
        <ul className="collection">
            <li className="collection-item">Your username: {userName}</li>
            <li className="collection-item">Your email: {email}</li>
            <li className="collection-item">Gender: {gender}</li>
            <li className="collection-item">Age: {age}</li>
            <li className="collection-item">Locale: {locale}</li>
        </ul>
    </div>
);

export default UserInfo;
