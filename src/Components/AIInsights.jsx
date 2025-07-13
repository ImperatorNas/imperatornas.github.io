import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Globe } from 'lucide-react';

const AIInsights = ({ aiInsights }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'trend':
        return <Globe className="w-5 h-5 text-blue-600" />;
      default:
        return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span>AI-Powered Insights</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center space-x-2 mb-2">
                {getInsightIcon(insight.type)}
                <span className="font-medium">{insight.title}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Confidence</span>
                <span className="text-xs font-medium text-blue-400">{insight.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${insight.confidence}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-300 mb-2">🎯 Strategic Opportunity</h4>
            <p className="text-sm text-gray-300">
              Focus on agricultural exports to India and China. AI models predict 35% growth potential in the next 18 months based on seasonal patterns and trade agreements.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="font-medium text-yellow-300 mb-2">⚠️ Risk Mitigation</h4>
            <p className="text-sm text-gray-300">
              Diversify currency exposure for USD-denominated trades. Consider hedging strategies for transactions exceeding $50M to minimize currency volatility impact.
            </p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-300 mb-2">📊 Market Intelligence</h4>
            <p className="text-sm text-gray-300">
              Emerging markets in Southeast Asia show strong import demand for manufactured goods. Vietnam and Thailand present immediate opportunities with low political risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
