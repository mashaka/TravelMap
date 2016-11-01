import React from "react"

const UserInfo = ({userName, email, gender, age, locale}) => (
    <div>
        <h1> User profile </h1>
        <p>User: {userName}</p>
        <p>Email: {email}</p>
        <p>Gender: {gender}</p>
        <p>Age: {age}</p>
        <p>Locale: {locale}</p>
    </div>
);

export default UserInfo;
