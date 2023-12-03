import { Box, Typography } from '@mui/material';

interface NumberCardProps {
  title: string;
  value: number;
}

export const NumberCard = ({ title, value }: NumberCardProps) => {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.secondary.dark,
        padding: '15px 10px',
        textAlign: 'center',
        borderRadius: '10px',
        minWidth: '300px',
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h3">{value}</Typography>
    </Box>
  );
};
