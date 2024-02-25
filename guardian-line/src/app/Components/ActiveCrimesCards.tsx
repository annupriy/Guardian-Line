import React, { useState } from "react";

type IncidentLocation = {
  latitude: number;
  longitude: number;
};

type ActiveCrimesCardsProps = {
  descriptionOfIncident: string;
  incidentLocation: IncidentLocation;
  personalInformation: string;
  timeOfIncident: string;
  userName: string;
};

const ActiveCrimesCards: React.FC<ActiveCrimesCardsProps> = ({
  descriptionOfIncident,
  incidentLocation,
  personalInformation,
  timeOfIncident,
  userName,
}) => {
  const [showButtons1, setShowButtons1] = useState(true);
  const [showButtons2, setShowButtons2] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const handleGoingToValidate = () => {
    setShowButtons2(true);
    setShowButtons1(false);
    handleReportClick();
  };

  const handleSkip = () => {
    setShowCard(false);
  };

  const handleDone = () => {
    setShowCard(false);
    setShowThanksMessage(true);
  };

  const handleReportClick = () => {
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowThanksMessage(false);
    }, 5000);
  };

  const  latitude = incidentLocation.latitude;
  const  longitude = incidentLocation.longitude;

  return (
    <>
      {showCard && (
        <div className="card w-96 bg-amber-900 text-neutral-content">
          <div className="card-body text-center flex-nowrap">
            <div className="card-actions justify-between flex-nowrap items-center ">
              <div className="card-title text-2xl">{descriptionOfIncident}</div>
              <div className="flex-col">
                <h5 className="">Latitude: {latitude}</h5>
                <h5 className="">Longitude: {longitude}</h5>
                <h5 className="">{timeOfIncident}</h5>
              </div>
            </div>
            <p>{personalInformation}</p>
            {showButtons1 && (
              <div className="card-actions justify-between flex-nowrap">
                <button
                  className="btn btn-primary"
                  onClick={handleGoingToValidate}
                >
                  Going to validate or help?
                </button>
                <button className="btn btn-ghost" onClick={handleSkip}>
                  Skip this one
                </button>
              </div>
            )}
            {showButtons2 && (
              <div className="card-actions justify-evenly flex-nowrap">
                <button className="btn btn-primary" onClick={handleDone}>
                  True Report
                </button>
                <button className="btn btn-ghost" onClick={handleDone}>
                  False Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showThanksMessage && (
        <p className="text-green-600 mt-4">Thanks for helping us validate!</p>
      )}
    </>
  );
};

export default ActiveCrimesCards;
