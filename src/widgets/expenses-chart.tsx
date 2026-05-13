"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Квартира",
    value: 120000,
  },
  {
    name: "Машина",
    value: 60000,
  },
  {
    name: "Одежда",
    value: 25000,
  },
];

export function ExpensesChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            <Cell fill="#3b82f6" />
            <Cell fill="#ef4444" />
            <Cell fill="#eab308" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}