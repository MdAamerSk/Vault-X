import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  selectTotalIncome,
  selectTotalExpense,
  selectNetBalance,
  selectCapitalEfficiencyScore,
  selectRunwayDays,
  selectIsSandboxMode,
} from '../../features/finance/financeSelectors';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Calendar,
  FlaskConical,
} from 'lucide-react';

const MetricCards = () => {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);
  const netBalance = useSelector(selectNetBalance);
  const efficiencyScore = useSelector(selectCapitalEfficiencyScore);
  const runwayDays = useSelector(selectRunwayDays);
  const isSandboxMode = useSelector(selectIsSandboxMode);

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const metrics = [
    {
      name: 'Net Balance',
      value: formatCurrency(netBalance),
      subtext: isSandboxMode ? 'Sandbox ledger balance' : 'Available active balance',
      icon: Wallet,
      colorClass: 'text-cyan-400',
      bgColorClass: 'bg-cyan-500/10',
      borderColorClass: 'border-cyan-500/20 hover:border-cyan-500/40',
      glowColor: 'shadow-[0_0_15px_rgba(6,182,212,0.03)] hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]',
    },
    {
      name: 'Total Income',
      value: formatCurrency(totalIncome),
      subtext: 'Revenue from active ledger',
      icon: ArrowUpRight,
      colorClass: 'text-emerald-400',
      bgColorClass: 'bg-emerald-500/10',
      borderColorClass: 'border-emerald-500/20 hover:border-emerald-500/40',
      glowColor: 'shadow-[0_0_15px_rgba(16,185,129,0.03)] hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]',
    },
    {
      name: 'Total Expense',
      value: formatCurrency(totalExpense),
      subtext: 'Outflows from active ledger',
      icon: ArrowDownRight,
      colorClass: 'text-rose-400',
      bgColorClass: 'bg-rose-500/10',
      borderColorClass: 'border-rose-500/20 hover:border-rose-500/40',
      glowColor: 'shadow-[0_0_15px_rgba(244,63,94,0.03)] hover:shadow-[0_0_20px_rgba(244,63,94,0.12)]',
    },
    {
      name: 'Capital Efficiency',
      value: `${efficiencyScore}%`,
      subtext: 'Essential + Invest / Total',
      icon: Zap,
      colorClass: 'text-indigo-400',
      bgColorClass: 'bg-indigo-500/10',
      borderColorClass: 'border-indigo-500/20 hover:border-indigo-500/40',
      glowColor: 'shadow-[0_0_15px_rgba(99,102,241,0.03)] hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]',
      isEfficiency: true,
    },
    {
      name: 'Runway Runway',
      value: runwayDays === Infinity ? '∞ Days' : `${runwayDays} Days`,
      subtext: runwayDays === Infinity ? 'Zero burn or negative cash' : 'Remaining cash lifespan',
      icon: Calendar,
      colorClass: 'text-amber-400',
      bgColorClass: 'bg-amber-500/10',
      borderColorClass: 'border-amber-500/20 hover:border-amber-500/40',
      glowColor: 'shadow-[0_0_15px_rgba(245,158,11,0.03)] hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl bg-zinc-900/40 border p-4 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between ${metric.borderColorClass} ${metric.glowColor}`}
          >
            {/* Ambient card background glow */}
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-zinc-800/5 -mr-4 -mt-4"></div>

            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest">
                  {metric.name === 'Runway Runway' ? 'Financial Runway' : metric.name}
                </span>
                <div className={`p-1.5 rounded-lg ${metric.bgColorClass}`}>
                  <Icon className={`h-4.5 w-4.5 ${metric.colorClass}`} />
                </div>
              </div>

              {/* Sandbox indicator inside values */}
              {isSandboxMode && (
                <div className="flex items-center space-x-1 mb-1">
                  <FlaskConical className="h-3 w-3 text-amber-500 shrink-0" />
                  <span className="text-[9px] text-amber-500/80 font-bold uppercase tracking-wide">
                    Sandbox Sim
                  </span>
                </div>
              )}

              {/* Main value display */}
              <h3 className="text-2xl font-black text-zinc-100 font-mono tracking-tight">
                {metric.value}
              </h3>
            </div>

            {/* Extra visual indicators (e.g. mini progress bar for efficiency) */}
            {metric.isEfficiency && (
              <div className="mt-3 w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  style={{ width: `${efficiencyScore}%` }}
                ></div>
              </div>
            )}

            {/* Subtext info */}
            <div className="mt-3 text-[10px] text-zinc-500 leading-tight">
              {metric.subtext}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MetricCards;
