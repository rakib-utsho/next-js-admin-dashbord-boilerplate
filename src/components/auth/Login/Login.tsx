/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MyFormCheckbox from "@/components/Common/form/MyFormCheckbox";
import MyFormInput from "@/components/Common/form/MyFormInput";
import MyFormWrapper from "@/components/Common/form/MyFormWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const AdminLogin = () => {
  const handleLogin = (data: any) => {
    console.log("Login form submitted:", data);
  };
  return (
    <div className="h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT SIDE IMAGE / BRAND PANEL */}
        <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/70 via-purple-600/60 to-blue-600/70 z-10"></div>
          <Image
            src="/images/login.jpg"
            alt="Admin Login"
            width={1400}
            height={1400}
            className="object-cover h-full w-full opacity-60"
          />

          {/* Text Overlay */}
          <div className="absolute z-20 text-white px-10 text-center">
            <h2 className="text-4xl font-semibold tracking-tight">
              Welcome Back🤠
            </h2>
            <p className="text-white/80 mt-3 text-lg">
              Sign in to access your Admin Dashboard
            </p>
          </div>
        </div>
        {/* RIGHT SIDE LOGIN FORM */}
        <div className="flex flex-col justify-center items-center p-6 md:p-12">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-6xl font-bold text-gray-900">Sign In</h1>
              <p
                className="text-gray-600 mt-2
			  "
              >
                Access Your Admin Dashboard
              </p>
            </div>
            {/* From */}
            <MyFormWrapper
              onSubmit={handleLogin}
              defaultValues={{
                email: "",
                password: "",
                remember: false,
              }}
              className="space-y-5"
            >
              <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl p-8 rounded-2xl space-y-3">
                {/* Email */}
                <MyFormInput
                  type="text"
                  name="email"
                  label="Email Address"
                  placeholder="admin@example.com"
                  required={true}
                  inputClassName="text-black !border-gray-300"
                />
                {/* Password */}
                <div className="flex flex-col">
                  <MyFormInput
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    required={true}
                    inputClassName="text-black !border-gray-300"
                  />
                  <a
                    className="text-right text-indigo-600 text-sm hover:underline"
                    href=""
                  >
                    Forget Password?
                  </a>
                </div>

                {/* REMEMBER + FORGOT */}
                <MyFormCheckbox
                  name="remember"
                  consentText="Remember Me"
                  checkboxClassName="border-gray-400"
                />
                {/* Button */}
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-indigo-500 hover:bg-indigo-700 transition-all text-white shadow-lg"
                >
                  Sign In
                </Button>
              </div>
            </MyFormWrapper>
            <p className="text-xs text-gray-500 text-center mt-6">
              Protected by Enterprice-grade Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
