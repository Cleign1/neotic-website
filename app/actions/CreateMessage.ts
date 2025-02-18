'use server';

import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { revalidatePath } from "next/cache";

export async function createMessage( formdata: FormData): Promise<void> {
  try {
    const payload = await getPayload({ config: payloadConfig });

    const fullname = formdata.get("fullname");
    const email = formdata.get("email");
    const phone = formdata.get("phone");
    const messageTitle = formdata.get("messageTitle");
    const message = formdata.get("message");

    const result = await payload.create({
      collection: "messages",
      data: {
        name: fullname as string,
        email: email as string,
        phone: phone as string,
        messageTitle: messageTitle as string,
        message: message as string,
      },
    });
    revalidatePath("/");
    return;
  } catch (error) {
    console.error("Error creating message:", error);
    return;
  }
}
