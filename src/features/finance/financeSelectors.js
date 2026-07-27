import { createSelector } from '@reduxjs/toolkit';

export const selectIsSandboxMode = (state) => state.finance.isSandboxMode;
export const selectFilterCategory = (state) => state.finance.filterCategory;
export const selectSearchQuery = (state) => state.finance.searchQuery;
export const selectActiveTab = (state) => state.finance.activeTab || 'Dashboard';

// 1. Returns either live or sandbox transactions based on mode
export const selectRawTransactions = (state) =>
  state.finance.isSandboxMode
    ? state.finance.sandboxTransactions
    : state.finance.transactions;

// 2. Returns filtered transactions based on category and search query
export const selectFilteredTransactions = createSelector(
  [selectRawTransactions, selectFilterCategory, selectSearchQuery],
  (transactions, category, query) => {
    return transactions.filter((t) => {
      const matchCategory =
        category === 'All' || t.category.toLowerCase() === category.toLowerCase();
      const matchSearch =
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase()) ||
        t.impactScore.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });
  }
);

// 3. Calculates total amount where type === 'income' from filtered transactions
export const selectTotalIncome = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }
);

// 4. Calculates total amount where type === 'expense' from filtered transactions
export const selectTotalExpense = createSelector(
  [selectFilteredTransactions],
  (transactions) => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }
);

// 5. Returns Net Balance: TotalIncome - TotalExpense (based on filtered lists)
export const selectNetBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expense) => income - expense
);

// 6. Calculates capital efficiency score from raw (all active) transactions
export const selectCapitalEfficiencyScore = createSelector(
  [selectRawTransactions],
  (transactions) => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount || 0), 0);

    if (totalExpense === 0) return 100; //  Edge case safety

    const efficientExpense = expenses
      .filter((t) => t.impactScore === 'Essential' || t.impactScore === 'Investment')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return Math.round((efficientExpense / totalExpense) * 100);
  }
);

// 7. Calculates estimated runway days based on daily burn rate over 30 days
export const selectRunwayDays = createSelector(
  [selectNetBalance, selectTotalExpense],
  (netBalance, totalExpense) => {
    if (totalExpense <= 0 || netBalance <= 0) {
      return Infinity;
    }
    const dailyBurn = totalExpense / 30;
    return Math.round(netBalance / dailyBurn);
  }
);

// 8. Returns impact distribution array for chart/progress bar rendering
export const selectImpactDistribution = createSelector(
  [selectRawTransactions],
  (transactions) => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const essential = expenses
      .filter((t) => t.impactScore === 'Essential')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const investment = expenses
      .filter((t) => t.impactScore === 'Investment')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const impulse = expenses
      .filter((t) => t.impactScore === 'Impulse')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return [
      { name: 'Essential', value: essential, percentage: totalExpense > 0 ? Math.round((essential / totalExpense) * 100) : 0, color: '#10B981' },
      { name: 'Investment', value: investment, percentage: totalExpense > 0 ? Math.round((investment / totalExpense) * 100) : 0, color: '#6366F1' },
      { name: 'Impulse', value: impulse, percentage: totalExpense > 0 ? Math.round((impulse / totalExpense) * 100) : 0, color: '#F97316' },
    ];
  }
);

// 9. Returns expenses grouped by category
export const selectCategoryBreakdown = createSelector(
  [selectRawTransactions],
  (transactions) => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const breakdown = {};
    expenses.forEach((t) => {
      breakdown[t.category] = (breakdown[t.category] || 0) + Number(t.amount || 0);
    });
    return breakdown;
  }
);
