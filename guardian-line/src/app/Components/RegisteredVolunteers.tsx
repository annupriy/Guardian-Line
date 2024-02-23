"use client";
import React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { checkVolunteerStatus } from "@/server/db/checkVolunteerStatus";

type User = {
  id?: string | null;
  name?: string | null;
};

type UserInfo = {
  user: User;
};
const RegisteredVolunteers: React.FC<UserInfo> = ({ user }) => {
  console.log(user);
  const router = useRouter();
  const [isReadyToVolunteer, setIsReadyToVolunteer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNoClick = () => {
    console.log("No clicked");
  };

  const handleYesClick = () => {
    console.log("Yes clicked");
    setIsReadyToVolunteer(true);
    console.log(user);
    if (user && user.name) {
      handleGetLocation();
    }
  };
  const handleDeleteLocation = () => {
    console.log("Delete clicked");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect");
      // Call a get request to check if the user is already registered
      // const res = await fetch(`http://localhost:3000/api/checkVolunteerStatus?userName=${user.name}`);
      // console.log(res);
      const isActive = true;
      if (isActive) {
        setIsReadyToVolunteer(true);
      }
    };

    fetchData();
  }, [user]);

  const handleGetLocation = () => {
    try {
      console.log("Getting location");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          if (user && user.name) {
            AddVolunteersLocation(user.name, position.coords); // Pass position.coords directly
          }
        },
        (error) => {
          setError(error.message);
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } catch (error: any) {
      // Access error properties safely:
      setError(error.message);
      console.error(`Geolocation error: ${error.message}`);
    }
  };

  const AddVolunteersLocation = async (
    userName: string,
    coords: GeolocationCoordinates
  ) => {
    console.log("Adding volunteers location");
    // write code to POST volunteer registration to server
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      // reload the page
      router.refresh();
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error adding location. Please try again.");
      } else {
        toast.error("Could not add location");
      }
    }
  };

  return (
    <div className="text-center">
      {isReadyToVolunteer ? (
        <>
          <div className="text-green-600 text-3xl mb-8">
            Reports filed near you
          </div>
          <button className="btn btn-outline" onClick={handleDeleteLocation}>Delete</button>
        </>
      ) : (
        <div>
          <div className="text-3xl mb-4">Ready to help?</div>
          <div className="mb-8">
            <button onClick={handleYesClick} className="btn mr-2">
              Yes
            </button>
            <button onClick={handleNoClick} className="btn">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredVolunteers;
