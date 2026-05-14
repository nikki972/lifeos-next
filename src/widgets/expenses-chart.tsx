"use client";

import {
  Cell,
  Pie,
  PieChart,
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
    <div className="h-[300px] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
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
