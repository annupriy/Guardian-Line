"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ActiveCrimesCards from "./ActiveCrimesCards";

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
  // Set an array of objects to store the active crimes
  const [activeCrimes, setactiveCrimes] = useState<any[]>([]);

  const handleNoClick = () => {
    console.log("No clicked");
  };

  const handleYesClick = () => {
    if (user && user.name) {
      handleGetLocation();
    }
  };
  const handleDeleteLocation = async () => {
    // call a post request to delete the user location from ActiveVolunteers
    const res = await fetch("/api/volunteersLocation", {
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
  // If isReadyToVolunteer is true, then fetch the data from /api/getActiveCrimes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/checkVolunteerStatus?userName=${user.name}`
        );
        const data = await res.json();
        setIsReadyToVolunteer(data.isPresent);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchActiveCrimes = async () => {
      try {
        const res = await fetch(`/api/getActiveCrimes?userName=${user.name}`);
        const data = await res.json();
        console.log(data);
        // filter out those activeCrimes where current time minus timeOfIncident is less than 2 hour
        const currentTime = new Date().getTime();
        const filteredCrimes = data.activeCrimes.filter(
          (crime: any) =>
            currentTime - crime.filingtime < 7200000
        );
        setactiveCrimes(filteredCrimes);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (isReadyToVolunteer) {
      fetchActiveCrimes();
    }
  }, [isReadyToVolunteer, user]);

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
    const res = await fetch("/api/volunteersLocation", {
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
      setIsReadyToVolunteer(true);
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
      <div className="flex justify-center h-full align-middle" style={{marginTop:'120px'}}>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="text-center bg-[#f0f0f0]">
      {isReadyToVolunteer ? (
        <div>
          <div className="text-green-900 text-4xl m-8 font-semibold" style={{marginTop:'120px'}}>
            Live Reports Near you
          </div>
          <div className="grid grid-cols-1 gap-4 p-8 relative lg:grid-cols-2 ml-24">
            {Array.isArray(activeCrimes) && activeCrimes.length > 0 ? (
              activeCrimes.map((crime, index) => (
                <ActiveCrimesCards
                  key={index}
                  typeOfIncident={crime.typeOfIncident}
                  distance={crime.distance}
                  descriptionOfIncident={crime.descriptionOfIncident}
                  incidentLocation={crime.incidentLocation}
                  personalInformation={crime.personalInformation}
                  timeOfIncident={crime.timeOfIncident}
                  userName={crime.userName}
                  reportid={crime.reportid}
                />
              ))
            ) : (
              <div className="text-2xl font-semibold text-red-600">
                No active crimes
              </div>
            )}
          </div>

          <button
            className="btn mr-2"
            onClick={handleDeleteLocation}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            LOG OFF
          </button>
        </div>
      ) : (
        <div>
          {/* <div className="text-3xl mb-4">Ready to help?</div>
            <div className="mb-8">
            <button onClick={handleYesClick} className="btn mr-2">
              Yes
            </button>
            <button onClick={handleNoClick} className="btn">
              No
            </button>
          </div> */}

          <div className="container">
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                borderRadius: "20px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#f9f9f9",
                width: "50%",
                margin: "225px auto",
                // marginTop:'200px',
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  color: "#333",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Ready to help?
              </div>
              <div>
                <button
                  onClick={handleYesClick}
                  className="btn mr-2"
                  style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#4CAF50",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={handleNoClick}
                  className="btn"
                  style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#f44336",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredVolunteers;
