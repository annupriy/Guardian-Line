"use client";
import React from "react";
import { ReactElement, useEffect, useRef, useState, ChangeEvent } from "react";
import PdfViewer from "../../Components/PdfViewer";
import { uploadFile } from "@/server/db/aws";
import toast, { Toaster } from "react-hot-toast";
import {SessionProvider, useSession } from 'next-auth/react';

const Page = () => {

    const { data: session } = useSession();

  const [toggleState, setToggleState] = useState(1);
  const [toggleState2, setToggleState2] = useState<number>(3);
  const [currentDoc, setCurrentDoc] = useState<{
    path: string;
    title: string;
  } | null>(null);

  const [incidentLocation, setIncidentLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");
  const [isCurrentLocationEnabled, setIsCurrentLocationEnabled] =
    useState(false);

  const handleToggleChange = () => {
    setIsCurrentLocationEnabled(!isCurrentLocationEnabled);
    if (!isCurrentLocationEnabled) {
      handleGetLocation();
    } else {
      setIncidentLocation(""); // Reset incident location if current location is disabled
    }
    console.log(incidentLocation)
  };

  const handleGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIncidentLocation({ latitude, longitude }); // Set location as object
        },
        (error) => {
          //   setError(error.message);
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } catch (error: any) {
      // Access error properties safely:
      //   setError(error.message);
      console.error(`Geolocation error: ${error.message}`);
    }
  };

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const toggle2 = (i: number) => {
    setToggleState2(i);
  };

  const [uploadedDocs, setUploadedDocs] = useState<
    { file: File; title: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        title: file.name,
      }));

      setUploadedDocs((prevDocs) => [...prevDocs, ...newFiles]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (index: number) => {
    setUploadedDocs((prevDocs) => [
      ...prevDocs.slice(0, index),
      ...prevDocs.slice(index + 1),
    ]);
    setDropdownIndex(null);
  };

  const toggleDropdownMore = (index: number | null) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const handleView = (index: number) => {
    // Handle view action
    setCurrentDoc({
      path: URL.createObjectURL(uploadedDocs[index].file),
      title: uploadedDocs[index].title,
    });
    setDropdownIndex(null);
  };

  const [typeOfIncident, setTypeOfIncident] = useState("");
  const [descriptionOfIncident, setDescriptionOfIncident] = useState("");
  const [personalInformation, setPersonalInformation] = useState("");

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeOfIncident(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
        // Handle the case where there is no active session
        return;
      }
  
      const userName = session.user.name;
  
      console.log("Username:", userName);

    console.log("Description:", descriptionOfIncident);
    console.log("Type", typeOfIncident);
    console.log("Location:", incidentLocation);
    let uploadedDocPath: Array<any> = [];
    if (uploadedDocs.length > 0) {
      // Use Promise.all to wait for all asynchronous operations
      await Promise.all(
        uploadedDocs.map(async (doc, index) => {
          const path = await uploadFile(doc.file);
          uploadedDocPath.push({ path: path, title: doc.title });
        })
      );
    }
    console.log("Uploaded Docs:", uploadedDocPath);
    const res = await toast.promise(
      fetch("api/reports_2", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          typeOfIncident,
          descriptionOfIncident,
          incidentLocation,
          personalInformation,
          uploadedDocPath,
          userName: userName, 
        }),
      }),
      {
        loading: "Submitting...",
        success: "Submitted",
        error: "Error submitting form. Please try again.",
      },
      {
        style: {
          minWidth: "200px",
        },
      }
    );
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      console.log("Deleted");
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error submitting form. Please try again.");
      } else {
        toast.error("Could not submit form");
      }
    }
  };

  return (
    <div className="p-6">
      <form
        action=""
        className="shadow-lg border rounded-md border-gray-700 bg-white mx-auto w-2/3"
        onSubmit={handleSubmit}
      >
        <Toaster />
        {/* <div className='w-full p-4 m-0 mx-auto border-gray-700'></div> */}
        <div className=" bg-white mt-2 p-4">
          <div className="text-md flex mb-3">
            <span className="text-red-500 pr-2 text-lg">*</span>
            <span>Required Fields</span>
          </div>
          <span className="text-red-500 text-lg">*</span>
          <span className="p-2">I am:</span>
          <div
            role="tablist"
            className="tabs tabs-bordered tabs-lg grid grid-cols-2 border border-gray-400"
          >
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Victim"
              onClick={() => toggleTab(1)}
              checked={toggleState === 1}
              style={{ fontWeight: toggleState === 1 ? "medium" : "normal" }}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 p-6"
            >
              <p className="text-xl font-medium"> INCIDENT DESCRIPTION</p>
              <hr className=" border border-gray-500" />
              <div className="mt-6 grid grid-cols">
                <div className="flex">
                  <p className="mr-2 font-normal text-sm font-mono">
                    Type of Incident
                  </p>
                  <span className="text-red-500 text-lg ">*</span>
                </div>
                <select
                  className="select border-black mt-0"
                  onChange={handleTypeChange}
                  value={typeOfIncident}
                >
                  <option disabled selected>
                    Accidents
                  </option>
                  <option>Harassment</option>
                  <option>Mob Lynching & Crowd Fights</option>
                  <option>Others</option>
                </select>
                <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm font-mono">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-3">*</span>
                </div>
                {/* <textarea className="textarea textarea-bordered border-black mt-0" placeholder=""></textarea> */}
                <input
                  className="textarea textarea-bordered border-black mt-0"
                  onChange={(e) => setDescriptionOfIncident(e.target.value)}
                  value={descriptionOfIncident}
                  type="text"
                  id="description"
                />
                <div className="flex mt-4">
                <label htmlFor="label">Enable Current Location</label>
                <input
                  type="checkbox"
                  className="toggle toggle-success ml-4"
                  checked={isCurrentLocationEnabled}
                  onChange={handleToggleChange}
                />
                </div>
                {!isCurrentLocationEnabled && (
                  <div className="grid grid-rows-2 items-center mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                    <div>
                      <label
                        className="font-light font-mono text-sm mt-2"
                        style={{ fontFamily: "" }}
                      >
                        {"Location of Incident"}
                      </label>
                      <input
                        type="text"
                        className="w-full border border-neutral-900 rounded-lg px-4 py-3 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                        onChange={(e) => setIncidentLocation(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-black flex">
                    <p className="text-sm  mt-6 ml-1">
                      {"Additional Documents"}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex w-full">
                      <div className="w-full">
                        <div
                          className="flex h-[125px] w-full rounded-[20px] border border-blue-700 hover:cursor-pointer"
                          onClick={handleUploadClick}
                        >
                          <div className="m-auto">
                            <span
                              className="  text-xl font-medium text-blue-700"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              <img
                                src="/upload.svg"
                                alt="See Options"
                                className="inline -translate-y-1 w-6 h-6"
                              />{" "}
                              {"Drag and drop"}
                            </span>
                            <span
                              className="  text-xl font-medium text-neutral-400"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              {" "}
                              {"or browse files"}
                            </span>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          id="dropzone-file"
                          type="file"
                          onChange={handleDocsChange}
                          multiple
                          className="hidden"
                        />
                      </div>
                    </div>
                    {currentDoc && (
                      <div className="fixed top-0 left-0 z-[53] flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
                        <div className="rounded-lg bg-white p-4">
                          <PdfViewer
                            url={currentDoc.path}
                            type={
                              currentDoc.title.toLowerCase().endsWith(".mp4")
                                ? "video"
                                : /\.(jpeg|jpg|gif|png)$/.test(
                                    currentDoc.title.toLowerCase()
                                  )
                                ? "image"
                                : "None"
                            }
                          />

                          <button
                            className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-700"
                            onClick={() => setCurrentDoc(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    {uploadedDocs.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {uploadedDocs.map((doc, index) => (
                          <div
                            key={index}
                            className="mb-3 flex h-20 w-72 justify-between rounded-[50px] border border-black bg-white md:w-full lg:m-3"
                          >
                            <div
                              className="ml-4 flex items-center break-all   text-base font-medium text-black"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              {doc.title}
                            </div>
                            <div
                              className="relative ml-4 flex cursor-pointer items-center px-2   text-base font-medium text-black"
                              onClick={() => toggleDropdownMore(index)}
                              style={{ fontFamily: "" }}
                            >
                              <img src="/more.svg" className="inline" alt="" />
                              {dropdownIndex === index && (
                                <div className="absolute left-0 top-[2.7rem] w-36 overflow-hidden rounded-[10px] border border-neutral-900 bg-white shadow-lg">
                                  <div
                                    onClick={() => handleView(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                                  >
                                    {"View"}
                                  </div>
                                  <div
                                    onClick={() => handleDelete(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                                  >
                                    {"Delete"}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-xl mt-6 font-medium">
                    {" "}
                    PERSONAL INFORMATION(Not Mandatory)
                  </p>
                  <hr className="border border-gray-500" />
                  <p className="mt-3 text-sm italic font-mono">
                    Tell us about your appearance to Identify you correctly
                  </p>
                  <textarea
                    className="textarea textarea-bordered border-black"
                    placeholder=""
                  ></textarea>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Not-Victim"
              onClick={() => toggleTab(2)}
              checked={toggleState === 2}
              style={{ fontWeight: toggleState === 2 ? "medium" : "normal" }}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300  p-6"
            >
              <p className="text-xl font-medium"> INCIDENT DESCRIPTION</p>
              <hr className="border border-gray-500" />
              <div className="mt-6 grid grid-cols">
                <div className="flex">
                  <p className="mr-2 font-normal text-sm font-mono">
                    Type of Incident
                  </p>
                  <span className="text-red-500 text-lg ">*</span>
                </div>
                <select className="select border-black mt-0">
                  <option disabled selected>
                    Accidents
                  </option>
                  <option>Harassment</option>
                  <option>Mob Lynching & Crowd Fights</option>
                  <option>Others</option>
                </select>
                <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm font-mono">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-3">*</span>
                </div>
                <textarea
                  className="textarea textarea-bordered border-black mt-0"
                  placeholder=""
                ></textarea>
                <div className="grid grid-rows-2 items-center   mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                  <div>
                    <label
                      className="font-light font-mono text-sm mt-3"
                      style={{ fontFamily: "" }}
                    >
                      {"Location of Incident"}
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-900 rounded-lg px-4 py-3 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                      placeholder=""
                      style={{ fontFamily: "" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-black flex">
                    <p className="text-sm  mt-6 ml-1">
                      {"Additional Documents"}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex w-full">
                      <div className="w-full">
                        <div
                          className="flex h-[125px] w-full rounded-[20px] border border-blue-700 hover:cursor-pointer"
                          onClick={handleUploadClick}
                        >
                          <div className="m-auto">
                            <span
                              className="  text-xl font-medium text-blue-700"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              <img
                                src="/upload.svg"
                                alt="See Options"
                                className="inline -translate-y-1 w-6 h-6"
                              />{" "}
                              {"Drag and drop"}
                            </span>
                            <span
                              className="  text-xl font-medium text-neutral-400"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              {" "}
                              {"or browse files"}
                            </span>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          id="dropzone-file"
                          type="file"
                          onChange={handleDocsChange}
                          multiple
                          className="hidden"
                        />
                      </div>
                    </div>
                    {currentDoc && (
                      <div className="fixed top-0 left-0 z-[53] flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
                        <div className="rounded-lg bg-white p-4">
                          <PdfViewer
                            url={currentDoc.path}
                            type={
                              currentDoc.title.toLowerCase().endsWith(".mp4")
                                ? "video"
                                : /\.(jpeg|jpg|gif|png)$/.test(
                                    currentDoc.title.toLowerCase()
                                  )
                                ? "image"
                                : "None"
                            }
                          />

                          <button
                            className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-700"
                            onClick={() => setCurrentDoc(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    {uploadedDocs.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {uploadedDocs.map((doc, index) => (
                          <div
                            key={index}
                            className="mb-3 flex h-20 w-72 justify-between rounded-[50px] border border-black bg-white md:w-full lg:m-3"
                          >
                            <div
                              className="ml-4 flex items-center break-all   text-base font-medium text-black"
                              style={{ fontFamily: "__POPPINS_C17214" }}
                            >
                              {doc.title}
                            </div>
                            <div
                              className="relative ml-4 flex cursor-pointer items-center px-2   text-base font-medium text-black"
                              onClick={() => toggleDropdownMore(index)}
                              style={{ fontFamily: "" }}
                            >
                              <img src="/more.svg" className="inline" alt="" />
                              {dropdownIndex === index && (
                                <div className="absolute left-0 top-[2.7rem] w-36 overflow-hidden rounded-[10px] border border-neutral-900 bg-white shadow-lg">
                                  <div
                                    onClick={() => handleView(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                                  >
                                    {"View"}
                                  </div>
                                  <div
                                    onClick={() => handleDelete(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                                  >
                                    {"Delete"}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl mt-6 font-medium">
                    {" "}
                    PERSONAL INFORMATION(Not Mandatory)
                  </p>
                  <hr className="border border-gray-500" />
                  <p className="mt-3 text-sm italic font-mono">
                    Tell us about your appearance to Identify you correctly
                  </p>
                  {/* <textarea className="textarea textarea-bordered border-black" placeholder=""></textarea> */}
                  <input
                    className="textarea textarea-bordered border-black"
                    type="text"
                    onChange={(e) => setPersonalInformation(e.target.value)}
                    value={personalInformation}
                    style={{ fontFamily: "" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between grid-cols-2">
            <button className="btn  btn-error btn-xs sm:btn-sm md:btn-md w-1/3 rounded-xl ">
              Cancel
            </button>
            <button className="btn btn-success btn-xs  sm:btn-sm md:btn-md w-1/3 rounded-xl">
              Review & Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const WrappedPage = () => (
  <SessionProvider>
    <Page />
  </SessionProvider>
);

export default WrappedPage;
