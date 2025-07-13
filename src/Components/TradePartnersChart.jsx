import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
        <p className="text-white">{`Country: ${label}`}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-gray-300">
            {`${entry.name}: $${(entry.value / 1000).toFixed(1)}B`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TradePartnersChart = ({ tradeData }) => (
  <div className="lg:col-span-2">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Top Trading Partners</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tradeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="country" stroke="#9CA3AF" />
          <YAxis
            stroke="#9CA3AF"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}B`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="exports" fill="#3B82F6" name="Exports ($B)" />
          <Bar dataKey="imports" fill="#10B981" name="Imports ($B)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TradePartnersChart;
