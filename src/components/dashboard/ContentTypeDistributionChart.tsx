import { Box, Stack, Typography } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type ContentTypeDistributionChartProps = {
  data: Array<{
    name: string;
    value: number;
  }>;
};

const fallbackColors = [
  '#90caf9',
  '#f48fb1',
  '#80cbc4',
  '#ffcc80',
  '#ce93d8',
  '#a5d6a7',
  '#ef9a9a',
  '#b0bec5',
];

export default function ContentTypeDistributionChart({
  data,
}: ContentTypeDistributionChartProps) {
  if (data.length === 0) {
    return (
      <Typography color='text.secondary'>
        No content type data available.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              outerRadius={90}
              innerRadius={45}
              stroke='none'
              //   paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={fallbackColors[index % fallbackColors.length]}
                />
              ))}
            </Pie>
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
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Stack spacing={1}>
        {data.map((item, index) => (
          <Stack
            key={item.name}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack direction='row' spacing={1} alignItems='center'>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: fallbackColors[index % fallbackColors.length],
                }}
              />
              <Typography variant='body2'>{item.name}</Typography>
            </Stack>

            <Typography variant='body2' color='text.secondary'>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
