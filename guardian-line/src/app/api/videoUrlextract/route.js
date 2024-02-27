// import clientPromise from "@/app/lib/mongodb";

// export async function GET(req, res) {
//   const { searchParams } = new URL(req.url);
//   const reportid = searchParams.get("reportid");

//   try {
//     const client = await clientPromise;
//     const db = client.db("GuardianLine");
//     const collection = db.collection("ReportsData");
//     const presentReportOfUser = await collection.findOne({ reportid: reportid });
    
//     // if (presentReportOfUser) {
//         const uploadedDocPath = presentReportOfUser.uploadedDocPath;
//         // Now you can use the uploadedDocPath
//         console.log("Uploaded Doc Path:", uploadedDocPath);
        
//         // Send response with the uploadedDocPath
//         // res.writeHead(200, { "Content-Type": "application/json" });
//         return Response(JSON.stringify({ uploadedDocPath }));
//     //   } else {
//     //     // Report not found
//     //     res.writeHead(404, { "Content-Type": "application/json" });
//     //     res.end(JSON.stringify({ message: "Report not found" }));
//     //   }
    
//   } catch (error) {
//     console.error("Error:", error);
//     return Response.error("Error fetching url");
//   }
// }


// const crypto = require("crypto");
// const fs = require("fs");

// // Function to calculate the MD5 hash of a file
// function calculateMD5(filePath) {
//   return new Promise((resolve, reject) => {
//     const hash = crypto.createHash("md5");
//     const input = fs.createReadStream(filePath);

//     input.on("error", reject);

//     input.on("data", (chunk) => {
//       hash.update(chunk);
//     });

//     input.on("end", () => {
//       resolve(hash.digest("hex"));
//     });
//   });
// }

// // Function to compare MD5 hashes of two files
// async function compareVideos(videoPath1, videoPath2) {
//   const hash1 = await calculateMD5(videoPath1);
//   const hash2 = await calculateMD5(videoPath2);

//   return hash1 === hash2;
// }

// // Example usage
// const videoPath1 = "video1.mp4";
// const videoPath2 = "video3.mp4";

// compareVideos(videoPath1, videoPath2)
//   .then((isSame) => {
//     if (isSame) {
//       console.log("The videos are exactly the same.");
//     } else {
//       console.log("The videos are not the same.");
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

import clientPromise from "@/app/lib/mongodb";
// import {SessionProvider, useSession } from 'next-auth/react';

const crypto = require("crypto");
const fs = require("fs");

// const userName = session.user.name;

//       const currentDate = new Date();

//       const year = currentDate.getFullYear();
//       const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
//       const day = currentDate.getDate().toString().padStart(2, '0');
//       const hours = currentDate.getHours().toString().padStart(2, '0');

//       const timestamp = `${year}${month}${day}${hours}`;

//       // const reportid = userName + timestamp.toString();
//       const reportid = `${userName}_${timestamp}`;

// Function to calculate the MD5 hash of a file
function calculateMD5(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const input = fs.createReadStream(filePath);

    input.on("error", reject);

    input.on("data", (chunk) => {
      hash.update(chunk);
    });

    input.on("end", () => {
      resolve(hash.digest("hex"));
    });
  });
}

async function compareVideos(videoPath1, videoPath2) {
  const hash1 = await calculateMD5(videoPath1);
  const hash2 = await calculateMD5(videoPath2);

  return hash1 === hash2;
}

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const reportid = searchParams.get("reportid");

  try {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    const presentReportOfUser = await collection.findOne({ reportid: reportid });
    
    if (presentReportOfUser) {
      const uploadedDocPath = presentReportOfUser.uploadedDocPath;
      
      // Now you can use the uploadedDocPath
      console.log("Uploaded Doc Path:", uploadedDocPath);
      
      // Example usage
      const videoPath1 = "video1.mp4";
      const videoPath2 = uploadedDocPath; // Assuming uploadedDocPath is the path to the second video

      // Comparing the videos
      const isSame = await compareVideos(videoPath1, videoPath2);
      
      // Send response based on comparison result
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ isSame }));
    } else {
      // Report not found
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Report not found" }));
    }
    
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
}

