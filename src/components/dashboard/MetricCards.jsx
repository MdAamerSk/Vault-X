import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTotalIncome,
  selectTotalExpense,
  selectNetBalance,
  selectIsSandboxMode,
} from '../../features/finance/financeSelectors';
import { Wallet, ArrowUpRight, ArrowDownRight, FlaskConical } from 'lucide-react';

const MetricCards = () => {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);
  const netBalance = useSelector(selectNetBalance);
  const isSandboxMode = useSelector(selectIsSandboxMode);

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const metrics = [
    {
      name: 'Net Balance',
      value: netBalance,
      icon: Wallet,
      colorClass: 'text-cyan-400',
      bgColorClass: 'bg-cyan-500/10',
      borderColorClass: 'border-cyan-500/20 hover:border-cyan-500/40',
      glowColor: 'shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    },
    {
      name: 'Total Income',
      value: totalIncome,
      icon: ArrowUpRight,
      colorClass: 'text-emerald-400',
      bgColorClass: 'bg-emerald-500/10',
      borderColorClass: 'border-emerald-500/20 hover:border-emerald-500/40',
      glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    },
    {
      name: 'Total Expenses',
      value: totalExpense,
      icon: ArrowDownRight,
      colorClass: 'text-rose-400',
      bgColorClass: 'bg-rose-500/10',
      borderColorClass: 'border-rose-500/20 hover:border-rose-500/40',
      glowColor: 'shadow-[0_0_20px_rgba(244,63,94,0.05)] hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div
            key={metric.name}
            className={`rounded-2xl bg-zinc-900/50 border p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${metric.borderColorClass} ${metric.glowColor}`}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-zinc-800/10 -mr-6 -mt-6"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-1">
                  {metric.name}
                </span>
                
                {isSandboxMode && (
                  <div className="flex items-center space-x-1 mb-1">
                    <FlaskConical className="h-3 w-3 text-amber-500 animate-pulse" />
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                      Sandbox Sim
                    </span>
                  </div>
                )}
                
                <h3 className="text-3xl font-black text-zinc-100 font-mono tracking-tight">
                  {formatCurrency(metric.value)}
                </h3>
              </div>

              <div className={`p-3 rounded-xl ${metric.bgColorClass}`}>
                <Icon className={`h-6 w-6 ${metric.colorClass}`} />
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-xs">
              <span className="text-zinc-500">Active Ledger:</span>
              <span className={`ml-1.5 font-bold uppercase ${isSandboxMode ? 'text-amber-500' : 'text-emerald-500'}`}>
                {isSandboxMode ? 'Sandbox' : 'Live'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
