import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteTransaction,
  setFilterCategory,
  setSearchQuery,
} from '../../features/finance/financeSlice';
import {
  selectFilteredTransactions,
  selectFilterCategory,
  selectSearchQuery,
  selectIsSandboxMode,
} from '../../features/finance/financeSelectors';
import { Search, Trash2, SlidersHorizontal, Info, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const currentCategory = useSelector(selectFilterCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const isSandboxMode = useSelector(selectIsSandboxMode);

  const categories = ['All', 'Consulting', 'Salary', 'Investment', 'Software', 'Lifestyle', 'Workspace', 'Utilities', 'Other'];

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between h-full">
      <div>
        {/* List Header and Search Controls */}
        <div className="flex flex-col gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
              <span>Transaction Ledger</span>
              {isSandboxMode && (
                <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider">
                  Sandbox Active
                </span>
              )}
            </h3>
            <p className="text-xs text-zinc-500">Audit trail of income and operational outlays</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-zinc-600" />
            </span>
            <input
              type="text"
              placeholder="Search descriptions, tags..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full rounded-lg bg-zinc-900 border border-zinc-800 pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters row */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-4 mb-4 border-b border-zinc-900 scrollbar-thin scrollbar-thumb-zinc-800">
          <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setFilterCategory(cat))}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                currentCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md shadow-zinc-100/5'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Transactions Table container */}
        <div className="overflow-x-auto max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          {transactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800/50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <th className="pb-3 pl-2">Description</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Impact</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 pr-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-xs">
                <AnimatePresence initial={false}>
                  {transactions.map((tx) => {
                    // Setup impact score class color
                    let impactColor = '';
                    if (tx.impactScore === 'Investment') {
                      impactColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
                    } else if (tx.impactScore === 'Essential') {
                      impactColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                    } else {
                      impactColor = 'text-orange-400 bg-orange-500/10 border-orange-500/20';
                    }

                    const isIncome = tx.type === 'income';

                    return (
                      <motion.tr
                        key={tx.id}
                        layout
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-zinc-900/30 transition-colors group"
                      >
                        {/* Title & category */}
                        <td className="py-3 pl-2">
                          <div className="font-semibold text-zinc-200">{tx.title}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">{tx.category}</div>
                        </td>

                        {/* Date */}
                        <td className="py-3 text-zinc-400 font-mono">{tx.date}</td>

                        {/* Impact Score */}
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${impactColor}`}>
                            {tx.impactScore}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3 text-right font-mono font-bold">
                          <span className={isIncome ? 'text-emerald-400' : 'text-zinc-200'}>
                            {isIncome ? '+' : '-'}
                            {formatCurrency(tx.amount)}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3 text-center pr-2">
                          <button
                            onClick={() => handleDelete(tx.id)}
                            className="p-1 rounded bg-transparent hover:bg-rose-500/10 text-zinc-600 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all duration-200 opacity-50 group-hover:opacity-100 cursor-pointer"
                            title="Delete transaction"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>

            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
              <Inbox className="h-10 w-10 text-zinc-700 mb-3 animate-pulse" />
              <div className="text-sm font-semibold text-zinc-500">No Transactions Found</div>
              <div className="text-[10px] text-zinc-600 mt-1 max-w-[200px] text-center">
                Try widening your search terms or adding a new transaction to get started.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Counter summary */}
      <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
        <div className="flex items-center space-x-1.5">
          <Info className="h-3 w-3 text-cyan-400" />
          <span>Showing {transactions.length} items</span>
        </div>
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(''))}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
