import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  light: ['#6366f1', '#e0e7ff'],
  dark: ['#818cf8', '#1f2937'],
  blue: ['#2563eb', '#bfdbfe'],
  green: ['#16a34a', '#bbf7d0'],
};

export const ProgressPie = ({ completed, total, theme }: { 
  completed: number; 
  total: number;
  theme: 'light' | 'dark' | 'blue' | 'green';
}) => {
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Remaining', value: total - completed },
  ];

  return (
    <div className="w-32 h-32">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[theme][index]} 
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-2 text-sm">
        {completed}/{total}
      </div>
    </div>
  );
};