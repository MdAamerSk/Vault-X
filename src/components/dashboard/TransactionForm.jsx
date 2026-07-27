import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../features/finance/financeSlice';
import { selectIsSandboxMode } from '../../features/finance/financeSelectors';
import { PlusCircle, Info, Sparkles } from 'lucide-react';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const isSandboxMode = useSelector(selectIsSandboxMode);

  // Form local state
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Software');
  const [impactScore, setImpactScore] = useState('Essential');

  const categories = [
    'Consulting',
    'Salary',
    'Investment',
    'Software',
    'Lifestyle',
    'Workspace',
    'Marketing',
    'Utilities',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      alert('Please fill in both title and amount.');
      return;
    }

    dispatch(
      addTransaction({
        title: title.trim(),
        amount: Number(amount),
        type,
        category,
        impactScore,
      })
    );

    // Reset Form
    setTitle('');
    setAmount('');
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
              <span>Execute Transaction</span>
              {isSandboxMode && (
                <span className="flex items-center text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider">
                  Sandbox
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-500">Add transaction into the active ledger</p>
          </div>
          <PlusCircle className={`h-5 w-5 ${isSandboxMode ? 'text-amber-500' : 'text-emerald-500'}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="tx-title" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <input
              id="tx-title"
              type="text"
              required
              placeholder="e.g. Server hosting bill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Amount and Type in Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tx-amount" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Amount (INR)
              </label>
              <input
                id="tx-amount"
                type="number"
                required
                min="0.01"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-colors"
              />
            </div>

            <div>
              <label htmlFor="tx-type" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Type
              </label>
              <select
                id="tx-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {/* Category & Impact Score in Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tx-category" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                id="tx-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tx-impact" className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Impact Score
              </label>
              <select
                id="tx-impact"
                value={impactScore}
                onChange={(e) => setImpactScore(e.target.value)}
                className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="Essential">Essential</option>
                <option value="Investment">Investment</option>
                <option value="Impulse">Impulse</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-widest text-zinc-950 transition-all duration-300 hover:scale-[1.01] cursor-pointer mt-2 ${
              isSandboxMode
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-gradient-to-r from-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isSandboxMode ? 'Stage in Sandbox' : 'Commit Transaction'}
          </button>
        </form>
      </div>

      {/* Quick Tips or info at bottom */}
      <div className="mt-4 pt-4 border-t border-zinc-900 flex items-start space-x-2 text-[10px] text-zinc-500">
        <Sparkles className="h-4 w-4 text-cyan-500 shrink-0" />
        <span className="leading-normal">
          {isSandboxMode
            ? 'Staging code runs inside sandboxed simulator. Changes will not touch main ledger until committed.'
            : 'Live Mode writes instantly. Maintain a velocity above 80% to keep financial score optimized.'}
        </span>
      </div>
    </div>
  );
};

export default TransactionForm;
