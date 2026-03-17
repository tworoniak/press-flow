import { Box, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type StatusBreakdownChartProps = {
  data: Array<{
    name: string;
    value: number;
  }>;
};

export default function StatusBreakdownChart({
  data,
}: StatusBreakdownChartProps) {
  if (data.length === 0) {
    return (
      <Typography color='text.secondary'>
        No workflow data available.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 280 }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray='3 3' />
          <XAxis dataKey='name' tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
            itemStyle={{
              color: '#e2e8f0',
              fontSize: '13px',
            }}
            labelStyle={{
              color: '#94a3b8',
              fontSize: '12px',
              marginBottom: '4px',
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar
            dataKey='value'
            fill='#4f8cff'
            barSize='60'
            //   radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
