"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Form } from "./Form";
import { Box, Container } from "@mui/material";

const UserDataValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const Login = () => {
  const form = useForm({
    resolver: zodResolver(UserDataValidation),
  });

  return (
    <Container
      sx={{
        margin: "20px auto",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <h1>Login</h1>
        <FormProvider {...form}>
          <Form />
        </FormProvider>
      </Box>
    </Container>
  );
};
