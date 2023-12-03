import { Link } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

export const Login = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <></>;
  }

  if (status === 'authenticated') {
    return (
      <Link
        sx={{ textDecoration: 'none' }}
        href="#"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: '/' });
        }}
      >
        Logout
      </Link>
    );
  }

  return (
    <Link href="/login" sx={{ textDecoration: 'none' }}>
      Login
    </Link>
  );
};
