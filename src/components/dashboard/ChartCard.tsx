import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ChartCard({
  title,
  subtitle,
  children,
}: ChartCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant='h6' fontWeight={700}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant='body2' color='text.secondary'>
                {subtitle}
              </Typography>
            ) : null}
          </Stack>

          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}
