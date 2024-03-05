"use client";
import React from "react";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import PdfViewer from "../../Components/PdfViewer";
import { uploadFile } from "@/server/db/aws";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const [toggleState, setToggleState] = useState(1);
  const [toggleState2, setToggleState2] = useState<number>(3);
  const [currentDoc, setCurrentDoc] = useState<{
    path: string;
    title: string;
  } | null>(null);
  const router = useRouter();
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
  const [typeOfIncident, setTypeOfIncident] = useState("Harassment");
  const [descriptionOfIncident, setDescriptionOfIncident] = useState("");
  // const [incidentLocation, setIncidentLocation] = useState("");
  const [personalInformation, setPersonalInformation] = useState("");
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  const [dateOfIncident, setDateOfIncident] = useState(formattedDate);
  const [timeOfIncident, setTimeOfIncident] = useState(formattedTime);
  // const [elaborateLocation, setElaborateLocation] = useState('')
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Live");
  const [address, setAddress] = useState("");
  // const uploadedUrls: {title: string, url: string }[] = [];
  const formatInput = (date: string) => {
    date = date.split("-").reverse().join("/");
    return date;
  };
  const [incidentLocation, setIncidentLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  }>({} as any);
  const [userStatus, setUserStatus] = useState<string>("victim");

  const handleGetAddress = async (latitude: number, longitude: number) => {
    try {
      console.log("Key is: ", process.env.NEXT_PUBLIC_GEOCODING_API_KEY);
      const res = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch address");
      }
      const data = await res.json();
      console.log("Address:", data);
      return data.display_name;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching address");
    }
  };

  const handleGetCoordinates = async (address: string) => {
    try {
      const res = await fetch(
        `https://geocode.maps.co/search?q=${address}&api_key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch coordinates");
      }
      const data = await res.json();
      console.log("Coordinates:", data);
      setIncidentLocation({ latitude: data.lat, longitude: data.lon, address });
      return { latitude: data[0].lat, longitude: data[0].lon };
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching coordinates");
    }
  };
  const [isCurrentLocationEnabled, setIsCurrentLocationEnabled] =
    useState(false);

  const handleToggleChange = () => {
    setIsCurrentLocationEnabled(!isCurrentLocationEnabled);
    if (!isCurrentLocationEnabled) {
      handleGetLocation();
    } else {
      setAddress("");
      setIncidentLocation({} as any);
    }
  };

  const handleGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userAddress = await handleGetAddress(latitude, longitude);
          setIncidentLocation({ latitude, longitude, address: userAddress });
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
    console.log(uploadedDocs);
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
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeOfIncident(event.target.value);
  };

  const handleTypeChangeForState = (event: ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      // Handle the case where there is no active session
      return;
    }
    const userName = session.user.name;
    const timeInMs = Date.now();
    const timestamp = `${timeInMs}`;

    // const reportid = userName + timestamp.toString();
    const reportid = `${userName}_${timestamp}`;
    toast.loading("Submitting...");
    let uploadedDocPath: Array<any> = [];

    // let mp4Urls: Array<string> = [];

    if (uploadedDocs.length > 0) {
      // Use Promise.all to wait for all asynchronous operations
      await Promise.all(
        uploadedDocs.map(async (doc, index) => {
          const path = await uploadFile(doc.file);
          uploadedDocPath.push({ path: path, title: doc.title });
        })
      );
    }

    let Loc = {};
    if (address !== "") {
      let obj;
      if (status === "Live") {
        obj = await handleGetCoordinates(address);
      } else {
        console.log("city: ", city);
        console.log("state: ", state);
        console.log("pincode: ", pincode);
        const refinedaddress = city + ", " + state + ", " + pincode;
        obj = await handleGetCoordinates(refinedaddress);
      }
      console.log("obj: ", obj);
      if (!obj) {
        return;
      }
      Loc = {
        latitude: obj.latitude,
        longitude: obj.longitude,
        address: address,
      };
    } else {
      Loc = incidentLocation;
    }
    const formatDate = formatInput(dateOfIncident);
    toast.dismiss();
    const res = await toast.promise(
      fetch("api/reports_2", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          typeOfIncident,
          descriptionOfIncident,
          incidentLocation: Loc,
          personalInformation,
          dateOfIncident: formatDate,
          timeOfIncident,
          reportid,
          city,
          state,
          pincode,
          uploadedDocPath,
          userName: userName,
          userStatus,
          status,
          filingtime: new Date().getTime(),
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
      console.log("Submitted");
      router.push("/dashboard");
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
    <div
      className="p-6 relative z-10 bg-stone-200"
      style={{
        marginTop: "120px",
        height: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <form
        className="shadow-xl border rounded-md border-gray-700 bg-white mx-auto w-2/3 relative z-20"
        onSubmit={handleSubmit}
      >
        <Toaster />
        {/* <div className='w-full p-4 m-0 mx-auto border-gray-700'></div> */}
        <div className=" bg-white mt-2 p-4">
          <div className="text-md flex mb-3">
            <span className="text-red-500 pr-2 text-lg">*</span>
            <span>Required Fields</span>
          </div>

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
              onChange={() => {
                toggleTab(1);
                if (toggleState === 1) {
                  setUserStatus("victim");
                }
              }}
              checked={toggleState === 1}
              style={{ fontWeight: toggleState === 1 ? "medium" : "normal" }}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 p-6 "
            >
              <p className="text-xl font-medium"> INCIDENT DESCRIPTION</p>
              <hr className=" border border-gray-500" />
              <div className="mt-6 grid grid-cols">
                <div className="flex">
                  <p className="mr-2 font-normal text-sm font-mono">
                    Type of Incident
                  </p>
                </div>
                <select
                  className="select border-black mt-0"
                  onChange={handleTypeChange}
                  value={typeOfIncident}
                >
                  <option>Accidents</option>
                  <option>Harassment</option>
                  <option>Mob Lynching & Crowd Fights</option>
                  <option>Others</option>
                </select>
                {/* <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm ">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-3">*</span>
                </div>
                <textarea
                  className="textarea textarea-bordered border-black mt-0"
                  placeholder=""
                ></textarea> */}

                <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm font-mono">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-1.5">*</span>
                </div>
                {/* <textarea className="textarea textarea-bordered border-black mt-0" placeholder=""></textarea> */}
                <input
                  className="textarea textarea-bordered border-black mt-0"
                  onChange={(e) => setDescriptionOfIncident(e.target.value)}
                  value={descriptionOfIncident}
                  type="text"
                  id="description"
                  name="description"
                  required
                />

                <div className=" mt-6 font-normal text-sm font-mono">
                  <p className="mr-2">Is the Incident Live or Not ?</p>
                </div>
                <div
                  role="tablist"
                  className="tabs tabs-bordered tabs-sm p-1 grid grid-cols-2"
                >
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab font-light  text-sm"
                    aria-label="LIVE"
                    onChange={() => {
                      toggle2(3);
                      setStatus("Live");
                    }}
                    checked={toggleState2 === 3 && toggleState === 1}
                  />
                  <div role="tabpanel" className="tab-content p-2">
                    <div className="grid grid-rows-2 items-center mt-2  gap-8 md:grid-cols-2 md:grid-rows-none">
                      <div className="flex mt-4 font-normal text-sm font-mono">
                        <label htmlFor="label">Enable Current Location</label>
                        <input
                          type="checkbox"
                          className="toggle toggle-success ml-4"
                          checked={isCurrentLocationEnabled}
                          onChange={handleToggleChange}
                        />
                      </div>
                      {!isCurrentLocationEnabled && (
                        // <div className="grid grid-rows-2 items-center mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                        <div>
                          <label
                            className="font-light font-mono text-sm mt-2"
                            style={{ fontFamily: "" }}
                          >
                            {"Location of Incident"}
                          </label>
                          <span className="text-red-500 text-lg ">*</span>
                          <input
                            type="text"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            required={status === "Live" && toggleState === 1}
                          />
                        </div>
                        // </div>
                      )}

                      {/* <div>
                        <label
                          className="font-light  text-sm mt-2"
                          style={{ fontFamily: "" }}
                        >
                          {"Location of Incident"} <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full font-normal text-sm font-mono rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setAddress(e.target.value)}
                          
                          placeholder=""
                          style={{ fontFamily: "" }}
                          required
                        />
                      </div> */}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab text-sm  font-light"
                    aria-label="NOT LIVE"
                    onChange={() => {
                      toggle2(4);
                      setStatus("Not Live");
                    }}
                    checked={toggleState2 === 4 && toggleState === 1}
                  />
                  <div
                    role="tabpanel"
                    className="tab-content p-2 text-sm  font-light mt-2"
                  >
                    <div className="grid grid-rows-2 items-center gap-8  md:grid-cols-2 md:grid-rows-none">
                      <div>
                        <label
                          className="font-light  text-sm text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Date of Incident"}{" "}
                          <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <input
                            type="date"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setDateOfIncident(e.target.value)}
                            value={dateOfIncident}
                            placeholder="dd/mm/yyyy"
                            name="dateOfIncident"
                            required={status === "Not Live"}
                          />
                          {dateOfIncident}
                        </div>
                      </div>

                      <div>
                        <label
                          className="font-light  text-sm mt-2 text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Time of Incident"}
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <input
                            type="time"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setTimeOfIncident(e.target.value)}
                            value={timeOfIncident}
                            placeholder=""
                            style={{ fontFamily: "" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-rows-2 items-center   mt-4 gap-8 md:grid-cols-2 md:grid-rows-none">
                      <div className="flex mt-4 font-normal text-sm font-mono">
                        <label htmlFor="label">Enable Current Location</label>
                        <input
                          type="checkbox"
                          className="toggle toggle-success ml-4"
                          checked={isCurrentLocationEnabled}
                          onChange={handleToggleChange}
                        />
                      </div>
                      {!isCurrentLocationEnabled && (
                        // <div className="grid grid-rows-2 items-center mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                        <div>
                          <label
                            className="font-light font-mono text-sm mt-2"
                            style={{ fontFamily: "" }}
                          >
                            {"Location of Incident"}
                          </label>
                          <span className="text-red-500 text-lg ">*</span>
                          <input
                            type="text"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            required={
                              status === "Not Live" && toggleState === 1
                            }
                          />
                        </div>
                        // </div>
                      )}

                      {/* <div>
                        <label
                          className="font-light  text-sm mt-2 text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Location of Incident"} <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setAddress(e.target.value)}
                          
                          placeholder=""
                          style={{ fontFamily: "" }}
                        />
                      </div> */}

                      <div>
                        <label
                          className=" font-light text-sm"
                          style={{ fontFamily: "" }}
                        >
                          {"City"}
                        </label>
                        <span className="text-red-500 text-lg ">*</span>
                        <input
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          placeholder="City"
                          name="city"
                          required={status === "Not Live"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-rows-2 items-center gap-8 md:grid-cols-2 md:grid-rows-none mt-4">
                      <div>
                        <label
                          className=" font-light text-sm text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"State"}
                        </label>
                        <span className="text-red-500 text-lg ">*</span>
                        <select
                          className="w-full rounded-full border border-neutral-900  text-gray-600 px-4 py-2 bg-white focus:outline-none  sm:text-sm"
                          onChange={handleTypeChangeForState}
                          value={state}
                          name="state"
                          required={status === "Not Live"}
                        >
                          <option value="">Select State</option>
                          <option value="AN">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="AP">Andhra Pradesh</option>
                          <option value="AR">Arunachal Pradesh</option>
                          <option value="AS">Assam</option>
                          <option value="BR">Bihar</option>
                          <option value="CH">Chandigarh</option>
                          <option value="CT">Chhattisgarh</option>
                          <option value="DN">Dadra and Nagar Haveli</option>
                          <option value="DD">Daman and Diu</option>
                          <option value="DL">Delhi</option>
                          <option value="GA">Goa</option>
                          <option value="GJ">Gujarat</option>
                          <option value="HR">Haryana</option>
                          <option value="HP">Himachal Pradesh</option>
                          <option value="JK">Jammu and Kashmir</option>
                          <option value="JH">Jharkhand</option>
                          <option value="KA">Karnataka</option>
                          <option value="KL">Kerala</option>
                          <option value="LA">Ladakh</option>
                          <option value="LD">Lakshadweep</option>
                          <option value="MP">Madhya Pradesh</option>
                          <option value="MH">Maharashtra</option>
                          <option value="MN">Manipur</option>
                          <option value="ML">Meghalaya</option>
                          <option value="MZ">Mizoram</option>
                          <option value="NL">Nagaland</option>
                          <option value="OR">Odisha</option>
                          <option value="PY">Puducherry</option>
                          <option value="PB">Punjab</option>
                          <option value="RJ">Rajasthan</option>
                          <option value="SK">Sikkim</option>
                          <option value="TN">Tamil Nadu</option>
                          <option value="TG">Telangana</option>
                          <option value="TR">Tripura</option>
                          <option value="UP">Uttar Pradesh</option>
                          <option value="UT">Uttarakhand</option>
                          <option value="WB">West Bengal</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className="text-sm  font-light text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"PIN Code"}
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setPincode(e.target.value)}
                          value={pincode}
                          placeholder={"PIN Code"}
                          style={{ fontFamily: "" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className=" flex">
                    <p className="text-sm  mt-6 ml-1 font-normal font-mono">
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
                    PERSONAL INFORMATION (Not Mandatory)
                  </p>
                  <hr className="border border-gray-500" />
                  <p className="mt-3 text-sm italic ">
                    Tell us about your appearance to Identify you correctly
                  </p>
                  {/* <textarea
                    className="textarea textarea-bordered border-black"
                    placeholder=""
                  ></textarea> */}
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
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Not-Victim"
              onChange={() => {
                toggleTab(2);
                if (toggleState === 2) {
                  setUserStatus("not victim");
                }
              }}
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
                  <p className="mr-2 font-normal text-sm font-mono ">
                    Type of Incident
                  </p>
                </div>
                <select
                  className="select border-black mt-0"
                  onChange={handleTypeChange}
                  value={typeOfIncident}
                >
                  <option>Accidents</option>
                  <option>Harassment</option>
                  <option>Mob Lynching & Crowd Fights</option>
                  <option>Others</option>
                </select>
                {/* <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm ">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-3">*</span>
                </div> */}

                <div className="flex">
                  <p className="mt-3 mr-2 font-normal text-sm font-mono">
                    Description of the Incident
                  </p>
                  <span className="text-red-500 text-lg mt-1.5">*</span>
                </div>
                {/* <textarea className="textarea textarea-bordered border-black mt-0" placeholder=""></textarea> */}
                <input
                  className="textarea textarea-bordered border-black mt-0"
                  onChange={(e) => setDescriptionOfIncident(e.target.value)}
                  value={descriptionOfIncident}
                  type="text"
                  id="description"
                  name="description"
                  required
                />

                <div className="flex mt-6 font-normal text-sm font-mono">
                  <p className="mr-2">Is the Incident Live or Not ?</p>
                </div>
                <div
                  role="tablist"
                  className="tabs tabs-bordered tabs-sm p-1 grid grid-cols-2"
                >
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab font-light  text-sm"
                    aria-label="LIVE"
                    onChange={() => {
                      toggle2(3);
                      setStatus("Live");
                    }}
                    checked={toggleState2 === 3 && toggleState === 2}
                  />
                  <div role="tabpanel" className="tab-content p-2">
                    <div className="grid grid-rows-2 items-center mt-2  gap-8 md:grid-cols-2 md:grid-rows-none">
                      <div className="flex mt-4 font-normal text-sm font-mono">
                        <label htmlFor="label">Enable Current Location</label>
                        <input
                          type="checkbox"
                          className="toggle toggle-success ml-4"
                          checked={isCurrentLocationEnabled}
                          onChange={handleToggleChange}
                        />
                      </div>
                      {!isCurrentLocationEnabled && (
                        // <div className="grid grid-rows-2 items-center mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                        <div>
                          <label
                            className="font-light font-mono text-sm mt-2"
                            style={{ fontFamily: "" }}
                          >
                            {"Location of Incident"}
                          </label>
                          <span className="text-red-500 text-lg ">*</span>
                          <input
                            type="text"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            required={status === "Live" && toggleState === 2}
                          />
                        </div>
                        // </div>
                      )}

                      {/* <div>
                        <label
                          className="font-light  text-sm mt-2 text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Location of Incident"} <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                          
                          className="w-full font-light  text-sm rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          placeholder=""
                          style={{ fontFamily: "" }}
                          required
                        />
                      </div> */}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab text-sm  font-light"
                    aria-label="NOT LIVE"
                    onChange={() => {
                      toggle2(4);
                      setStatus("Not Live");
                    }}
                    checked={toggleState2 === 4 && toggleState === 2}
                  />
                  <div
                    role="tabpanel"
                    className="tab-content p-4 text-sm  font-light mt-2 text-gray-600"
                  >
                    <div className="grid grid-rows-2 items-center gap-8  md:grid-cols-2 md:grid-rows-none">
                      <div>
                        <label
                          className="font-light  text-sm text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Date of Incident"}{" "}
                          <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <input
                            type="date"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setDateOfIncident(e.target.value)}
                            value={dateOfIncident}
                            placeholder="dd/mm/yyyy"
                            style={{ fontFamily: "" }}
                            name="dateOfIncident"
                            required={status === "Not Live"}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="font-light  text-sm mt-2 text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Time of Incident"}
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <input
                            type="time"
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setTimeOfIncident(e.target.value)}
                            value={timeOfIncident}
                            placeholder=""
                            style={{ fontFamily: "" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-rows-2 items-center   mt-4 gap-8 md:grid-cols-2 md:grid-rows-none">
                      <div className="flex mt-4 font-normal text-sm font-mono text-gray-400">
                        <label htmlFor="label">Enable Current Location</label>
                        <input
                          type="checkbox"
                          className="toggle toggle-success ml-4"
                          checked={isCurrentLocationEnabled}
                          onChange={handleToggleChange}
                        />
                      </div>
                      {!isCurrentLocationEnabled && (
                        // <div className="grid grid-rows-2 items-center mt-2 gap-8 md:grid-cols-2 md:grid-rows-none">
                        <div>
                          <label
                            className="font-light font-mono text-sm mt-2 text-gray-400"
                            style={{ fontFamily: "" }}
                          >
                            {"Location of Incident"}
                          </label>
                          <span className="text-red-500 text-lg ">*</span>
                          <input
                            type="text "
                            className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            required={
                              status === "Not Live" && toggleState === 2
                            }
                          />
                        </div>
                        // </div>
                      )}

                      {/* <div>
                        <label
                          className="font-light  text-sm mt-2 text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"Location of Incident"} <span className="text-red-500 text-lg mt-3">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setAddress(e.target.value)}
                          
                          placeholder=""
                          style={{ fontFamily: "" }}
                          required
                        />
                      </div> */}

                      <div>
                        <label
                          className=" font-light text-sm text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"City"}
                        </label>
                        <span className="text-red-500 text-lg ">*</span>
                        <input
                          type="text"
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                          placeholder="City"
                          style={{ fontFamily: "" }}
                          name="city"
                          required={status === "Not Live"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-rows-2 items-center gap-8 md:grid-cols-2 md:grid-rows-none mt-4">
                      <div>
                        <label
                          className=" font-light text-sm text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"State"}
                        </label>
                        <span className="text-red-500 text-lg ">*</span>
                        <select
                          className="w-full rounded-full border border-neutral-900  text-gray-600 px-4 py-2 bg-white focus:outline-none  sm:text-sm"
                          onChange={handleTypeChangeForState}
                          value={state}
                          name="state"
                          required={status === "Not Live"}
                        >
                          <option value="">Select State</option>
                          <option value="AN">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="AP">Andhra Pradesh</option>
                          <option value="AR">Arunachal Pradesh</option>
                          <option value="AS">Assam</option>
                          <option value="BR">Bihar</option>
                          <option value="CH">Chandigarh</option>
                          <option value="CT">Chhattisgarh</option>
                          <option value="DN">Dadra and Nagar Haveli</option>
                          <option value="DD">Daman and Diu</option>
                          <option value="DL">Delhi</option>
                          <option value="GA">Goa</option>
                          <option value="GJ">Gujarat</option>
                          <option value="HR">Haryana</option>
                          <option value="HP">Himachal Pradesh</option>
                          <option value="JK">Jammu and Kashmir</option>
                          <option value="JH">Jharkhand</option>
                          <option value="KA">Karnataka</option>
                          <option value="KL">Kerala</option>
                          <option value="LA">Ladakh</option>
                          <option value="LD">Lakshadweep</option>
                          <option value="MP">Madhya Pradesh</option>
                          <option value="MH">Maharashtra</option>
                          <option value="MN">Manipur</option>
                          <option value="ML">Meghalaya</option>
                          <option value="MZ">Mizoram</option>
                          <option value="NL">Nagaland</option>
                          <option value="OR">Odisha</option>
                          <option value="PY">Puducherry</option>
                          <option value="PB">Punjab</option>
                          <option value="RJ">Rajasthan</option>
                          <option value="SK">Sikkim</option>
                          <option value="TN">Tamil Nadu</option>
                          <option value="TG">Telangana</option>
                          <option value="TR">Tripura</option>
                          <option value="UP">Uttar Pradesh</option>
                          <option value="UT">Uttarakhand</option>
                          <option value="WB">West Bengal</option>
                        </select>

                        <div>
                          <label
                            className="text-sm  font-light text-gray-400"
                            style={{ fontFamily: "" }}
                          >
                            {"PIN Code"}
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                            onChange={(e) => setPincode(e.target.value)}
                            value={pincode}
                            placeholder={"PIN Code"}
                            style={{ fontFamily: "" }}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="text-sm  font-light text-gray-400"
                          style={{ fontFamily: "" }}
                        >
                          {"PIN Code"}
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                          onChange={(e) => setPincode(e.target.value)}
                          value={pincode}
                          placeholder={"PIN Code"}
                          style={{ fontFamily: "" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" flex">
                    <p className="text-sm  mt-6 ml-1 font-normal font-mono">
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
                  <div className="flex">
                    <p className="text-xl mt-6 font-medium">
                      {" "}
                      PERSONAL INFORMATION (Not Mandatory)
                    </p>
                  </div>
                  <hr className="border border-gray-500" />
                  <p className="mt-3 text-sm italic font-light">
                    Tell us about victim&apos;s appearance to Identify victim
                    correctly
                  </p>
                  {/* <textarea
                    className="textarea textarea-bordered border-black"
                    placeholder=""
                  ></textarea> */}
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
            <button
              className="btn  btn-error btn-xs sm:btn-sm md:btn-md w-1/3 rounded-xl "
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push("/dashboard");
              }}
            >
              Cancel
            </button>
            <button className="btn btn-success btn-xs  sm:btn-sm md:btn-md w-1/3 rounded-xl">
              Submit
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
