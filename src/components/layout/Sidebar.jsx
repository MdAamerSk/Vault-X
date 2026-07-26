import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSandboxMode } from '../../features/finance/financeSlice';
import { selectIsSandboxMode } from '../../features/finance/financeSelectors';
import {
  LayoutDashboard,
  TrendingUp,
  FlaskConical,
  Settings,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const isSandboxMode = useSelector(selectIsSandboxMode);
  const dispatch = useDispatch();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Analytics', icon: TrendingUp },
    { name: 'Sandbox', icon: FlaskConical, action: 'sandbox-toggle' },
    { name: 'Settings', icon: Settings },
  ];

  const handleItemClick = (item) => {
    if (item.action === 'sandbox-toggle') {
      dispatch(toggleSandboxMode());
    } else {
      setActiveTab(item.name);
    }
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 left-0">
      {/* Navigation Items */}
      <div className="p-4 space-y-6">
        <div>
          <span className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-4">
            Navigation
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Check if item is active or represent active mode
              const isActive =
                item.name === 'Sandbox' ? isSandboxMode : activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? item.name === 'Sandbox'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105 ${
                        isActive
                          ? item.name === 'Sandbox'
                            ? 'text-amber-400 animate-pulse'
                            : 'text-emerald-400'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {/* Optional Dot/Badge */}
                  {item.name === 'Sandbox' && isSandboxMode && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></span>
                  )}
                  {item.name === 'Dashboard' && !isSandboxMode && activeTab === 'Dashboard' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer Info Card */}
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
            <span className="text-2xl font-bold text-zinc-100 font-mono">92.4</span>
            <span className="text-xs font-bold text-emerald-400">+1.2%</span>
          </div>
          
          <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
            Your spending decisions are highly optimized for growth.
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
