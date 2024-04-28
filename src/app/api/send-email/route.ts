// pages/api/sendEmail.js

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/components/email/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, email, message } = await req.json();

  try {
    // Enviamos el correo electrónico usando la biblioteca Resend
    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "New Contact Form Submission",
      react: EmailTemplate({ firstName: name }), // Utilizamos la plantilla de correo electrónico con el nombre del remitente
      text: message,
    });

    console.log("data", data);

    return Response.json({
      status: 200,
      data,
    }); // Respondemos con los datos proporcionados por la API de Resend
  } catch (error) {
    return Response.json({ status: 500, error: error.message }); // Manejamos cualquier error y respondemos con un mensaje de error
  }
}
