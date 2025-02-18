'use server';

import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

// Define the schema for the form data
const messageSchema = z.object({
  fullname: z.string().min(5, { message: "Nama Lengkap is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Nomor Telepon is required" }),
  messageTitle: z.string().min(5, { message: "Judul Pesan is required" }),
  message: z.string().min(10, { message: "Pesan is required" }),
});

export async function createMessage(formdata: FormData): Promise<void> {
  try {
    const payload = await getPayload({ config: payloadConfig });

    // Extract form data
    const formDataObject = Object.fromEntries(formdata.entries());

    // Validate the form data
    const result = messageSchema.safeParse(formDataObject);

    if (!result.success) {
      // Handle validation errors and show toast notifications
      result.error.errors.forEach((error) => {
        window.alert(error.message);
      });
      return;
    }

    // If validation passes, proceed to create the message
    const { fullname, email, phone, messageTitle, message } = result.data;

    await payload.create({
      collection: "messages",
      data: {
        name: fullname,
        email: email,
        phone: phone,
        messageTitle: messageTitle,
        message: message,
      },
    });

    // Show success toast notification
    window.alert("Message successfully sent!");
    // toast.success("Message successfully sent!");

    revalidatePath("/");
    return;
  } catch (error) {
    // Show error toast notification
    window.alert("Error creating message. Please try again.");
    // toast.error("Error creating message. Please try again.");
    return;
  }
}
