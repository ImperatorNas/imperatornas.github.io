import React from 'react';
import { Shield } from 'lucide-react';

const RiskAssessment = ({ riskFactors, tradeData }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return '#10B981';
      case 'moderate':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-400" />
          <span>Risk Assessment Matrix</span>
        </h3>
        <div className="space-y-4">
          {riskFactors.map((factor, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{factor.factor}</span>
                <span className="text-sm text-gray-400">{factor.trend}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-400 mt-1">{factor.score}/100</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Country Risk Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tradeData.map((country, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{country.country}</span>
                <div
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: getRiskColor(country.risk) + '20',
                    color: getRiskColor(country.risk),
                  }}
                >
                  {country.risk} risk
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Growth: <span className="text-green-400">+{country.growth.toFixed(1)}%</span>
              </div>
              <div className="text-sm text-gray-400">
                Trade Volume: <span className="text-blue-400">${((country.exports + country.imports) / 1000).toFixed(1)}B</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RiskAssessment;
