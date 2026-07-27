import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MetricCards from './components/dashboard/MetricCards';
import DecisionMatrix from './components/dashboard/DecisionMatrix';
import TransactionForm from './components/dashboard/TransactionForm';
import TransactionList from './components/dashboard/TransactionList';
import AnalyticsChart from './components/dashboard/AnalyticsChart';
import {
  selectActiveTab,
  selectIsSandboxMode,
} from './features/finance/financeSelectors';

const App = () => {
  const activeTab = useSelector(selectActiveTab);
  const isSandboxMode = useSelector(selectIsSandboxMode);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased">
      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Body Shell */}
      <div className="flex flex-1">
        {/* Left Side Navigation */}
        <Sidebar />

        {/* Central Dashboard Space */}
        <main 
          className={`flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-500 bg-gradient-to-b ${
            isSandboxMode 
              ? 'from-amber-950/10 to-zinc-950 border-t border-amber-500/20 shadow-[inset_0_4px_30px_rgba(245,158,11,0.03)]'
              : 'from-zinc-900/30 to-zinc-950'
          }`}
        >
          
          {/* Dashboard Dynamic Title Headers */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className={`text-[10px] font-bold tracking-widest uppercase border px-2 py-0.5 rounded transition-all duration-300 ${
                isSandboxMode 
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                {isSandboxMode ? 'Sandbox Simulator Active' : 'v1.0.0 Stable'}
              </span>
              
              {activeTab === 'Dashboard' ? (
                <>
                  <h1 className="text-3xl font-black tracking-tight text-zinc-100 mt-2">
                    {isSandboxMode ? 'Sandbox Dashboard' : 'Velocity Dashboard'}
                  </h1>
                  <p className="text-sm text-zinc-400">
                    {isSandboxMode 
                      ? 'Simulate allocations in place without editing live records.' 
                      : 'Optimize financial velocity and track strategic allocation.'}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-black tracking-tight text-zinc-100 mt-2">
                    {isSandboxMode ? 'Sandbox Analytics' : 'Analytics Suite'}
                  </h1>
                  <p className="text-sm text-zinc-400">
                    {isSandboxMode 
                      ? 'Simulate category spending distributions in place.'
                      : 'Detailed distribution mapping and burn-rate assessment.'}
                  </p>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 font-mono">
              <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${isSandboxMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span>Sync status: {isSandboxMode ? 'Sandbox Mode' : 'LocalStorage Active'}</span>
            </div>
          </div>

          {/* Row 1: Metrics (Visible on all tabs; reactive to sandbox status) */}
          <section>
            <MetricCards />
          </section>

          {/* Tab switching renderer */}
          {activeTab === 'Dashboard' ? (
            <>
              {/* Row 2: Standard Dashboard Grid */}
              <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
                <div className="lg:col-span-1">
                  <TransactionForm />
                </div>
                <div className="lg:col-span-1">
                  <DecisionMatrix />
                </div>
                <div className="lg:col-span-2">
                  <AnalyticsChart />
                </div>
              </section>

              {/* Row 3: Standard Ledger */}
              <section className="w-full">
                <TransactionList />
              </section>
            </>
          ) : (
            <>
              {/* Row 2: Analytics Suite Grid - Displays wide bar chart and donut side-by-side */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2">
                  <AnalyticsChart />
                </div>
                <div className="lg:col-span-1">
                  <DecisionMatrix />
                </div>
              </section>
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
