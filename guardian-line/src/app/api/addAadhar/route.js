const JWT = process.env.JWT;

export const dynamic = 'force-dynamic'


const generateString = async () => {

    const num = new Date().getTime();
    return "User" + num;
};


export async function POST(req) {
    const user = await generateString();
    console.log(user)

    const { hashedAadharNumber: hashedAadharNumber } = await req.json();

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

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`,
                'Content-Type': 'application/json'
            },
            body: `{"pinataMetadata":{"name":"GuardianLine"},"pinataContent":{"aadhar":"${hashedAadharNumber}"},"pinataOptions":{"cidVersion":1}}`
        };

        const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options).then(res => res.json())
        // const formData = new FormData();
        // const tempFilePath = path.join(__dirname, 'tempFile.txt');
        // fs.writeFileSync(tempFilePath, hashedAadharNumber);
        // console.log("File created successfully")

        // const fileStream = fs.createReadStream(tempFilePath);
        // formData.append("file", fileStream);

        // const pinataMetadata = JSON.stringify({
        //   name: "File name",
        // });
        // formData.append("pinataMetadata", pinataMetadata);
        // console.log("File appended successfully")
        // const pinataOptions = JSON.stringify({
        //   cidVersion: 1,
        // });
        // formData.append("pinataOptions", pinataOptions);
        // console.log("File options appended successfully")
        // const res = await axios.post(
        //     "https://api.pinata.cloud/pinning/pinFileToIPFS",
        //     formData,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${JWT}`,
        //         },
        //     }
        // );
        if (res && res.isDuplicate) {
            console.log("Aadhar number already exists");
            return new Response("Aadhar number already exists", { status: 401 });

        }
        console.log("Aadhar number added successfully");
        return new Response('Aadhar number added successfully', { status: 200 });


    } catch (error) {
        console.error('Error parsing request body:', error);
        return new Response("Error parsing request body", { status: 500 })
    }
}
