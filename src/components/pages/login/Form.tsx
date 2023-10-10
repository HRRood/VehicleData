import { TextInput } from "@/components/form/textInput/TextInput";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useFormContext } from "react-hook-form";

export const Form = () => {
  const { handleSubmit } = useFormContext();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput label="Email" id="email" name="email" />
      <TextInput type="password" label="Password" id="password" name="password" />
      <Button variant="outlined" type="submit">
        Login
      </Button>
    </form>
  );
};
