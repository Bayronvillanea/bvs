// pages/api/sendEmail.js

import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import EmailTemplate  from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      // Enviamos el correo electrónico usando la biblioteca Resend
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'New Contact Form Submission',
        react: EmailTemplate({ firstName: name }), // Utilizamos la plantilla de correo electrónico con el nombre del remitente
        text: message,
      });

      res.status(200).json(data); // Respondemos con los datos proporcionados por la API de Resend
    } catch (error) {
      res.status(500).json({ error: error.message }); // Manejamos cualquier error y respondemos con un mensaje de error
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Respondemos con un error si el método HTTP no es POST
  }
}
