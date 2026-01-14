import React, { createContext } from "react";

export const TransactionsContext = createContext({
  transactions: [],
  isLoading: true,
  error: null,
  addNewTransaction: () => {},
  updateTransaction: () => {},
  removeTransaction: () => {},
  refetchTransactions: () => {},
  clearError: () => {},
  getTransactionsByPeriod: () => [],
  getTransactionsByCategory: () => [],
  getTotalAmount: () => 0,
});