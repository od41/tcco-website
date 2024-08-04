import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission here (e.g., send data to an API)
  };

  return (
    <div className="lg:p-6 pt-0 w-full lg:ml-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label htmlFor="name" className="block mb-1 text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name")}
            className="w-full px-3 py-2 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email")}
            className="w-full px-3 py-2 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-1 font-medium text-white"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            placeholder="Enter your message"
            rows={4}
            className="w-full px-3 py-2 border border-[#F8F9F5] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button size="lg" type="submit">
          Send Message <ArrowRightIcon className="ml-3" />
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
