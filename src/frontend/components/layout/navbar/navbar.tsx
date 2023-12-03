'use client';

import Image from 'next/image';
import { Login } from './login';
import { Box, List, ListItem, Link } from '@mui/material';
import { useSession } from 'next-auth/react';

export const Navbar = () => {
  const { status } = useSession();
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        height: '100px',
      }}
    >
      <Box
        sx={{
          marginRight: '20px',
          height: '100%',
          width: '100px',
          position: 'relative',
          objectFit: 'contain',
          padding: '10px 20px',
        }}
      >
        <Link href="/">
          <Image src="/logo.png" fill alt="Logo" />
        </Link>
      </Box>
      <List sx={{ display: 'flex', listStyle: 'none', marginLeft: 'auto', fontSize: '18px', fontWeight: 'bold' }}>
        {status === 'authenticated' && (
          <ListItem sx={{ width: 'fit-content' }}>
            <Link href="/my-data" sx={{ textDecoration: 'none' }}>
              My data
            </Link>
          </ListItem>
        )}
        <ListItem sx={{ width: 'fit-content' }}>
          <Login />
        </ListItem>
      </List>
    </Box>
  );
};
