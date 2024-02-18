'use client'
import React from 'react'
// import {useState} from 'react';
import { NextPageContext } from "next";
import router, { Router } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import PdfViewer from "../Components/pdfViewer";
import Doc_upload from '../Components/Doc_upload';

const Page = () => {
    const [toggleState, setToggleState] = useState(1);
    const [toggleState2, setToggleState2] = useState<number>(3);
    const [currentDoc, setCurrentDoc] = useState<{ path: string; title: string } | null>(null);

    const toggleTab = (index: number) => {
        setToggleState(index);
    };

    const toggle2 = (i: number) => {
        setToggleState2(i);
    };

    const [uploadedDocs, setUploadedDocs] = useState<{ file: File; title: string }[]>([]);
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
  
      // next.config.js
  
  
    
  
      const handleUploadClick = () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        };
  
      const handleDelete = (index: number) => {
      setUploadedDocs((prevDocs) => [...prevDocs.slice(0, index), ...prevDocs.slice(index + 1)]);
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

    return (
        <div className='p-6'>
            <form action="" className='shadow-lg border rounded-md border-gray-700 bg-white mx-auto w-2/3'>
                {/* <div className='w-full p-4 m-0 mx-auto border-gray-700'></div> */}
                <div className=' bg-white mt-2 p-4'>
                <div className='text-md flex mb-3'><span className="text-red-500 pr-2 text-lg">*</span><span>Required Fields</span></div>                    
                    <span className='text-red-500 text-lg'>*</span><span className='p-2'>I am:</span>
                    <div role="tablist" className="tabs tabs-bordered tabs-lg grid grid-cols-2 border border-gray-400">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Victim" onClick={() => toggleTab(1)} checked={toggleState === 1} style={{fontWeight:(toggleState === 1)?'medium':'normal'}} />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-6 ">
                            <p className='text-xl font-medium'> INCIDENT DESCRIPTION</p>
                            <hr className=' border border-gray-500' />
                            <div className='mt-6 grid grid-cols'>
                                <div className='flex'><p className='mr-2 font-normal text-sm font-mono'>Type of Incident</p><span className='text-red-500 text-lg '>*</span></div>
                                <select className="select border-black mt-0">
                                    <option disabled selected>Accidents</option>
                                    <option>Harassment</option>
                                    <option>Mob Lynching & Crowd Fights</option>
                                    <option>Others</option>
                                </select>
                                <div className='flex'><p className='mt-3 mr-2 font-normal text-sm font-mono' >Description of the Incident</p><span className='text-red-500 text-lg mt-3'>*</span></div>
                                <textarea className="textarea textarea-bordered border-black mt-0" placeholder=""></textarea>

                                
                                <div className='flex mt-6 font-light font-mono text-sm'><p className='mr-2'>Does the Incident Live or Not ?</p><span className='text-red-500 text-lg'>*</span></div>
                                <div role="tablist" className="tabs tabs-bordered tabs-sm p-1 grid grid-cols-4">
                                <input type="radio" name="my_tabs_1" role="tab" className="tab font-light font-mono text-sm" aria-label="LIVE" onClick={() => toggle2(3)} checked={toggleState2 === 3 && toggleState === 1} />
                                        <div role="tabpanel" className="tab-content p-2"> 
                                        <div className="grid grid-rows-2 items-center mt-2  gap-8 md:grid-cols-2 md:grid-rows-none">
                                                    <div>
                                                        <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                            {("Location of Incident")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full font-light font-mono text-sm rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                            placeholder=""
                                                            style={{ fontFamily: "" }}
                                                        />
                                                    </div>  
                                                </div>
                                        </div>
                                        <input type="radio" name="my_tabs_1" role="tab" className="tab text-sm font-mono font-light" aria-label="NOT LIVE" onClick={() => toggle2(4)} checked={toggleState2 === 4 && toggleState === 1} />
                                            <div role="tabpanel" className="tab-content p-2 text-sm font-mono font-light mt-2">
                                            <div className="grid grid-rows-2 items-center gap-8  md:grid-cols-2 md:grid-rows-none">
                                                            <div>
                                                                <label className="font-light font-mono text-sm" style={{ fontFamily: "" }}>
                                                                {("Date of Incident")}
                                                                </label>
                                                        <div className="relative text-gray-400 focus-within:text-gray-600">
                                                                <input
                                                                    type="date"
                                                                    className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                    placeholder="25/02/2020"
                                                                    style={{ fontFamily: "" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                            {("Time of Incident")}
                                                            </label>
                                                        <div className="relative text-gray-400 focus-within:text-gray-600">
                                                            <input
                                                                type="time"
                                                                className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                placeholder=""
                                                                style={{ fontFamily: "" }}
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-rows-2 items-center   mt-4 gap-8 md:grid-cols-2 md:grid-rows-none">
                                                        <div>
                                                            <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                                {("Location of Incident")}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                placeholder=""
                                                                style={{ fontFamily: "" }}
                                                            />
                                                        </div> 

                                                    <div>
                                                    <label className="font-mono font-light text-sm" style={{ fontFamily: "" }}>
                                                        {("city")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                        placeholder="city"
                                                        style={{ fontFamily: "" }}
                                                    />
                                                </div>   
                                                </div>

                                                <div className="grid grid-rows-2 items-center gap-8 md:grid-cols-2 md:grid-rows-none mt-4">
                                                <div>
                                                <label className="font-mono font-light text-sm" style={{ fontFamily: "" }}>
                                                    {("State")}
                                                </label>
                                                <select
                                                    className="w-full rounded-full border border-neutral-900  text-gray-600 px-4 py-2 bg-white focus:outline-none  sm:text-sm">
                                                    <option value="">Select state</option>
                                                        <option value="AN">Andaman and Nicobar Islands</option>
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
                                                    <label className="text-sm font-mono font-light" style={{ fontFamily: "" }}>
                                                        {("pincode")}
                                                    </label>
                                                    <input
                                                       
                                                        type="text"
                                                        className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                        placeholder={("Pin Code")}
                                                        style={{ fontFamily: "" }}
                                                    />
                                                    </div>
                                                </div>                        
                                            </div>                                           

                                </div>
                                 
                                <Doc_upload/>
                                <div className='flex flex-col'>
                            <p className='text-xl mt-6 font-medium'> PERSONAL INFORMATION</p>
                            <hr className='border border-gray-500'/>
                            <p className='mt-3 text-sm italic font-mono'>Tell us about your appearance to Identify you correctly</p>
                            <textarea className="textarea textarea-bordered border-black" placeholder=""></textarea>
                        </div>
                            </div>
                        </div>
                        <input type="radio" name="my_tabs_2" role="tab" className="tab"  aria-label="Not-Victim" onClick={() => toggleTab(2)} checked={toggleState === 2} style={{fontWeight:(toggleState === 2)?'medium':'normal'}}/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300  p-6">
                        <p className='text-xl font-medium'> INCIDENT DESCRIPTION</p>
                            <hr className='border border-gray-500' />
                            <div className='mt-6 grid grid-cols'>
                                <div className='flex'><p className='mr-2 font-normal text-sm font-mono'>Type of Incident</p><span className='text-red-500 text-lg '>*</span></div>
                                <select className="select border-black mt-0">
                                    <option disabled selected>Accidents</option>
                                    <option>Harassment</option>
                                    <option>Mob Lynching & Crowd Fights</option>
                                    <option>Others</option>
                                </select>
                                <div className='flex'><p className='mt-3 mr-2 font-normal text-sm font-mono' >Description of the Incident</p><span className='text-red-500 text-lg mt-3'>*</span></div>
                                <textarea className="textarea textarea-bordered border-black mt-0" placeholder=""></textarea>

                                <div className='flex mt-6 font-light font-mono text-sm'><p className='mr-2'>Does the Incident Live or Not ?</p><span className='text-red-500 text-lg'>*</span></div>
                                <div role="tablist" className="tabs tabs-bordered tabs-sm p-1 grid grid-cols-4">
                                <input type="radio" name="my_tabs_1" role="tab" className="tab font-light font-mono text-sm" aria-label="LIVE" onClick={() => toggle2(3)} checked={toggleState2 === 3 && toggleState === 2} />
                                        <div role="tabpanel" className="tab-content p-2"> 
                                        <div className="grid grid-rows-2 items-center mt-2  gap-8 md:grid-cols-2 md:grid-rows-none">
                                                    <div>
                                                        <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                            {("Location of Incident")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full font-light font-mono text-sm rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                            placeholder=""
                                                            style={{ fontFamily: "" }}
                                                        />
                                                    </div>  
                                                </div>
                                        </div>
                                        <input type="radio" name="my_tabs_1" role="tab" className="tab text-sm font-mono font-light" aria-label="NOT LIVE" onClick={() => toggle2(4)} checked={toggleState2 === 4 && toggleState === 2} />
                                            <div role="tabpanel" className="tab-content p-4 text-sm font-mono font-light mt-2 text-gray-600">
                                            <div className="grid grid-rows-2 items-center gap-8  md:grid-cols-2 md:grid-rows-none">
                                                            <div>
                                                                <label className="font-light font-mono text-sm" style={{ fontFamily: "" }}>
                                                                {("Date of Incident")}
                                                                </label>
                                                        <div className="relative text-gray-400 focus-within:text-gray-600">
                                                                <input
                                                                    type="date"
                                                                    className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                    placeholder="25/02/2020"
                                                                    style={{ fontFamily: "" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                            {("Time of Incident")}
                                                            </label>
                                                        <div className="relative text-gray-400 focus-within:text-gray-600">
                                                            <input
                                                                type="time"
                                                                className="w-full rounded-full border border-neutral-900  py-2 px-4 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                placeholder=""
                                                                style={{ fontFamily: "" }}
                                                            />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-rows-2 items-center   mt-4 gap-8 md:grid-cols-2 md:grid-rows-none">
                                                        <div>
                                                            <label className="font-light font-mono text-sm mt-2" style={{ fontFamily: "" }}>
                                                                {("Location of Incident")}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                placeholder=""
                                                                style={{ fontFamily: "" }}
                                                            />
                                                        </div> 

                                                    <div>
                                                    <label className="font-mono font-light text-sm" style={{ fontFamily: "" }}>
                                                        {("city")}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                        placeholder="city"
                                                        style={{ fontFamily: "" }}
                                                    />
                                                </div>   
                                                </div>

                                                <div className="grid grid-rows-2 items-center gap-8 md:grid-cols-2 md:grid-rows-none mt-4">
                                                <div>
                                                <label className="font-mono font-light text-sm" style={{ fontFamily: "" }}>
                                                    {("State")}
                                                </label>
                                                <select
                                                    className="w-full rounded-full border border-neutral-900  text-gray-600 px-4 py-2 bg-white focus:outline-none  sm:text-sm">
                                                    <option value="">Select state</option>
                                                        <option value="AN">Andaman and Nicobar Islands</option>
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
                                                    <label className="text-sm font-mono font-light" style={{ fontFamily: "" }}>
                                                        {("pincode")}
                                                    </label>
                                                    <input
                                                       
                                                        type="text"
                                                        className="w-full rounded-full border border-neutral-900  px-4 py-2 text-gray-600 focus:border-gray-900 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                        placeholder={("Pin Code")}
                                                        style={{ fontFamily: "" }}
                                                    />
                                                    </div>
                                                </div>
                                                                                         
                                        </div>                                           

                                    </div>
                                <Doc_upload/>
                                <div className='flex flex-col'>
                            <p className='text-xl mt-6 font-medium'> PERSONAL INFORMATION</p>
                            <hr className='border border-gray-500'/>
                            <p className='mt-3 text-sm italic font-mono'>Tell us about victim's appearance to Identify victim correctly</p>
                            <textarea className="textarea textarea-bordered border-black" placeholder=""></textarea>
                        </div>                     
                        </div> 
                        </div>
                    </div>
                    

                    <div className='mt-6 flex justify-between grid-cols-2'>
                        <button className="btn  btn-error btn-xs sm:btn-sm md:btn-md w-1/3 rounded-xl ">Cancel</button>
                        <button className="btn btn-success btn-xs  sm:btn-sm md:btn-md w-1/3 rounded-xl">Review & Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Page;
