import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail(to, subject, body) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: body,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Email not sent", error);
    throw error;
  }
}

export const SendSupportMail = async (data) => {
  await sendMail(
    process.env.SUPPORT_EMAIL,
    `Support Request`,
    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
       <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
    </head>
    <body>
    ${data.userName} has requested support.
    <br />
    <b>
    Message:</b>
    <br />
    ${data.message} 
    <br />
    <b>Point of Contact:</b> ${data.pointOfContact} <br />
    </body>
    </html>`,
    []
  ).catch((err) => {
    throw err;
  });
};
