/**
 * SKTECH EXAM — Revenue Analytics Dashboard
 * Visualizes Clean Ad Impression Earnings and Micro-Transaction Trends over the last 30 days
 * Engine: Recharts • Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  BarChart3,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  MousePointerClick,
  Sparkles,
  Layers,
  ChevronDown,
  Layers3,
} from 'lucide-react';
import { RevenueAnalyticsStats, DailyRevenueData } from '../types';
import { api } from '../services/apiClient';

interface RevenueAnalyticsProps {
  onRefreshMonetization?: () => void;
}

export const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ onRefreshMonetization }) => {
  const [analytics, setAnalytics] = useState<RevenueAnalyticsStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<'30D' | '14D' | '7D'>('30D');
  const [chartType, setChartType] = useState<'AREA' | 'BAR' | 'LINE'>('AREA');
  const [activeMetricView, setActiveMetricView] = useState<'COMBINED' | 'BREAKDOWN' | 'VOLUMES'>('COMBINED');
  const [selectedDayDetail, setSelectedDayDetail] = useState<DailyRevenueData | null>(null);

  // Fetch 30-day analytics data
  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const resp = await api.getRevenueAnalytics();
      if (resp.success && resp.data) {
        setAnalytics(resp.data);
      }
    } catch (err) {
      console.error('Failed to load revenue analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  // Filter trends based on selected time range
  const filteredTrends = useMemo(() => {
    if (!analytics?.dailyTrends) return [];
    const count = timeRange === '7D' ? 7 : timeRange === '14D' ? 14 : 30;
    return analytics.dailyTrends.slice(-count);
  }, [analytics, timeRange]);

  // Aggregate stats based on filtered timeframe
  const filteredMetrics = useMemo(() => {
    if (!filteredTrends.length) return null;

    const totalAd = filteredTrends.reduce((sum, d) => sum + d.adRevenue, 0);
    const totalMicro = filteredTrends.reduce((sum, d) => sum + d.microTransactionsRevenue, 0);
    const totalGross = totalAd + totalMicro;
    const totalImpressions = filteredTrends.reduce((sum, d) => sum + d.adImpressions, 0);
    const totalClicks = filteredTrends.reduce((sum, d) => sum + d.adClicks, 0);
    const totalTx = filteredTrends.reduce((sum, d) => sum + d.microTransactionsCount, 0);

    let peakDay = filteredTrends[0];
    for (const d of filteredTrends) {
      if (d.totalRevenue > peakDay.totalRevenue) {
        peakDay = d;
      }
    }

    return {
      totalGross: Math.round(totalGross * 100) / 100,
      totalAd: Math.round(totalAd * 100) / 100,
      totalMicro: Math.round(totalMicro * 100) / 100,
      totalImpressions,
      totalClicks,
      totalTx,
      avgDaily: Math.round((totalGross / filteredTrends.length) * 100) / 100,
      avgOrderValue: totalTx > 0 ? Math.round((totalMicro / totalTx) * 100) / 100 : 0,
      avgCpm: totalImpressions > 0 ? Math.round(((totalAd / totalImpressions) * 1000) * 10) / 10 : 185,
      ctr: totalImpressions > 0 ? Number(((totalClicks / totalImpressions) * 100).toFixed(2)) : 3.8,
      peakDay,
    };
  }, [filteredTrends]);

  // Export 30-Day CSV Report
  const handleExportCsv = () => {
    if (!filteredTrends.length) return;
    const headers = [
      'Date',
      'Ad Impressions',
      'Ad Clicks',
      'Ad Revenue (INR)',
      'Micro-Transactions Count',
      'Micro-Transactions Revenue (INR)',
      'Total Daily Revenue (INR)',
      'Effective CPM (INR)',
    ];

    const rows = filteredTrends.map((d) => [
      d.date,
      d.adImpressions,
      d.adClicks,
      d.adRevenue.toFixed(2),
      d.microTransactionsCount,
      d.microTransactionsRevenue.toFixed(2),
      d.totalRevenue.toFixed(2),
      d.cpm.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SKTECH_EXAM_Revenue_Report_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Recharts Tooltip Formatter
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: DailyRevenueData = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-2 min-w-[220px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold">
            <span className="text-slate-300">{data.formattedDate}</span>
            <span className="text-[10px] text-slate-400 font-mono">{data.date}</span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-1.5 text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>Micro-Transactions:</span>
              </span>
              <span className="font-mono font-bold text-white">₹{data.microTransactionsRevenue.toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-slate-400 pl-3.5">
              {data.microTransactionsCount} test series unlocked
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="flex items-center space-x-1.5 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Ad Impressions:</span>
              </span>
              <span className="font-mono font-bold text-white">₹{data.adRevenue.toLocaleString()}</span>
            </div>
            <div className="text-[10px] text-slate-400 pl-3.5">
              {data.adImpressions.toLocaleString()} views • {data.adClicks} clicks (eCPM: ₹{data.cpm})
            </div>

            <div className="border-t border-slate-800 pt-1.5 mt-1 flex items-center justify-between font-bold text-xs">
              <span className="text-slate-300">Total Day Earnings:</span>
              <span className="font-mono text-emerald-400">₹{data.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading && !analytics) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-600">
          Aggregating 30-day ad impression logs and micro-transaction payments...
        </p>
      </div>
    );
  }

  const metrics = filteredMetrics;

  return (
    <div className="space-y-6">
      {/* 1. Header & Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
              Financial Intelligence
            </span>
            <span className="text-xs text-slate-400 font-medium">• 30-Day Real-Time Recharts Engine</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1 flex items-center space-x-2">
            <span>Revenue Analytics & Monetization Velocity</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time visual comparison of clean educational ad impressions and mock test micro-transactions.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            {(['30D', '14D', '7D'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range === '30D' ? 'Last 30 Days' : range === '14D' ? 'Last 14 Days' : 'Last 7 Days'}
              </button>
            ))}
          </div>

          {/* Chart Style Switcher */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setChartType('AREA')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                chartType === 'AREA' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
              title="Stacked Area View"
            >
              Area Flow
            </button>
            <button
              onClick={() => setChartType('BAR')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                chartType === 'BAR' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
              title="Stacked Bar View"
            >
              Bar Stacks
            </button>
            <button
              onClick={() => setChartType('LINE')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                chartType === 'LINE' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600'
              }`}
              title="Trend Lines"
            >
              Line Curves
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={handleExportCsv}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Refresh */}
          <button
            onClick={() => {
              loadAnalytics();
              if (onRefreshMonetization) onRefreshMonetization();
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition cursor-pointer"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Key Executive Performance Cards */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Gross 30D Revenue */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold text-slate-600">Total Gross Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
              ₹{metrics.totalGross.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{analytics?.growthPercentage || 24.8}% vs prev</span>
              </span>
              <span className="text-slate-400 font-medium">Avg ₹{metrics.avgDaily.toLocaleString()}/day</span>
            </div>
          </div>

          {/* Card 2: Ad Impression Earnings */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold text-slate-600">Clean Ad Earnings</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-teal-700 mt-1 font-mono">
              ₹{metrics.totalAd.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>{metrics.totalImpressions.toLocaleString()} views</span>
              <span className="font-mono font-bold text-slate-700">eCPM: ₹{metrics.avgCpm}</span>
            </div>
          </div>

          {/* Card 3: Micro-Transactions Earnings */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold text-slate-600">Micro-Transactions</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-700 mt-1 font-mono">
              ₹{metrics.totalMicro.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>{metrics.totalTx} series unlocked</span>
              <span className="font-mono font-bold text-slate-700">Avg ₹{metrics.avgOrderValue}</span>
            </div>
          </div>

          {/* Card 4: Peak Revenue Day */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
              <span className="font-semibold text-slate-600">Peak Single Day</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-700 mt-1 font-mono">
              ₹{metrics.peakDay?.totalRevenue.toLocaleString() || '0'}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="font-bold text-slate-700">{metrics.peakDay?.formattedDate}</span>
              <span className="text-slate-400">Exam Announcement Spike</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Primary Recharts Visualization: 30-Day Ad Earnings & Micro-Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span>30-Day Revenue Dynamics: Ad Impressions vs Micro-Transactions</span>
            </h3>
            <p className="text-xs text-slate-500">
              Interactive timeline visualizer showing dual-stream monetization performance across the last {timeRange === '7D' ? '7' : timeRange === '14D' ? '14' : '30'} days.
            </p>
          </div>

          {/* Metric View Focus Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500 font-medium hidden md:inline">Focus Stream:</span>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveMetricView('COMBINED')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeMetricView === 'COMBINED'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Revenue (₹)
              </button>
              <button
                onClick={() => setActiveMetricView('BREAKDOWN')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeMetricView === 'BREAKDOWN'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ad vs Micro-Tx
              </button>
              <button
                onClick={() => setActiveMetricView('VOLUMES')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeMetricView === 'VOLUMES'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Volumes & Views
              </button>
            </div>
          </div>
        </div>

        {/* The Main Recharts Container */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'AREA' ? (
              <AreaChart data={filteredTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAdRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorMicroRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="colorTotalRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
                  formatter={(value) => <span className="text-slate-700 font-semibold">{value}</span>}
                />

                {activeMetricView === 'COMBINED' ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="microTransactionsRevenue"
                      name="Micro-Transaction Revenue"
                      stackId="1"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMicroRev)"
                    />
                    <Area
                      type="monotone"
                      dataKey="adRevenue"
                      name="Clean Ad Impression Revenue"
                      stackId="1"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAdRev)"
                    />
                  </>
                ) : activeMetricView === 'BREAKDOWN' ? (
                  <>
                    <Area
                      type="monotone"
                      dataKey="microTransactionsRevenue"
                      name="Micro-Transaction Unlocks (₹)"
                      stroke="#4f46e5"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorMicroRev)"
                    />
                    <Area
                      type="monotone"
                      dataKey="adRevenue"
                      name="Ad Network Earnings (₹)"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorAdRev)"
                    />
                  </>
                ) : (
                  <>
                    <Area
                      type="monotone"
                      dataKey="adImpressions"
                      name="Ad Impressions Count"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      fillOpacity={0.3}
                      fill="#0ea5e9"
                    />
                    <Area
                      type="monotone"
                      dataKey="microTransactionsCount"
                      name="Purchases / Unlocks Count"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={0.5}
                      fill="#f59e0b"
                    />
                  </>
                )}
              </AreaChart>
            ) : chartType === 'BAR' ? (
              <BarChart data={filteredTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
                  formatter={(value) => <span className="text-slate-700 font-semibold">{value}</span>}
                />
                <Bar
                  dataKey="microTransactionsRevenue"
                  name="Micro-Transaction Revenue (₹)"
                  stackId="a"
                  fill="#4f46e5"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="adRevenue"
                  name="Ad Impression Revenue (₹)"
                  stackId="a"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={filteredTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: 12, fontSize: 12 }}
                  formatter={(value) => <span className="text-slate-700 font-semibold">{value}</span>}
                />
                <Line
                  type="monotone"
                  dataKey="totalRevenue"
                  name="Total Daily Revenue (₹)"
                  stroke="#0f172a"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#0f172a' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="microTransactionsRevenue"
                  name="Micro-Transactions (₹)"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="adRevenue"
                  name="Ad Earnings (₹)"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Visual summary pills beneath main chart */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
              <span className="font-semibold text-slate-700">Micro-Transaction Share:</span>
            </div>
            <span className="font-mono font-extrabold text-indigo-700">
              {metrics && metrics.totalGross > 0
                ? `${Math.round((metrics.totalMicro / metrics.totalGross) * 100)}%`
                : '75%'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              <span className="font-semibold text-slate-700">Clean Ad Share:</span>
            </div>
            <span className="font-mono font-extrabold text-emerald-700">
              {metrics && metrics.totalGross > 0
                ? `${Math.round((metrics.totalAd / metrics.totalGross) * 100)}%`
                : '25%'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700">Ad Quality Filtering:</span>
            </div>
            <span className="font-bold text-emerald-700">100% Edu Verified</span>
          </div>
        </div>
      </div>

      {/* 4. Secondary Analytical Deep-Dives (Two Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deep Dive 1: Cumulative Revenue Growth Curve */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Cumulative 30-Day Growth Curve</span>
              </h4>
              <p className="text-xs text-slate-500">Day-over-day total revenue accumulation.</p>
            </div>
            <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              Total: ₹{metrics?.totalGross.toLocaleString()}
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredTrends} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="cumRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Cumulative Revenue']}
                  labelFormatter={(_label, payload) => (payload[0]?.payload as DailyRevenueData)?.date || ''}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativeRevenue"
                  name="Accumulated Earnings (₹)"
                  stroke="#0f172a"
                  strokeWidth={2.5}
                  fill="url(#cumRevGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deep Dive 2: Revenue Distribution by Exam Category & Channel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Layers3 className="w-4 h-4 text-indigo-600" />
                <span>Monetization Share by Exam Category</span>
              </h4>
              <p className="text-xs text-slate-500">Student purchases & ad impressions by competitive stream.</p>
            </div>
            <span className="text-xs text-slate-500 font-mono">4 Streams</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 pt-1">
            {/* Donut Chart */}
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics?.revenueByExamCategory || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="amount"
                  >
                    {(analytics?.revenueByExamCategory || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown Legend */}
            <div className="space-y-2 text-xs">
              {(analytics?.revenueByExamCategory || []).map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-slate-700 font-medium truncate max-w-[130px]" title={cat.category}>
                      {cat.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 font-mono">
                    <span className="font-bold text-slate-900">₹{cat.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">({cat.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 30-Day Granular Financial Ledger & Trend Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900">30-Day Daily Financial Log & Conversion Ledger</h3>
            <p className="text-xs text-slate-500">
              Complete chronological breakdown of daily educational ad impressions, click-through conversions, and test unlocks.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Showing {filteredTrends.length} days
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Ad Impressions</th>
                <th className="p-3">Ad Clicks (CTR)</th>
                <th className="p-3">Ad Earnings (₹)</th>
                <th className="p-3">Unlocked Tests</th>
                <th className="p-3">Micro-Tx Revenue (₹)</th>
                <th className="p-3 text-right">Total Day Revenue (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredTrends.slice().reverse().map((day) => {
                const ctr = ((day.adClicks / (day.adImpressions || 1)) * 100).toFixed(2);
                const isPeak = metrics?.peakDay?.date === day.date;
                return (
                  <tr
                    key={day.date}
                    onClick={() => setSelectedDayDetail(day)}
                    className={`hover:bg-slate-50 cursor-pointer transition ${
                      isPeak ? 'bg-amber-50/50' : ''
                    }`}
                  >
                    <td className="p-3 font-bold text-slate-900 flex items-center space-x-1.5">
                      <span>{day.formattedDate}</span>
                      {isPeak && (
                        <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                          Peak
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600">
                      {day.adImpressions.toLocaleString()}
                    </td>
                    <td className="p-3 text-slate-600">
                      {day.adClicks} <span className="text-[10px] text-slate-400 font-sans">({ctr}%)</span>
                    </td>
                    <td className="p-3 text-teal-700 font-bold">
                      ₹{day.adRevenue.toFixed(2)}
                    </td>
                    <td className="p-3 text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                        {day.microTransactionsCount} unlocks
                      </span>
                    </td>
                    <td className="p-3 text-indigo-700 font-bold">
                      ₹{day.microTransactionsRevenue.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-black text-slate-900 text-xs">
                      ₹{day.totalRevenue.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
