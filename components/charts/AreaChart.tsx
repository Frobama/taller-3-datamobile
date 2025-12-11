'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AreaChartProps {
  data: { name: string; value: number }[]
}

export default function ProductAreaChart({ data }: AreaChartProps) {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Tendencia por Categoría</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
