import axios from 'axios';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    console.log(3)
    try {
        console.log("h1")
        if(!req.url){
            return Response.json("Mobile number is missing in the request body", { status: 400 });
        }
        const mobileNumber = searchParams.get('data');
        if (!mobileNumber) {
            return Response.json("Mobile number is missing in the request body", { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);
        // const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
        //     params: {
        //         authorization: process.env.FAST2SMS_API_KEY,
        //         route: 'otp',
        //         variables_values: otp,
        //         numbers: mobileNumber,
        //         flash: "1"
        //     }
        // });
        // console.log(response.data);
        return Response.json({ otp });
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        return Response.error("Failed to send OTP.");
    }
};
