import { NextResponse } from "next/server";
import { getPayload } from "payload";
import type { NextRequest } from "next/server";
import configPromise from "@payload-config";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json();
    const { name, email, phone, messageTitle, message, recaptchaToken } = data;

    // Verify reCAPTCHA token first
    const recaptchaVerification = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaVerification.success) {
      return NextResponse.json({ 
        message: "reCAPTCHA verification failed" 
      }, { status: 400 });
    }

    // Initialize Payload
    const payload = await getPayload({ config: configPromise });

    // Create the message using Payload's local API
    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        phone: phone || "",
        messageTitle,
        message
      }
    });

    return NextResponse.json({ 
      message: "Message successfully created." 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { message: "Failed to create message" },
      { status: 500 }
    );
  }
}

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error("reCAPTCHA secret key not configured");
    return { success: false };
  }
  
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { success: false };
  }
}