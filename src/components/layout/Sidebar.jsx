import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../features/finance/financeSlice';
import {
  selectActiveTab,
  selectCapitalEfficiencyScore,
} from '../../features/finance/financeSelectors';
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const Sidebar = () => {
  const activeTab = useSelector(selectActiveTab);
  const efficiencyScore = useSelector(selectCapitalEfficiencyScore);
  const dispatch = useDispatch();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Analytics', icon: TrendingUp },
  ];

  const handleItemClick = (item) => {
    dispatch(setActiveTab(item.name));
  };

  // Determine footer trend indicator based on efficiency score
  const isHighEfficiency = efficiencyScore >= 75;

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 left-0 select-none">
      {/* Navigation Items */}
      <div className="p-4 space-y-6">
        <div>
          <span className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-4">
            Navigation
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105 ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Info Card (Dynamically driven by Redux state) */}
      <div className="p-4 border-t border-zinc-900">
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-emerald-500/5 blur-xl"></div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-zinc-300 tracking-wide uppercase">
              Velocity Index
            </span>
          </div>
          
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-bold text-zinc-100 font-mono">
              {efficiencyScore}
            </span>
            <span className={`text-xs font-bold ${isHighEfficiency ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isHighEfficiency ? 'OPTIMAL' : 'MONITOR'}
            </span>
          </div>
          
          <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
            {isHighEfficiency
              ? 'Your spending decisions are highly optimized for growth.'
              : 'Reduce impulse allocations to accelerate wealth velocity.'}
          </p>

          <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 flex items-center space-x-1.5 text-[9px] text-zinc-400">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            <span>Ledger status fully encrypted</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
