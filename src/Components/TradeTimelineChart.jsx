import React from 'react';
import {
  LineChart,
  Line,
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
        <p className="text-white">{`Month: ${label}`}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-gray-300">
            {`${entry.name}: ${
              entry.name === 'Trade Volume ($B)'
                ? `$${(entry.value / 1000).toFixed(1)}B`
                : entry.value
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TradeTimelineChart = ({ timeSeriesData }) => (
  <div className="lg:col-span-3">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4">Trade Flow & Risk Timeline</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis
            yAxisId="left"
            stroke="#9CA3AF"
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`}
          />
          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="trade"
            stroke="#3B82F6"
            strokeWidth={3}
            name="Trade Volume ($B)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="risk"
            stroke="#EF4444"
            strokeWidth={2}
            name="Risk Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default TradeTimelineChart;
