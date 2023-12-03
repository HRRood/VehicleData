import { Box, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import { DataPage } from './DataPage';

export default async function MyData() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    redirect('/login');
  }
  return (
    <Box>
      <Typography variant="h2">My Data</Typography>
      <DataPage />
    </Box>
  );
}
