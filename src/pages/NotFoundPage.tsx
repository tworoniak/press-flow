import { Stack, Typography } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Stack spacing={2}>
      <Typography variant='h4' fontWeight={800}>
        Page not found
      </Typography>
      <Typography color='text.secondary'>
        The page you requested does not exist.
      </Typography>
    </Stack>
  );
}
