import { createSelector } from '@reduxjs/toolkit';

export const selectIsSandboxMode = (state) => state.finance.isSandboxMode;
export const selectFilterCategory = (state) => state.finance.filterCategory;
export const selectSearchQuery = (state) => state.finance.searchQuery;

export const selectTransactions = (state) =>
  state.finance.isSandboxMode
    ? state.finance.sandboxTransactions
    : state.finance.transactions;

export const selectTotalIncome = createSelector([selectTransactions], (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
});

export const selectTotalExpense = createSelector([selectTransactions], (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
});

export const selectNetBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expense) => income - expense
);

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFilterCategory, selectSearchQuery],
  (transactions, category, query) => {
    return transactions.filter((t) => {
      const matchCategory = category === 'All' || t.category.toLowerCase() === category.toLowerCase();
      const matchSearch =
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.impactScore.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });
  }
);
