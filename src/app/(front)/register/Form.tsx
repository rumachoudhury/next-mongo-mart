"use client";

// import { shippingAddress } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type input = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  Url?: string;
};

export default function Form() {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<input>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [session, router, callbackUrl, params]);

  //   const formSubmit: SubmitHandler<Input> = async (form) => {
  interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    Url?: string;
  }

  interface RegisterResponse {
    message?: string;
  }

  const formSubmit: import("react-hook-form").SubmitHandler<
    RegisterFormData
  > = async (form: RegisterFormData) => {
    const { name, email, password } = form;

    try {
      const response: Response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        return router.push(
          `/signin?callbackUrl= ${callbackUrl}&success=Acount created successfully`
        );
      } else {
        const data: RegisterResponse = await response.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error: string =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;
      toast.error(error || "error");
    }
  };
  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Register</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-sm"
            />
          </div>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="emaile"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />

            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>

          <div className="my-2">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is requird" })}
              className="input input-border w-full max-w-sm"
            />

            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>

          <div className="my-2">
            <label className="label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  const password = getValues("password");
                  return password === value || "Passwords do not match";
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Register
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div>
          Already have an account?{" "}
          <Link
            className="link"
            href={`/signin?callbackUrl=${callbackUrl}&success=Acount created successfilly`}
          >
            Longin
          </Link>
        </div>
      </div>
    </div>
  );
}
