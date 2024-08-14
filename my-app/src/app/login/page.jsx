"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";

import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import Loading from "@/app/loading";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const session = useSession();

  const { status } = session;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Required field"),
      password: Yup.string()
        .min(8, "Phone number must be at least 8 characters")
        .required("Required field"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid email or password");
        if (res?.url) router.replace("/");
      } else {
        router.push("/");
      }
    },
  });

  return (
    <section className="mt-14 max-w-md mx-auto">
      <h1 className="text-center text-primary text-4xl my-2">Login</h1>
      {status === "loading" && <Loading />}

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between w-full md:flex-nowrap  mt-8 mx-2">
          <div className="flex flex-col gap-5">
            {/* mail */}
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              radius={"full"}
              size={"lg"}
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}

            {/* password */}
            <Input
              label="Password"
              placeholder="Enter your password"
              radius={"full"}
              size={"lg"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={formik.isSubmitting}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <Button
            color="danger"
            size={"lg"}
            variant="shadow"
            type="submit"
            className="my-10 disabled:bg-gray-500"
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>

      <div className="my-4 text-center text-gray-500">
        or login with provider
      </div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex gap-4 justify-center border p-3 rounded-xl mx-auto hover:bg-green-300 duration-150 ease-in-out"
      >
        <Image src={"/google.png"} alt={"google icon"} width={24} height={24} />
        Login with google
      </button>
      <p className="text-center mt-6 text-lg font-poppins font-bold">
        Need an account ?{" "}
        <Link
          href={"/register"}
          className="underline text-warning hover:text-green-800 cursor-pointer"
        >
          Sign up &raquo;
        </Link>
      </p>
    </section>
  );
}
