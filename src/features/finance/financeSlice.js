import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialTransactions = [
  {
    id: 'tx-1',
    title: 'Q2 Software Consulting',
    amount: 4800,
    type: 'income',
    category: 'Consulting',
    impactScore: 'Investment',
    date: '2026-07-20',
  },
  {
    id: 'tx-2',
    title: 'AWS Cloud Infrastructure',
    amount: 240,
    type: 'expense',
    category: 'Software',
    impactScore: 'Essential',
    date: '2026-07-22',
  },
  {
    id: 'tx-3',
    title: 'Gourmet Dinner & Drinks',
    amount: 180,
    type: 'expense',
    category: 'Lifestyle',
    impactScore: 'Impulse',
    date: '2026-07-24',
  },
  {
    id: 'tx-4',
    title: 'Index Fund Dividends',
    amount: 350,
    type: 'income',
    category: 'Investment',
    impactScore: 'Investment',
    date: '2026-07-25',
  },
  {
    id: 'tx-5',
    title: 'Office Ergonomic Chair',
    amount: 450,
    type: 'expense',
    category: 'Workspace',
    impactScore: 'Investment',
    date: '2026-07-26',
  },
];

// Helper to save state to LocalStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      'vaultx_finance_state',
      JSON.stringify({
        transactions: state.transactions,
        isSandboxMode: state.isSandboxMode,
        sandboxTransactions: state.sandboxTransactions,
        filterCategory: state.filterCategory,
        searchQuery: state.searchQuery,
      })
    );
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

// Helper to load state from LocalStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('vaultx_finance_state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Failed to load from localStorage', e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const initialState = persistedState || {
  transactions: initialTransactions,
  isSandboxMode: false,
  sandboxTransactions: [],
  filterCategory: 'All',
  searchQuery: '',
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = {
        id: `tx-${nanoid()}`,
        date: new Date().toISOString().split('T')[0],
        ...action.payload,
        amount: Number(action.payload.amount),
      };
      
      if (state.isSandboxMode) {
        state.sandboxTransactions.unshift(newTransaction);
      } else {
        state.transactions.unshift(newTransaction);
      }
      saveToLocalStorage(state);
    },
    deleteTransaction: (state, action) => {
      const targetId = action.payload;
      if (state.isSandboxMode) {
        state.sandboxTransactions = state.sandboxTransactions.filter(
          (t) => t.id !== targetId
        );
      } else {
        state.transactions = state.transactions.filter(
          (t) => t.id !== targetId
        );
      }
      saveToLocalStorage(state);
    },
    toggleSandboxMode: (state) => {
      state.isSandboxMode = !state.isSandboxMode;
      if (state.isSandboxMode) {
        // When entering Sandbox Mode, clone the live ledger
        state.sandboxTransactions = JSON.parse(JSON.stringify(state.transactions));
      }
      saveToLocalStorage(state);
    },
    commitSandboxToMain: (state) => {
      if (state.isSandboxMode) {
        state.transactions = JSON.parse(JSON.stringify(state.sandboxTransactions));
        state.isSandboxMode = false;
      }
      saveToLocalStorage(state);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
      saveToLocalStorage(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  toggleSandboxMode,
  commitSandboxToMain,
  setFilterCategory,
  setSearchQuery,
} = financeSlice.actions;

export default financeSlice.reducer;
