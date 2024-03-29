"use client";
import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
type User = {
  id?: string | null;
  name?: string | null;
};

type UserInfo = {
  user: User;
};

// UnregisteredVolunteers takes user as props of type username
const UnregisteredVolunteers: React.FC<UserInfo> = ({ user }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    if (user && user.name) {
      handleVolunteerRegistration(user.name);

    }
  };

  const handleVolunteerRegistration = async (userName: string) => {
    // write code to POST volunteer registration to server
    const res = await fetch("/api/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      setRegistered(true);
      // reload the page
      router.refresh();
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error registering");
      } else {
        toast.error("Could not register.");
      }
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-red-50 to-blue-50 flex flex-col justify-center items-center" style={{marginTop:'3rem'}}>
      <Toaster />

      <div className="text-3xl mb-4 text-red-600" style={{marginTop:'2rem'}}>
        Oops! You are not registered as a volunteer :(
      </div>

      <div className="flex justify-center" style={{marginTop:'3rem'}}>
        <Player
          autoplay
          loop
          src="./Animation-Volunteer.json"
          className="h-60 w-60"
          style={{ marginLeft: "4px", marginTop: "-2px" }}
        />
      </div>
      <div className="form-control mt-4" style={{marginTop:'3rem'}}>
        <label className="label cursor-pointer">
          <span className="label-text text-xl font-semibold">
            Register yourself as a volunteer
          </span>
          <input
            type="checkbox"
            className="toggle toggle-success ml-2"
            checked={isChecked}
            onChange={handleToggleChange}
          />
        </label>
      </div>
    </div>
  );
};

// export default Unregistered;
export default UnregisteredVolunteers;
