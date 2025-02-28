"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

// Define the Zod schema
const formSchema = z.object({
  fullname: z
    .string()
    .nonempty("Nama lengkap wajib diisi")
    .min(3, "Nama lengkap minimal 3 karakter")
    .max(25, "Nama lengkap maksimal 25 karakter"),
  email: z.string().nonempty("Email wajib diisi").email("Email tidak valid"),
  phone: z.string().optional(),
  messageTitle: z
    .string()
    .nonempty("Judul pesan wajib diisi")
    .min(5, "Judul pesan minimal 5 karakter")
    .max(25, "Judul pesan maksimal 25 karakter"),
  message: z
    .string()
    .nonempty("Pesan wajib diisi")
    .min(10, "Pesan minimal 10 karakter")
    .max(500, "Pesan maksimal 500 karakter"),
});

// Infer the type from the Zod schema
type FormData = z.infer<typeof formSchema>;

export type FormState = {
  success: boolean;
  error: boolean;
  message: string;
};

// Define the server action
async function submitForm(formData: FormData, recaptchaToken: string | null): Promise<FormState> {
  try {
    if (!recaptchaToken) {
      return { 
        success: false, 
        error: true, 
        message: "reCAPTCHA verification required" 
      };
    }

    // Map form data to API schema
    const apiData = {
      name: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      messageTitle: formData.messageTitle,
      message: formData.message,
      recaptchaToken: recaptchaToken,
    };

    // Send to the new endpoint
    const req = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiData),
    });

    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`);
    }

    const res = await req.json();

    if (res.message === "Message successfully created.") {
      return { success: true, error: false, message: "Pesan berhasil dikirim" };
    } else {
      return { 
        success: false, 
        error: true, 
        message: res.message || "Pesan gagal dikirim" 
      };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: true, message: "Pesan gagal dikirim" };
  }
}

export default function MessageForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Use useTransition for async operations
  const [isPending, startTransition] = useTransition();
  
  // Form state
  // const [formState, setFormState] = useState<FormState>({
  //   success: false,
  //   error: false,
  //   message: "",
  // });

  // Reference to reCAPTCHA component
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  // Handle reCAPTCHA change
  const onReCAPTCHAChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setRecaptchaError(null);
    }
  };

  // Handle form submission
  const onSubmit = (data: FormData) => {
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setRecaptchaError("Mohon selesaikan verifikasi reCAPTCHA");
      return;
    }

    // Use startTransition for async operations
    startTransition(async () => {
      const result = await submitForm(data, recaptchaToken);
      // setFormState(result);
      
      if (result.success) {
        toast.success(result.message);
        reset();
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else if (result.error) {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="order-2 md:order-none">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Field */}
        <div>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            placeholder="Nama Lengkap"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            placeholder="Nomor Telepon"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Message Title Field */}
        <div>
          <input
            type="text"
            id="messageTitle"
            {...register("messageTitle")}
            placeholder="Judul Pesan"
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.messageTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.messageTitle.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Pesan"
            rows={4}
            className="w-full bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Google reCAPTCHA */}
        <div className="flex flex-col items-start">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={onReCAPTCHAChange}
          />
          {recaptchaError && (
            <p className="text-red-500 text-sm mt-1">{recaptchaError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-3 px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:bg-gray-400"
          disabled={isPending}
        >
          {isPending ? "Mengirim..." : "Kirim"}
        </button>
      </form>
    </div>
  );
}