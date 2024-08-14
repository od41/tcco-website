import { Resend } from "resend";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { sender, name, message } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY!);

    try {
      await resend.emails.send({
        to: process.env.CONTACT_EMAIL_ADDRESS!, // TODO change to tcco or iimogie@doyen.partners eventually
        from: "onboarding@resend.dev",
        reply_to: sender,
        subject: `New Message from ${name} `,
        html: `<p>You have a new message!</p>
              <p>Sender: ${name} | ${sender}</p>
              <p>Message: ${message}</p>
            `,
      });

      // Validate and process data

      res.status(200).json({ message: "Data received successfully" });
    } catch (error) {
      res.status(500).end("We couldn't send the email");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method Not Allowed`);
  }
}

type Data = {
  message: string;
};
