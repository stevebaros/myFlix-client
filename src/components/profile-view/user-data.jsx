import React from "react";

export function UserData({ userdata }) {
  return (
    <>
      <h4>{userdata.Username}</h4>
      <p>Email: {userdata.Email}</p>
      <p>Birthday: {userdata.Birthday}</p>
    </>
  );
}
