import clientPromise from "@/app/lib/mongodb";

import axios from "axios";
import crypto from "crypto";

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

export default async function initiateVideoUrlExtract(
  reportid,
  uploadedDocPath
) {
  try {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    if (!uploadedDocPath) {
      console.log("No videos uploaded");
      return;
    }

    // Array to store promises of comparisons
    const comparisonPromises = uploadedDocPath.map(async (element) => {
      const videoPath1 =
        "https://guardianline.s3.eu-north-1.amazonaws.com/guardianline/IMG_0969_1709018509952.mp4";
      const videoPath2 = element.path; // Assuming uploadedDocPath is the path to the second video
      const result = await compareVideos(videoPath1, videoPath2);
      if (result) {
        console.log(result);
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
    await collection.updateOne(
      { reportid: reportid },
      {
        $set: {
          isSame: isSame,
        },
      }
    );
    console.log("Video comparison completed");
  } catch (error) {
    console.error("Error:", error);
  }
}
