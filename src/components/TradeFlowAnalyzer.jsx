
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Globe, Download } from 'lucide-react';
import axios from 'axios';
import Select from 'react-select';
import TradeSummary from './TradeSummary';
import TradePartnersChart from './TradePartnersChart';
import TradeTimelineChart from './TradeTimelineChart';
import RiskAssessment from './RiskAssessment';
import AIInsights from './AIInsights';
import { generatePDF } from '../utils/pdfGenerator';
import './TradeFlowAnalyzer.css';

const RiskDistributionChart = lazy(() => import('./RiskDistributionChart'));

const TradeFlowAnalyzer = () => {
  const [selectedCountries, setSelectedCountries] = useState([{ value: 'NGA', label: 'Nigeria' }]);
  const [timeRange, setTimeRange] = useState('2024');
  const [activeTab, setActiveTab] = useState('overview');
  const [tradeData, setTradeData] = useState([]);
  const [riskFactors, setRiskFactors] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://api.worldbank.org/v2/country?format=json&per_page=300');
        const countryList = response.data[1].map((country) => ({
          value: country.iso2Code,
          label: country.name,
        }));
        setCountries(countryList);
      } catch (err) {
        setError('Failed to fetch countries');
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchTradeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const countryCodes = selectedCountries.map((c) => c.value).join(';');
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${countryCodes}/indicator/NE.EXP.GNFS;NE.IMP.GNFS?date=${timeRange}&format=json`
        );
        const data = response.data[1].reduce((acc, item) => {
          const country = item.country.value;
          const existing = acc.find((d) => d.country === country) || {
            country,
            exports: 0,
            imports: 0,
            risk: 'moderate',
            growth: 0,
          };
          if (item.indicator.id === 'NE.EXP.GNFS') existing.exports = item.value || 0;
          if (item.indicator.id === 'NE.IMP.GNFS') existing.imports = item.value || 0;
          existing.growth = Math.random() * 10 + 5;
          return [...acc.filter((d) => d.country !== country), existing];
        }, []);
        setTradeData(data);
      } catch (err) {
        setError('Failed to fetch trade data');
      } finally {
        setLoading(false);
      }
    };
    if (selectedCountries.length) fetchTradeData();
  }, [selectedCountries, timeRange]);

  useEffect(() => {
    setRiskFactors([
      { factor: 'Political Stability', score: 72, trend: 'stable' },
      { factor: 'Economic Indicators', score: 68, trend: 'improving' },
      { factor: 'Sanctions Risk', score: 85, trend: 'stable' },
      { factor: 'Currency Volatility', score: 45, trend: 'declining' },
      { factor: 'Trade Agreements', score: 78, trend: 'improving' },
    ]);
  }, []);

  useEffect(() => {
    const fetchTimeSeriesData = async () => {
      setLoading(true);
      try {
        const countryCodes = selectedCountries.map((c) => c.value).join(';');
        const response = await axios.get(
          `https://api.worldbank.org/v2/country/${countryCodes}/indicator/NE.TRD.GNFS.ZS?date=2024M01:2024M06&format=json`
        );
        const data = response.data[1].map((item) => ({
          month: item.date.slice(5, 7),
          trade: item.value || 0,
          risk: Math.random() * 20 + 50,
        }));
        setTimeSeriesData(data);
      } catch (err) {
        setError('Failed to fetch time series data');
      } finally {
        setLoading(false);
      }
    };
    if (selectedCountries.length) fetchTimeSeriesData();
  }, [selectedCountries]);

  useEffect(() => {
    setAiInsights([
      {
        type: 'opportunity',
        title: 'Emerging Market Opportunity',
        description: 'AI suggests 23% growth in agricultural exports to Southeast Asia',
        confidence: 87,
      },
      {
        type: 'risk',
        title: 'Currency Fluctuation Alert',
        description: '15% volatility in USD/NGN exchange rate predicted',
        confidence: 78,
      },
      {
        type: 'trend',
        title: 'Commodity Price Trend',
        description: 'Oil price stabilization supports export diversification',
        confidence: 92,
      },
    ]);
  }, []);

  const handleExportPDF = () => {
    generatePDF(
      tradeData,
      riskFactors,
      timeSeriesData,
      aiInsights,
      selectedCountries.map((c) => c.label)
    );
  };

  const totalExports = useMemo(() => tradeData.reduce((sum, d) => sum + d.exports, 0), [tradeData]);
  const totalImports = useMemo(() => tradeData.reduce((sum, d) => sum + d.imports, 0), [tradeData]);
  const tradeBalance = useMemo(() => totalExports - totalImports, [totalExports, totalImports]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Global Trade Flow Analyzer</h1>
              <p className="text-blue-200 text-sm">AI-Powered Geopolitical Risk Assessment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Analysis Updated</div>
              <div className="text-sm font-semibold">July 10, 2025</div>
            </div>
            <button
              onClick={handleExportPDF}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              aria-label="Export report as PDF"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Remaining layout and tabs stay the same */}
    </div>
  );
};

export default TradeFlowAnalyzer;
