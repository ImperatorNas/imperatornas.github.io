import React from 'react';
import { Database } from 'lucide-react';

const TradeSummary = ({ totalExports, totalImports, tradeBalance }) => (
  <div className="lg:col-span-1 space-y-6">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <Database className="w-5 h-5 text-blue-400" />
        <span>Trade Summary</span>
      </h3>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">${(totalExports / 1000).toFixed(1)}B</div>
          <div className="text-sm text-green-300">Total Exports</div>
          <div className="text-xs text-green-200">↑ 12.5% from last year</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">${(totalImports / 1000).toFixed(1)}B</div>
          <div className="text-sm text-blue-300">Total Imports</div>
          <div className="text-xs text-blue-200">↑ 8.3% from last year</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">${(tradeBalance / 1000).toFixed(1)}B</div>
          <div className="text-sm text-purple-300">Trade Balance</div>
          <div className="text-xs text-purple-200">{tradeBalance > 0 ? 'Positive surplus' : 'Deficit'}</div>
        </div>
      </div>
    </div>
  </div>
);

export default TradeSummary;
