'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { label } from 'aws-sdk/clients/sns';

type Report = {
    typeOfIncident: string;
    descriptionOfIncident: string;
    incidentLocation: [latitude: string, longitude: string, address: string];
    incidentDate: string;
    incidentTime: string;
    incidentStatus: string;
    reportedBy: string;
    reportedByPhone: string;
    reportedByEmail: string;
    reportedByAddress: string;
    reportedByCity: string;
    reportedByState: string;
    reportedByZip: string;
};

const FullReportPage = () => {
    const router = useRouter();
    const [input, setInput] = useState<Report>({
        typeOfIncident: "",
        descriptionOfIncident: "",
        incidentLocation: ["", "", ""],
        incidentDate: "",
        incidentTime: "",
        incidentStatus: "",
        reportedBy: "",
        reportedByPhone: "",
        reportedByEmail: "",
        reportedByAddress: "",
        reportedByCity: "",
        reportedByState: "",
        reportedByZip: "",
    });

    const searchParams = useSearchParams()
    const reportid = searchParams.get('reportid')
    // console.log(reportid);

    useEffect(() => {
        const response = async () => {
            try {
                const response = await fetch(`/api/detailed_report?reportid=${reportid}`);
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    if (data.report) setInput(data.report);
                }
                //   console.log(data);

            } catch (error: any) {
                console.log(error.message);
            };
        }; response();
    }, []);




    return (
        <div>

            <h1>Full Report</h1>


            <p>Report ID: {reportid}</p>
            <p>Report Type: {input.typeOfIncident}</p>
            <p>Report Description: {input.descriptionOfIncident} </p>
            <p>Report address: {input.incidentLocation[2]} </p>
            <p>Report Date: </p>
            <p>Report Time: </p>
            <p>Report Status: </p>
            <p>Reported By: </p>
            <p>Reported By Phone: </p>
            <p>Reported By Email: </p>
            <p>Reported By Address: </p>
            <p>Reported By City: </p>
            <p>Reported By State: </p>
            <p>Reported By Zip: </p>


        </div>
    )
}

export default FullReportPage;
