import React from "react"
import "../styles/components/UserInfo.scss"
import Flags from "../constants/flags/flags.json"

const UserInfo = ({userName, email, gender, age, locale}) => (
    <div className="user-info-card">
        {console.log(Flags[locale])}
        <ul className="collection">
            <li className="collection-item">Your username: {userName}</li>
            <li className="collection-item">Your email: {email}</li>
            <li className="collection-item">Gender: {gender}</li>
            <li className="collection-item">Age: {age}</li>
            <li className="collection-item">Locale: {locale} <img src={`https://github.com/hjnilsson/country-flags/raw/master/png250px/${locale.toLowerCase()}.png`} /></li>
        </ul>
    </div>
);

export default UserInfo;
