// En el archivo pages/api/sendEmail.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import EmailTemplate from '../../components/email/EmailTemplate';
import dotenv from 'dotenv';
dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name, email, message } = req.body;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Company <noreply@yourcompany.com>',
      to: [email],
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      react: EmailTemplate({ firstName: name }),
    });

    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export default handler;
