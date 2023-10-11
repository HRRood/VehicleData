import { Button, Link } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export const Login = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <></>;
  }

  if (status === "authenticated") {
    return (
      <Button
        variant="text"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/" });
        }}
      >
        Logout
      </Button>
    );
  }

  return <Link href="/login">Login</Link>;
};
