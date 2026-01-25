"use client";
import LoginForm from "@/components/Auth/Login/LoginForm";
import RedirectIfAuthenticated from "@/components/Auth/RedirectIfAuthenticated";
import React from "react";

const LoginOne = () => {
  return (
    <div className="w-full flex items-center justify-center py-20 bg-base-100 min-h-screen">
      <RedirectIfAuthenticated />
      <LoginForm />
    </div>
  );
};

export default LoginOne;
