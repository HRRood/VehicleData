"use client";

import { TextInput } from "@/components/form/textInput/TextInput";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

export const Form = () => {
  const router = useRouter();
  const { handleSubmit, setError, resetField, setFocus } = useFormContext();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result?.ok) {
      setError("email", {
        message: "Wrong credentials",
      });
      resetField("password");
      setFocus("password");
      return;
    }

    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput label="Email" id="email" name="email" />
      <TextInput type="password" label="Password" id="password" name="password" />
      <Button variant="outlined" type="submit">
        Login
      </Button>
    </form>
  );
};
