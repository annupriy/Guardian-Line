import { SendSupportMail } from "@/app/lib/sendSupportMail";

export async function POST(req) {
  try {
    const data = await req.json();
    await SendSupportMail(data);
    return new Response("Support request sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending support request:", error);
    return new Response("Error sending support request", { status: 500 });
  }
}
