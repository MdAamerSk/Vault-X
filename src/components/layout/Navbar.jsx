import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSandboxMode, commitSandboxToMain } from '../../features/finance/financeSlice';
import { selectIsSandboxMode } from '../../features/finance/financeSelectors';
import { FlaskConical, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const isSandboxMode = useSelector(selectIsSandboxMode);

  return (
    <nav className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
          <Database className="h-5 w-5 text-slate-950 font-bold" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            VaultX
          </span>
          <span className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase -mt-1">
            Velocity Engine
          </span>
        </div>
      </div>

      {/* Mode Badge & Action Controls */}
      <div className="flex items-center space-x-4">
        {/* Mode Indicator Badge */}
        {isSandboxMode ? (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="tracking-wide uppercase">Sandbox Mode</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide uppercase">Live Ledger</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Commit Sandbox Button (Only in Sandbox Mode) */}
          {isSandboxMode && (
            <button
              onClick={() => dispatch(commitSandboxToMain())}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              title="Commit Sandbox transactions to Main Ledger"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Commit to Live</span>
            </button>
          )}

          {/* Toggle Sandbox Switch */}
          <button
            onClick={() => dispatch(toggleSandboxMode())}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer ${
              isSandboxMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
            }`}
          >
            <FlaskConical className={`h-3.5 w-3.5 ${isSandboxMode ? 'text-zinc-400' : 'text-amber-400'}`} />
            <span>{isSandboxMode ? 'Exit Sandbox' : 'Enter Sandbox'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
