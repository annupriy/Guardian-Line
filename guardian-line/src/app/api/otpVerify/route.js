import axios from 'axios';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const mobileNumber = searchParams.get('data');
        console.log(mobileNumber);
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);
        const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
            params: {
                authorization: process.env.FAST2SMS_API_KEY,
                route: 'otp',
                variables_values: otp,
                numbers: mobileNumber,
                flash: "1"
            }
        });
        console.log(response.data);
        return Response.json({ otp });
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        return Response.error("Failed to send OTP.");
    }
};
