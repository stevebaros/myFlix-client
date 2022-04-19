import React from "react";

import "./user-data.scss";

export function UserData({ userdata }) {
  return (
    <>
      <br></br>
      <div className="userData">
        <h4>{userdata.Username}</h4>
        <br></br>
        <p>
          <u>Email</u>: {userdata.Email}
        </p>
        <p>
          <u>Birthday</u>: {userdata.Birthday}
        </p>
      </div>
    </>
  );
}
