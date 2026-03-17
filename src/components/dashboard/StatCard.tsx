import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  value: number;
  icon?: ReactNode;
};

export default function StatCard({ label, value, icon }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent='space-between'>
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.secondary'>
              {label}
            </Typography>

            <Typography variant='h4' fontWeight={700}>
              {value}
            </Typography>
          </Stack>

          {icon}
        </Stack>
      </CardContent>
    </Card>
  );
}
