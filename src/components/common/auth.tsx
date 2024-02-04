"use client"

import { useState } from "react";

import {  Dialog, DialogContent } from "@/components/ui/dialog";

import { Register } from "./register";
import { Login } from "./login";

export function Auth() {
  const [step, setStep] = useState<"login" | "register">("login")

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        {step === "login" && <Login setStep={setStep} />}
        {step === "register" && <Register setStep={setStep} />}
      </DialogContent>
    </Dialog >
  )
}