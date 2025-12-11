'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: { name: string; value: number }[]
}

export default function ProductBarChart({ data }: BarChartProps) {
  console.log('BarChart data:', data)
  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Productos por Categoría</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}