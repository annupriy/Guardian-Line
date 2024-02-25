const JWT = process.env.JWT;
import axios from "axios";
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';


    const generateString = async () => {

      const num= new Date().getTime();
        return "User" + num;
    };

    
export async function POST(req) {
    const user= await generateString();
    console.log(user)

    const {hashedAadharNumber : hashedAadharNumber} = await req.json();

    try {
        console.log(hashedAadharNumber)
        if (!hashedAadharNumber) {
            return new Response("Hashed Aadhar number is missing in the request body", { status: 400 });
        }

        //     const filebaseClient = new FilebaseClient({ token: apiToken})

        //     const content = new Blob([hashedAadharNumber])
        //     const cid = await filebaseClient.storeBlob(content)
        //     console.log(cid);
        //     await checkCIDExists(cid);
        //    const name= await generateString(cid)
        //    console.log(name)


        const formData = new FormData();
        const tempFilePath = path.join(__dirname, 'tempFile.txt');
        fs.writeFileSync(tempFilePath, hashedAadharNumber);
        console.log("File created successfully")
        
        const fileStream = fs.createReadStream(tempFilePath);
        formData.append("file", fileStream);

        const pinataMetadata = JSON.stringify({
          name: "File name",
        });
        formData.append("pinataMetadata", pinataMetadata);
        console.log("File appended successfully")
        const pinataOptions = JSON.stringify({
          cidVersion: 1,
        });
        formData.append("pinataOptions", pinataOptions);
        console.log("File options appended successfully")
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
            }
        );
        console.log(res.data);
        if(res.data && res.data.isDuplicate){
            console.log("Aadhar number already exists");
            return new Response("Aadhar number already exists", { status: 200 });
        }
        console.log("Aadhar number added successfully");
        
        
        return new Response("send successfully", { status: 200 });

    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response("Error parsing request body", { status: 500 })
    }
}
