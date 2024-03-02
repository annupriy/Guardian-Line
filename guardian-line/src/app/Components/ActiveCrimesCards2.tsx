import React, { useState } from "react";

type IncidentLocation = {
  latitude: number;
  longitude: number;
};

type ActiveCrimesCardsProps = {
  data: Array<{
    descriptionOfIncident: string;
    incidentLocation: IncidentLocation;
    personalInformation: string;
    timeOfIncident: string;
    userName: string;
    reportid: string;
  }>;
};

const ActiveCrimesCards: React.FC<ActiveCrimesCardsProps> = ({ data }) => {
  const [showCardStates, setShowCardStates] = useState<boolean[]>(
    Array(4).fill(false)
  );
  const [showingStates, setShowingStates] = useState<boolean[]>(
    Array(4).fill(false)
  );
  const [highestZIndex, setHighestZIndex] = useState<number>(1);

  const handleClick = (index: number) => {
    setShowCardStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : false))
    );
    setShowingStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : false))
    );
    setHighestZIndex((prevZIndex) => prevZIndex + 1);
  };

  return (
    <>
      <div className={`cards`}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`card ${showCardStates[index] ? "show" : ""} ${
              showingStates[index] ? "showing" : ""
            } ${!showingStates[index] ? "blur-background" : ""}`}
            style={{ zIndex: showCardStates[index] ? highestZIndex : "auto" }}
            onClick={() => handleClick(index)}
          >
            <div className="card-title">
              <a className="toggle-info btn">
                <span className="left"></span>
                <span className="right"></span>
              </a>
              <h2>
                Card title
                <small>Image from unsplash.com</small>
              </h2>
            </div>
            <div className="card-flap flap1">
              <div className="card-description">
                {item.descriptionOfIncident}
              </div>
              <div className="card-flap flap2">
                <div className="card-actions">
                  <a href="#" className="btn">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveCrimesCards;
