import clientPromise from "@/app/lib/mongodb";
// import {SessionProvider, useSession } from 'next-auth/react';

import axios from "axios";
import crypto from "crypto";

// const userName = session.user.name;

//       const currentDate = new Date();

//       const year = currentDate.getFullYear();
//       const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
//       const day = currentDate.getDate().toString().padStart(2, '0');
//       const hours = currentDate.getHours().toString().padStart(2, '0');

//       const timestamp = `${year}${month}${day}${hours}`;

//       // const reportid = userName + timestamp.toString();
//       const reportid = `${userName}_${timestamp}`;
// Function to calculate the MD5 hash of a buffer
function calculateMD5(buffer) {
  const hash = crypto.createHash("md5");
  hash.update(buffer);
  return hash.digest("hex");
}

// Function to download a video from a URL
async function downloadVideo(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return response.data;
}

// Function to compare two videos from their URLs
async function compareVideos(videoUrl1, videoUrl2) {
  try {
    // Download the first video
    const videoData1 = await downloadVideo(videoUrl1);

    // Download the second video
    const videoData2 = await downloadVideo(videoUrl2);

    // Calculate MD5 hashes of the videos
    const hash1 = calculateMD5(videoData1);
    const hash2 = calculateMD5(videoData2);

    // Compare the hashes
    return hash1 === hash2;
  } catch (error) {
    console.error("Error:", error);
    return false; // Return false in case of any errors
  }
}

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const reportid = searchParams.get("reportid");

  try {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    const presentReportOfUser = await collection.findOne({
      reportid: reportid,
    });

    if (presentReportOfUser) {
      const uploadedDocPath = presentReportOfUser.uploadedDocPath;

      // Now you can use the uploadedDocPath
      console.log("Uploaded Doc Path:", uploadedDocPath);

      // Array to store promises of comparisons
      const comparisonPromises = uploadedDocPath.map(async (element) => {
        const videoPath1 =
          "https://guardianline.s3.eu-north-1.amazonaws.com/guardianline/IMG_0969_1709018509952.mp4";
        const videoPath2 = element.path; // Assuming uploadedDocPath is the path to the second video
        const result = await compareVideos(videoPath1, videoPath2);
        if (result) {
          console.log(result)
          console.log("Videos are the same");
          return true;
        } else {
          console.log("Videos are not the same");
          return false;
        }
      });

      // Wait for all comparisons to finish
      const results = await Promise.all(comparisonPromises);

      // Check if any of the comparisons resulted in true
      const isSame = results.some((result) => result);

      // Send response based on comparison result
      return Response.json({ isSame });
    } else {
      // Report not found
      return Response.json({ message: "Report not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.error({ message: "Internal Server Error" });
  }
}
