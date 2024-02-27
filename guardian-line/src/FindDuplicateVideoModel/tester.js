// import { getServerAuthSession } from "@/server/auth"
// const { getServerAuthSession } = require("@/server/auth");
import spawner from "child_process"
import axios from "axios";
// const spawner = require('child_process').spawn;
// const axios = require('axios');

// const userName = Parse.user.current();
// const userName = session.user.name;

//  const authSession = getServerAuthSession();
// if (authSession) {
// const username = authSession.user.name
// }
export async function checkVideo(userName,videoUrl){
  console.log("username: ",userName)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  
  const timestamp = `${year}${month}${day}${hours}`;
  
  // const reportid = userName + timestamp.toString();
  const reportid = `${userName}_${timestamp}`;
  
  
  
  const data_to_pass_in = "https://user-images.githubusercontent.com/64683866/168872267-7c6682f8-7294-4d9a-8a68-8c6f44c06df6.mp4"
  console.log("Data sent to python Script:", data_to_pass_in);
  
  const python_process = spawner('python', ['./pythonapp.py', data_to_pass_in]);
  
  python_process.stdout.on('data', (data) => {
    console.log('Data Received from python script', data.toString());
  });
}

// axios.get(`http://localhost:3000/api/videoUrlExtract?reportid=${reportid}`)
//   .then(response => {
//     const uploadedDocPath = response.data.uploadedDocPath;
//     console.log("Uploaded Doc Path:", uploadedDocPath);
//     // Use the uploadedDocPath as needed
//   })
//   .catch(error => {
//     console.error("Error fetching report:", error);
//   });

// we want to fetch uplaoded document from collection reportsData as soon as the submit button is clicked