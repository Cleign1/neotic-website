"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

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

export default function MessageForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // Integrate Zod validation
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      // Map form data to API schema
      const apiData = {
        name: data.fullname, // Map "fullname" to "name"
        email: data.email,
        phone: data.phone,
        messageTitle: data.messageTitle,
        message: data.message,
      };

      const req = await fetch("/api/messages", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData), // Send mapped data
      });

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }

      const res = await req.json();

      if (res.message === "Message successfully created.") {
        toast.success("Pesan berhasil dikirim");
        reset();
      } else {
        toast.error(res.message || "Pesan gagal dikirim");
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("Pesan gagal dikirim");
    }
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
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-3 px-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
