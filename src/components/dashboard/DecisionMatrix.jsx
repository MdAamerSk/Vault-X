import React from 'react';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../../features/finance/financeSelectors';
import { Target, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

const DecisionMatrix = () => {
  const transactions = useSelector(selectTransactions);

  // Filter expenses
  const expenses = transactions.filter((t) => t.type === 'expense');
  const totalExpenseAmount = expenses.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // Group expense totals by impact score
  const essentialTotal = expenses
    .filter((t) => t.impactScore === 'Essential')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const investmentTotal = expenses
    .filter((t) => t.impactScore === 'Investment')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const impulseTotal = expenses
    .filter((t) => t.impactScore === 'Impulse')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  // Calculate percentages
  const getPercentage = (amount) => {
    if (totalExpenseAmount === 0) return 0;
    return Math.round((amount / totalExpenseAmount) * 100);
  };

  const essentialPct = getPercentage(essentialTotal);
  const investmentPct = getPercentage(investmentTotal);
  const impulsePct = getPercentage(impulseTotal);

  // Calculate Velocity Score: (Essential + Investment) / Total Expenses
  // Higher is better. It represents capital allocated to future value/durability vs short-term dopamine.
  const velocityScore = totalExpenseAmount === 0
    ? 100
    : Math.round(((essentialTotal + investmentTotal) / totalExpenseAmount) * 100);

  // Helper to format currency
  const formatVal = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Determine velocity rating title & descriptions
  let ratingTitle = 'Optimal';
  let ratingColor = 'text-emerald-400';
  let ratingBorder = 'border-emerald-500/20';
  let ratingBg = 'bg-emerald-500/5';
  
  if (velocityScore < 50) {
    ratingTitle = 'Risk Alert';
    ratingColor = 'text-rose-400';
    ratingBorder = 'border-rose-500/20';
    ratingBg = 'bg-rose-500/5';
  } else if (velocityScore < 75) {
    ratingTitle = 'Moderate';
    ratingColor = 'text-amber-400';
    ratingBorder = 'border-amber-500/20';
    ratingBg = 'bg-amber-500/5';
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Decision Matrix</h3>
            <p className="text-xs text-zinc-500">Capital quality and velocity assessment</p>
          </div>
          <Target className="h-5 w-5 text-zinc-400" />
        </div>

        {/* Matrix Metrics Breakdown */}
        <div className="space-y-4 mb-6">
          {/* Investment */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                <span className="text-zinc-300 font-semibold">Investment</span>
                <span className="text-[10px] text-zinc-500">(Future Asset)</span>
              </div>
              <span className="text-zinc-400 font-mono font-bold">
                {formatVal(investmentTotal)} ({investmentPct}%)
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${investmentPct}%` }}
              ></div>
            </div>
          </div>

          {/* Essential */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-zinc-300 font-semibold">Essential</span>
                <span className="text-[10px] text-zinc-500">(Operations/Core)</span>
              </div>
              <span className="text-zinc-400 font-mono font-bold">
                {formatVal(essentialTotal)} ({essentialPct}%)
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${essentialPct}%` }}
              ></div>
            </div>
          </div>

          {/* Impulse */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-zinc-300 font-semibold">Impulse</span>
                <span className="text-[10px] text-zinc-500">(Short-term/Dopamine)</span>
              </div>
              <span className="text-zinc-400 font-mono font-bold">
                {formatVal(impulseTotal)} ({impulsePct}%)
              </span>
            </div>
            <div className="h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-500 rounded-full"
                style={{ width: `${impulsePct}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Velocity Rating Indicator */}
      <div className={`rounded-xl border ${ratingBorder} ${ratingBg} p-4 flex items-center justify-between`}>
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Velocity Index Rating
          </span>
          <div className="flex items-baseline space-x-2">
            <span className={`text-xl font-bold tracking-tight ${ratingColor}`}>
              {ratingTitle}
            </span>
            <span className="text-xs text-zinc-500">({velocityScore}% quality capital)</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-12 w-12 rounded-full border border-zinc-800 bg-zinc-950 shadow-inner relative">
          <span className={`text-sm font-black font-mono ${ratingColor}`}>
            {velocityScore}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DecisionMatrix;
