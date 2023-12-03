import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeHOC } from '../frontend/wrappers/themeHOC';
import { Navbar } from '@/frontend/components/layout/navbar/navbar';
import { AuthWrapper } from '../frontend/wrappers/AuthWrapper';
import { JotaiWrapper } from '@/frontend/wrappers/JotaiWrapper';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HRR Data Dashboard',
  description: 'A place for a dashboard for anything',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiWrapper>
          <AuthWrapper>
            <ThemeHOC>
              <Navbar />
              <main>
                <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>{children}</Box>
              </main>
            </ThemeHOC>
          </AuthWrapper>
        </JotaiWrapper>
      </body>
    </html>
  );
}
