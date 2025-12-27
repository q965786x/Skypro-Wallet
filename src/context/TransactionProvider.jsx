import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { AuthContext } from "./AuthContext";
import { TransactionsContext } from "./TransactionContext";
import {
  fetchMockTransactions as fetchTransactions,
  postMockTransaction as postTransaction,
  editMockTransaction as editTransaction,
  deleteMockTransaction as deleteTransaction,
} from "../services/mockTransactions.js";

const TransactionProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = useCallback(async () => {
    if (!token) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchTransactions({ token });

      // Если API возвращает массив напрямую
      if (Array.isArray(data)) {
        setTransactions(data);
      }
      // Если API возвращает { transactions: [...] }
      else if (data && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
      // Если другая структура
      else if (data && data.data && Array.isArray(data.data)) {
        setTransactions(data.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      setError(error.message || "Ошибка загрузки транзакций");
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Создание транзакции
  const addNewTransaction = async (transactionData) => {
    if (!token) {
      setError("Требуется авторизация");
      return false;
    }

    try {
      const response = await postTransaction(transactionData);

      if (response && response.transactions) {
        setTransactions(response.transactions);
        return true;
      }
      return false;
    } catch (error) {
      setError(error.message || "Ошибка создания транзакции");
      return false;
    }
  };

  // Редактированиие транзакции
  const updateTransaction = async (id, transactionData) => {
    if (!token) {
      setError("Требуется авторизация");
      return false;
    }

    try {
      const response = await editTransaction(id, transactionData);

      if (response && response.transactions) {
        setTransactions(response.transactions);
        return true;
      }
      return false;
    } catch (error) {
      setError(error.message || "Ошибка редактирования транзакции");
      return false;
    }
  };

  // Удаление транзакции
  const removeTransaction = async (id) => {
    if (!token) {
      setError("Требуется авторизация");
      return false;
    }

    try {
      const response = await deleteTransaction(id);

      if (response && response.transactions) {
        setTransactions(response.transactions);
        return true;
      }
      return false;
    } catch (error) {
      setError(error.message || "Ошибка удаления транзакции");
      return false;
    }
  };

  // Вспомогательные методы для работы с транзакциями
  const getTransactionsByPeriod = useCallback(
    (startDate, endDate) => {
      return transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    },
    [transactions]
  );

  const getTransactionsByCategory = useCallback(
    (category) => {
      return transactions.filter(
        (transaction) => transaction.category === category
      );
    },
    [transactions]
  );

  const getTotalAmount = useCallback(() => {
    return transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.amount) || 0),
      0
    );
  }, [transactions]);

  const getCategoriesSummary = useCallback(() => {
    const summary = {};
    transactions.forEach((transaction) => {
      const category = transaction.category || "Без категории";
      const amount = parseFloat(transaction.amount) || 0;
      summary[category] = (summary[category] || 0) + amount;
    });
    return Object.entries(summary).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const getDailySummary = useCallback(() => {
    const summary = {};
    transactions.forEach((transaction) => {
      const date = transaction.date;
      const amount = parseFloat(transaction.amount) || 0;
      summary[date] = (summary[date] || 0) + amount;
    });
    return Object.entries(summary)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions]);

  // Мемоизированные значения для производительности
  const contextValue = useMemo(
    () => ({
      transactions,
      isLoading,
      error,
      addNewTransaction,
      updateTransaction,
      removeTransaction,
      refetchTransactions: loadTransactions,
      clearError: () => setError(""),
      // Новые методы
      getTransactionsByPeriod,
      getTransactionsByCategory,
      getTotalAmount,
      getCategoriesSummary,
      getDailySummary,
    }),
    [
      transactions,
      isLoading,
      error,
      loadTransactions,
      getTransactionsByPeriod,
      getTransactionsByCategory,
      getTotalAmount,
      getCategoriesSummary,
      getDailySummary,
    ]
  );

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionProvider;
