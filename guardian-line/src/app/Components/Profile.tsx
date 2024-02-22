"use client";
import { User } from "@/types/user";
import React from "react";

type UserName = {
  username: string;
};
const Profile: React.FC<UserName> = ({ username }) => {
  return (
    <>
      <div className="mt-8 flex flex-col justify-center items-center">
        <p className="text-green-800 text-3xl">My Profile</p>
        <div className="text-xl mt-4">{username}</div>
        <p className="text-green-800 text-3xl mt-8">Settings</p>
        <button className="text-xl mt-4 btn">Change Password</button>
      </div>
    </>
  );
};

export default Profile;
