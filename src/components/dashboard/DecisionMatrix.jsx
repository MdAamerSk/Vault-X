import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectImpactDistribution,
  selectCapitalEfficiencyScore,
} from '../../features/finance/financeSelectors';
import { Target, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

const DecisionMatrix = () => {
  const impactDistribution = useSelector(selectImpactDistribution);
  const efficiencyScore = useSelector(selectCapitalEfficiencyScore);

  // Helper to format currency
  const formatVal = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
              <span>Decision Matrix</span>
            </h3>
            <p className="text-xs text-zinc-500">Quality analysis of capital allocations</p>
          </div>
          <Target className="h-5 w-5 text-zinc-400" />
        </div>

        {/* Matrix Bars */}
        <div className="space-y-5 mb-6">
          {impactDistribution.map((item) => {
            // Assign badges or border styles based on name
            let badgeBg = 'bg-zinc-800 text-zinc-400';
            if (item.name === 'Essential') badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            if (item.name === 'Investment') badgeBg = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            if (item.name === 'Impulse') badgeBg = 'bg-orange-500/10 text-orange-400 border-orange-500/20';

            return (
              <div key={item.name} className="group">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-zinc-300 font-semibold">{item.name}</span>
                    <span className="text-[9px] text-zinc-500">
                      {item.name === 'Essential' && '(Core Needs)'}
                      {item.name === 'Investment' && '(Future Assets)'}
                      {item.name === 'Impulse' && '(Short-term dopamine)'}
                    </span>
                  </div>
                  <span className="text-zinc-400 font-mono font-bold">
                    {formatVal(item.value)} ({item.percentage}%)
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}40`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
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
    </div>
  );
};

export default DecisionMatrix;
