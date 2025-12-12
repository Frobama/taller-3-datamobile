'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface LineChartProps {
  data: { name: string; value: number }[]
}

export default function ProductLineChart({ data }: LineChartProps) {
  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Top 8 Fabricantes</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
