"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import { Player } from "@lottiefiles/react-lottie-player";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [playerStarted, setPlayerStarted] = useState(false);
  const myElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myElem.current) {
      myElem.current.style.width = "-webkit-fill-available";
      myElem.current.style.width = "-moz-available";
    }
  }, []);
  
  // Start the Player after 2 seconds
  setTimeout(() => {
    setPlayerStarted(true);
  }, 2000);
  return (
    <main className="h-full w-full flex justify-center bg-neutral-100	">
      <div className="text-center mt-16 w-full">
        <div className="animatedText text-3xl font-semibold mb-4 text-gray-800 inline-flex">
          <TypeAnimation
            sequence={["Your identity is safe and anonymous with us", 1000]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1em", display: "inline-block" }}
            repeat={1}
            cursor={false}
          />
          {playerStarted && (
            <Player
              autoplay
              keepLastFrame
              src="/Animation-Lock.json"
              className="h-10 w-10"
              style={{ marginLeft: "4px", marginTop: "-2px" }}
            />
          )}
        </div>
        <p className="animatedText text-lg text-gray-600 mb-4">
          Please don&apos;t indulge in scamming, you will be banned
        </p>
        <hr className="m-auto w-[65%]"/>
        <p className="animatedText text-lg text-gray-600 mt-10 mb-8">
          Want to file a report? Do it anonymously
        </p>
        <div className="space-x-4 flex justify-center">
          <Link href="/standard_filing">
            <button className="btn btn-primary">Standard Filing</button>
          </Link>
          <div className="relative m-0" style={{ margin: 0 }}>
            <div className="my-anchor-element">
              <QuestionMarkCircleIcon
                className="w-5 h-5 text-gray-600 cursor-pointer"
                data-tip="Standard Reporting"
                data-for="tooltip"
                data-tooltip-id="tooltip"
                data-tooltip-html="If you have the time and inclination <br/> to submit a more detailed report, <br/> please consider filing a Standard Report!"
                data-tooltip-place="top"
              />
            </div>
            <Tooltip
              id="tooltip"
              border="1px solid #D1D5DB"
              opacity={0.9}
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
              }}
            />
          </div>
          <Link href="/quick_filing">
            <button className="btn btn-accent">
              <div className="flex flex-col justify-center">
                <div>Quick Filing</div>
                <div className="text-red-500 text-xs translate-y-1 italic">
                  LIVE
                </div>
              </div>
            </button>
          </Link>
          <div className="relative m-0" style={{ margin: 0 }}>
            <div className="my-anchor-element">
              <QuestionMarkCircleIcon
                className="w-5 h-5 text-gray-600 cursor-pointer"
                data-tip="Emergency"
                data-for="tooltip"
                data-tooltip-id="tooltip2"
                data-tooltip-html="If you're facing an emergency <br/> and need to report quickly, <br/> please file a Quick Report!"
                data-tooltip-place="top"
              />
            </div>
            <Tooltip
              id="tooltip2"
              border="1px solid #D1D5DB"
              opacity={0.9}
              style={{
                backgroundColor: "rgb(239 68 68)",
                color: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div className="fixed bottom-[2.2rem]" ref={myElem} style={{"width":"-webkit-fill-available"}}>
          <div className="flex items-center justify-center">
            <div className="">
              <p className="text-md font-semibold text-red-900">
                Facing an emergency? No need to remain anonymous? Dial 112
                instead!
              </p>
            </div>
            <a href="https://112.gov.in/">
              <img
                src="./112 Image.jpg"
                alt=""
                className="lg:w-16 lg:h-16 w-10 h-10 rounded-full hover:opacity-80 ml-3"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
