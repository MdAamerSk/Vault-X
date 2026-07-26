import React from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import MetricCards from './components/dashboard/MetricCards';
import DecisionMatrix from './components/dashboard/DecisionMatrix';
import TransactionForm from './components/dashboard/TransactionForm';
import TransactionList from './components/dashboard/TransactionList';

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased">
      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Body Shell */}
      <div className="flex flex-1">
        {/* Left Side Navigation */}
        <Sidebar />

        {/* Central Dashboard Space */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 bg-linear-to-b from-zinc-900/30 to-zinc-950 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {/* Dashboard Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                v1.0.0 Stable
              </span>
              <h1 className="text-3xl font-black tracking-tight text-zinc-100 mt-2">
                Velocity Dashboard
              </h1>
              <p className="text-sm text-zinc-400">
                Optimize financial velocity and track strategic allocation.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Sync status: Live Ledger synchronized</span>
            </div>
          </div>

          {/* Row 1: Metrics */}
          <section>
            <MetricCards />
          </section>

          {/* Row 2: Interactive Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <TransactionForm />
            </div>

            {/* Matrix & Analytics Column */}
            <div className="lg:col-span-1">
              <DecisionMatrix />
            </div>

            {/* Ledger List Column */}
            <div className="lg:col-span-1">
              <TransactionList />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
