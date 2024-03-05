"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const dudeRef = useRef(null);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const dude = dudeRef.current;
    const head = dude.querySelector(".head");
    const legs = Array.from(dude.querySelectorAll(".leg"));
    const arms = Array.from(dude.querySelectorAll(".arm"));
    const legBottoms = Array.from(dude.querySelectorAll(".leg-bottom"));
    const armBottoms = Array.from(dude.querySelectorAll(".arm-bottom"));

    const content = contentRef.current;
    const arrowEl = arrowRef.current;

    if (!dude || !head || !content || !arrowEl) return;
    gsap.set(arms, {
      svgOrigin: "180 58",
    });
    gsap.set(head, {
      svgOrigin: "180 45",
    });
    gsap.set(armBottoms, {
      svgOrigin: "178 118",
    });
    gsap.set(legs, {
      svgOrigin: "177 145",
    });
    gsap.set(legBottoms, {
      svgOrigin: "171 220",
    });
    const halfBodyTimeline = (leg, arm) => {
      const legBottom = leg.querySelector(".leg-bottom");
      const armBottom = arm.querySelector(".arm-bottom");

      return gsap
        .timeline({
          repeat: -1,
          paused: true,
        })
        .fromTo(
          leg,
          {
            rotation: -25,
          },
          {
            duration: 0.5,
            rotation: 15,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          leg,
          {
            duration: 0.25,
            rotation: -25,
            ease: "sine.in",
          },
          ">"
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 15,
            ease: "sine.inOut",
          },
          0.25
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 80,
            ease: "sine.in",
          },
          ">"
        )
        .to(
          legBottom,
          {
            duration: 0.25,
            rotation: 0,
            ease: "sine.out",
          },
          ">"
        )
        .fromTo(
          arm,
          {
            rotation: -12,
          },
          {
            duration: 0.5,
            rotation: 12,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0
        )
        .fromTo(
          armBottom,
          {
            rotation: -15,
          },
          {
            duration: 0.5,
            rotation: 10,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0
        );
    };
    const backCycle = halfBodyTimeline(legs[0], arms[1]);
    const frontCycle = halfBodyTimeline(legs[1], arms[0]);

    const bodyTimeline = gsap
      .timeline({
        paused: true,
      })
      .to(
        dude,
        {
          duration: 0.25,
          y: "-=20",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      )
      .fromTo(
        head,
        {
          rotation: -25,
        },
        {
          duration: 0.25,
          rotation: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      );

    const numberOfCycles = Math.ceil(
      (4 * window.innerWidth) / window.innerHeight
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".page",
          scrub: true,
          start: "0% 0%",
          end: "100% 100%",
        },
      })
      .to(
        arrowEl,
        {
          duration: 0.05,
          opacity: 0,
        },
        0
      )
      .fromTo(
        content,
        {
          xPercent: 0,
        },
        {
          xPercent: -50,
          ease: "none",
        },
        0
      )
      .fromTo(
        bodyTimeline,
        {
          time: 0.7,
        },
        {
          time: 0.75 + numberOfCycles,
        },
        0
      )
      .fromTo(
        backCycle,
        {
          time: 0.7,
        },
        {
          time: 0.75 + numberOfCycles,
        },
        0
      )
      .fromTo(
        frontCycle,
        {
          time: 0.2,
        },
        {
          time: 0.25 + numberOfCycles,
        },
        0
      );

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <div className="page">
      <div className="content" ref={contentRef}>
        <div className="content-section">
          <div>
            <div className="text-5xl font-bold -translate-y-20 text-slate-800">
              GUARDIAN LINE
            </div>
            <h1 className="text-3xl font-semibold -translate-y-12 text-slate-600">
              USER GUIDE
            </h1>
            <h1 className="dudeHeader text-slate-600">Scroll to see</h1>
            <p className="arrow-animated" ref={arrowRef}>
              ↓
            </p>
          </div>
        </div>

        <div className="content-section">
          <div>
          <h1 className="text-3xl font-semibold -translate-y-12 text-slate-600">
              STANDARD AND QUICK FILING
            </h1>
            <h1 className="dudeHeader text-slate-600 text-lg">
Whether you&apos;ve got time to spare or need to act fast, we&apos;ve got you covered with our two reporting options: Standard for when you&apos;ve got the time, and Quick for when every second counts.</h1>
          </div>
        </div>

        <div className="content-section">
          <div>
          <h1 className="text-3xl font-semibold -translate-y-12 text-slate-600">
              VOLUNTEER APPROVAL AND POLICE ENFORCEMENT
            </h1>
            <h1 className="dudeHeader text-slate-600 text-lg">Guardian Line outlines the validation process for user reports involving Volunteers and Admins. Depending on your report type and status,
             it may be sent directly to Admin or undergo preliminary checks.
             Your report will be validated by our volunteers,for which they`&apos;`ll earn reputation points. 
            <br/> Admin utilizes Volunteer feedback and AI predictions to determine if a report is fraudulent. Subsequently, takes appropriate actions, ensuring society`&pos;` safeguarding.

</h1>
          </div>
        </div>

        <div className="content-section">
          <div>
            <h1 className="dudeHeader text-slate-600 text-lg">Volunteers are individuals who take the initiative to assist users in need based on reported incidents. 
If you choose to be a volunteer,you can help whenever you`&apos;`re available,by enabling GPS. This allows you to locate nearby reports on volunteer`&apos;`s page.
<br/>As a volunteer, you have the authority to validate reports if you have knowledge about the incident. Your validation helps in assessing the validity of the report accurately.
Your performance as a volunteer is tracked through reputation points. <br/> Every true validation adds to your reputation points, while false validations may deduct from them.
Volunteers must validate reports accurately to uphold Guardian-line`&apos;`s credibility. Exercise caution to avoid false validations, which can result in reputation point deductions. Accumulating false validations may lead to a ban, but volunteers can justify themselves if necessary.
</h1>
          </div>
        </div>
        <div className="content-section">
          <div>
            <h1 className="dudeHeader text-slate-600 text-lg">Banning</h1>
          </div>
        </div>
        <div className="content-section">
          <div>
            <h1 className="dudeHeader text-slate-600 text-lg">Contact Us</h1>
          </div>
        </div>
        <div className="content-section">
          <div>
            <h1 className="dudeHeader text-slate-600 text-lg">What&apos;s this?</h1>
          </div>
        </div>
        <div className="content-section"></div>
        <div className="content-section"></div>
        <div className="content-section"></div>
        <div className="content-section"></div>
        <div className="content-section"></div>
      </div>

      <div className="animation-container" ref={dudeRef}>
        <svg viewBox="0 -10 315 350" className="dudeSvg">
          <g
            className="dude"
            stroke="black"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          >
            <g className="leg">
              <path
                className="leg-bottom"
                d="M182,317l-10.4-2.8c-2.7-0.7-4.5-3.2-4.4-6c1.7-13,3-27,3.7-42.1c0.8-16.5,0.7-32,0.1-46.1"
              />
              <path d="M171,220l6-60" />
            </g>
            <g className="leg">
              <path
                className="leg-bottom"
                d="M182,317l-10.2-2.7c-2.8-0.8-4.7-3.4-4.6-6.3c-0.8-13.9-1-29.2-0.2-45.8c0.7-15.2,2.1-29.4,4-42.2"
              />
              <path d="M171,222c0.3-10,4.3-42,5.3-48" />
            </g>

            <g className="arm">
              <path d="M175,75c-0.6,8.7-0.6,18.9,0.8,30.1c0.6,4.6,1.3,8.9,2.2,12.9" />
              <path
                className="arm-bottom"
                d="M186,175c-0.2-3.1-0.4-6.2-0.7-9.3c-1.5-16.9-4.1-32.9-7.3-47.7"
              />
            </g>
            <g className="arm">
              <path d="M178.8,82.2c-1.9,13.1-1.8,25.2-0.8,35.8" />
              <path
                className="arm-bottom"
                d="M186,175c-2.4-7.6-4.7-16.8-6.3-27.2c-1.6-11.3-2-21.3-1.7-29.8"
              />
            </g>
            <path
              className="head"
              d="M195,14.8c-10.8-5.7-23.9,1.3-28.2,12.4c-4.9,13,6.3,28.4,17.8,29.1c13.2,0.8,22.2-16.1,19.5-26.7c-1.6-6.5-5.2-7.1-5.2-7.1"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Page;
