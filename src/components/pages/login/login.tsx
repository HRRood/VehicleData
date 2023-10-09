"use client";

import { TextInput } from "@/components/form/textInput/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

const UserDataValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(UserDataValidation),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput type="email" label="Email" id="email" name="email" />
          <TextInput type="password" label="Password" id="password" name="password" />
          <Button type="submit">Login</Button>
        </form>
      </FormProvider>
    </div>
  );
};
