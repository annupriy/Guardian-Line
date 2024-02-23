"use client";
import React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type User = {
  id?: string | null;
  name?: string | null;
};

type UserInfo = {
  user: User;
};
const RegisteredVolunteers: React.FC<UserInfo> = ({ user }) => {
  const [isReadyToVolunteer, setIsReadyToVolunteer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNoClick = () => {
    console.log("No clicked");
  };

  const handleYesClick = () => {
    setIsReadyToVolunteer(true);
    if (user && user.name) {
      handleGetLocation();
    }
  };
  const handleDeleteLocation = async () => {
    // call a post request to delete the user location from ActiveVolunteers
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addVolunteer: false,
        userName: user.name,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      console.log("Deleted");
      setIsReadyToVolunteer(false);
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error deleting Volunteer. Please try again.");
      } else {
        toast.error("Could not delete Volunteer");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call a get request to check if the user is already registered
        const res = await fetch(
          `http://localhost:3000/api/checkVolunteerStatus?userName=${user.name}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setTimeout(() => {
          // Once data is fetched, set isLoading to false
          setIsLoading(false);
          const isActive = data.isPresent;
          console.log("isActive", isActive);
          setIsReadyToVolunteer(isActive);
        }, 2000);
      } catch (error: any) {
        setError(error.message);
        console.error(`Error: ${error.message}`);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect");
      // Call a get request to check if the user is already registered
      // const res = await fetch(`http://localhost:3000/api/checkVolunteerStatus?userName=${user.name}`);
      // console.log(res);
      const isActive = true;
      if (isActive) {
        setIsReadyToVolunteer(false); // Ensure isReadyToVolunteer is set to false initially
      }
    };

    fetchData();
  }, [user]);

  // Rest of the component remains unchanged

  const handleGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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
    // write code to POST volunteer registration to server
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addVolunteer: true,
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
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error adding location. Please try again.");
      } else {
        toast.error("Could not add location");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center h-full align-middle">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="text-center">
      {isReadyToVolunteer ? (
        <>
          <div className="text-green-600 text-3xl mb-8">
            Reports filed near you
          </div>
          <button className="btn btn-outline" onClick={handleDeleteLocation}>
            Delete
          </button>
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
