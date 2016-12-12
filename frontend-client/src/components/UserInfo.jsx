import React from "react"
import "../styles/components/UserInfo.scss"
import Flags from "../constants/flags/flags.json"

const UserInfo = ({userName, email, gender, age, locale}) => (
    <div className="user-info-card">
        <ul className="collection">
            <li className="collection-item"><b>Username</b>: {userName}</li>
            <li className="collection-item"><b>Gender</b>: {gender == "male" ? <img src="https://maxcdn.icons8.com/Share/icon/Users//male1600.png"/> : <img src="https://maxcdn.icons8.com/Share/icon/Users//female1600.png" />}</li>
            <li className="collection-item"><b>Age</b>: {age}</li>
            <li className="collection-item"><b>Locale</b>: {locale} <img src={`https://github.com/hjnilsson/country-flags/raw/master/png250px/${locale.toLowerCase()}.png`} /></li>
        </ul>
    </div>
);

export default UserInfo;
