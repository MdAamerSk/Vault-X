import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectImpactDistribution,
  selectCapitalEfficiencyScore,
} from '../../features/finance/financeSelectors';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Target, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

const DecisionMatrix = () => {
  const impactDistribution = useSelector(selectImpactDistribution);
  const efficiencyScore = useSelector(selectCapitalEfficiencyScore);

  // Helper to format currency
  const formatVal = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Determine advice callout based on efficiency score
  let adviceTitle = 'Optimal Velocity';
  let adviceText = 'Your capital allocation is highly optimized for wealth acceleration and future growth.';
  let adviceColor = 'text-emerald-400';
  let adviceBg = 'bg-emerald-500/5';
  let adviceBorder = 'border-emerald-500/20';
  let AdviceIcon = Sparkles;

  if (efficiencyScore < 50) {
    adviceTitle = 'High Impulse Burn Detected';
    adviceText = 'Warning: Capital allocation is heavily skewed toward short-term value leakage. Recommend reducing discretionary expense.';
    adviceColor = 'text-rose-400';
    adviceBg = 'bg-rose-500/5';
    adviceBorder = 'border-rose-500/20';
    AdviceIcon = ShieldAlert;
  } else if (efficiencyScore < 75) {
    adviceTitle = 'Moderate Efficiency';
    adviceText = 'Fair distribution. You can increase financial velocity by shifting impulse spend into investments.';
    adviceColor = 'text-amber-400';
    adviceBg = 'bg-amber-500/5';
    adviceBorder = 'border-amber-500/20';
    AdviceIcon = TrendingUp;
  }

  // Filter out zero-values to avoid chart anomalies, check if any data exists
  const activeChartData = impactDistribution.filter((item) => item.value > 0);
  const hasExpenses = activeChartData.length > 0;

  // Fallback data for empty state chart (renders grey donut)
  const fallbackData = [{ name: 'No Expenses', value: 1, color: '#27272a' }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
              <span>Decision Matrix</span>
            </h3>
            <p className="text-xs text-zinc-500">Quality analysis of capital allocations</p>
          </div>
          <Target className="h-5 w-5 text-zinc-400" />
        </div>

        {/* Dynamic Split Layout: Bars Left, Donut Chart Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
          {/* Progress Indicators (Left side) */}
          <div className="md:col-span-7 space-y-4">
            {impactDistribution.map((item) => (
              <div key={item.name} className="group">
                <div className="flex justify-between items-center text-xs mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-zinc-300 font-semibold text-[11px]">{item.name}</span>
                  </div>
                  <span className="text-zinc-400 font-mono font-bold text-[10px]">
                    {formatVal(item.value)}
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 8px ${item.color}30`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recharts Pie Donut (Right side) */}
          <div className="md:col-span-5 flex justify-center items-center relative h-28 w-full mt-2 md:mt-0">
            {/* Center Text overlay inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
              <span className="text-lg font-black font-mono text-zinc-100 leading-none">
                {efficiencyScore}%
              </span>
              <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                Efficiency
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hasExpenses ? activeChartData : fallbackData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={hasExpenses ? 4 : 0}
                  dataKey="value"
                  animationDuration={600}
                >
                  {hasExpenses
                    ? activeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#18181b" strokeWidth={1} />
                      ))
                    : fallbackData.map((entry, index) => (
                        <Cell key={`cell-fallback`} fill={entry.color} stroke="#18181b" strokeWidth={1} />
                      ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dynamic Advice Callout Card */}
      <div className={`rounded-xl border ${adviceBorder} ${adviceBg} p-4 flex items-start space-x-3`}>
        <div className={`p-1.5 rounded-lg bg-zinc-950 shrink-0`}>
          <AdviceIcon className={`h-4 w-4 ${adviceColor}`} />
        </div>
        <div className="space-y-1">
          <span className={`text-xs font-extrabold uppercase tracking-wide block ${adviceColor}`}>
            {adviceTitle}
          </span>
          <p className="text-[11px] text-zinc-400 leading-normal">
            {adviceText}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DecisionMatrix;
