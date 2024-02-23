import { FilebaseClient } from "@filebase/client";
export async function POST(req) {
  const { hashedAadharNumber } = await req.json();
  const apiToken = process.env.API_TOKEN;
  try {
    console.log(hashedAadharNumber);
    if (!hashedAadharNumber) {
      return new Response(
        "Hashed Aadhar number is missing in the request body",
        { status: 400 }
      );
    }

    const content = new Blob([hashedAadharNumber]);
    return new Response("send successfully", { status: 200 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response("Error parsing request body", { status: 500 });
  }
}
