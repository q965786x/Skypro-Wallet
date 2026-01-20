import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AuthContext } from "./AuthContext";
import { TransactionsContext } from "./TransactionContext";
import {
  fetchTransactions,
  postTransaction,
  editTransaction,
  deleteTransaction,
  fetchTransactionsByPeriod,
} from "../services/api";

const TransactionProvider = ({ children }) => {
  const { token, isCheckingAuth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef(null);
  const previousTokenRef = useRef(null);

  const componentId = useRef(Math.random().toString(36).substr(2, 9));
  const hasLoadedInitialData = useRef(false);
  const isMountedRef = useRef(true);

  // Инициализация при монтировании
  useEffect(() => {
    return () => {
      isMountedRef.current = false;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Компонент размонтирован");
      }
    };
  }, []);

  // Функция очистки ошибки
  const clearError = useCallback(() => {
    setError("");
  }, []);

  const loadTransactions = useCallback(async () => {
    if (!isMountedRef.current) return;

    if (isCheckingAuth) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort("Новый запрос начат");
    }

    if (!token) {
      if (isMountedRef.current) {
        setTransactions([]);
        setIsLoading(false);
      }
      return;
    }

    abortControllerRef.current = new AbortController();
    const currentAbortController = abortControllerRef.current;

    try {
      if (isMountedRef.current) {
        setIsLoading(true);
        setError("");
      }

      const result = await fetchTransactions({
        token,
        signal: abortControllerRef.current.signal,
      });

      let transactionsArray = [];

      if (result && result.transactions && Array.isArray(result.transactions)) {
        transactionsArray = result.transactions;
      } else if (result && Array.isArray(result)) {
        transactionsArray = result;
      }

      if (isMountedRef.current) {
        setTransactions(transactionsArray);
        hasLoadedInitialData.current = true;
      }
    } catch (error) {
      if (
        error.name === "CanceledError" ||
        error.name === "AbortError" ||
        error.code === "ERR_CANCELED" ||
        error.message === "canceled" ||
        error.message === "Запрос отменен" ||
        error.message === "Новый запрос начат" ||
        error.message === "Компонент размонтирован"
      ) {
        return;
      }

      if (!isMountedRef.current) return;

      if (
        error.message.includes("Сессия истекла") ||
        error.message.includes("401")
      ) {
        setTransactions([]);
        setError("Сессия истекла. Пожалуйста, войдите снова.");
      } else {
        setError(error.message || "Ошибка загрузки транзакций");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [token, isCheckingAuth]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Компонент размонтирован");
      }
    };
  }, []);

  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }

    if (token !== previousTokenRef.current || !hasLoadedInitialData.current) {
      previousTokenRef.current = token;
      hasLoadedInitialData.current = true;

      const timeoutId = setTimeout(() => {
        loadTransactions();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [token, isCheckingAuth, loadTransactions]);

  // Создание транзакции
  const addNewTransaction = useCallback(
    async (transactionData) => {
      if (!token) {
        setError("Требуется авторизация");
        return false;
      }

      try {
        const result = await postTransaction({
          token,
          transaction: transactionData,
        });

        if (result) {
          await loadTransactions();
          return true;
        }

        return false;
      } catch (err) {
        setError(err.message || "Ошибка создания транзакции");
        return false;
      }
    },
    [token, loadTransactions],
  );

  // Редактирование транзакции
  const updateTransaction = useCallback(
    async (id, transactionData) => {
      if (!token) {
        setError("Требуется авторизация");
        return false;
      }

      try {
        await editTransaction({
          token,
          id,
          transaction: transactionData,
        });

        await loadTransactions();
        return true;
      } catch (error) {
        setError(error.message || "Ошибка редактирования транзакции");
        return false;
      }
    },
    [token, loadTransactions],
  );

  // Удаление транзакции
  const removeTransaction = useCallback(
    async (id) => {
      if (!token) {
        setError("Требуется авторизация");
        return false;
      }

      try {
        await deleteTransaction({ token, id });
        await loadTransactions();
        return true;
      } catch (error) {
        setError(error.message || "Ошибка удаления транзакции");
        return false;
      }
    },
    [token, loadTransactions],
  );

  // Получение транзакций за период (для страницы анализа)
  const getTransactionsByPeriodFromAPI = useCallback(
    async (start, end) => {
      if (!token) {
        setError("Требуется авторизация");
        return [];
      }

      try {
        const data = await fetchTransactionsByPeriod({ token, start, end });
        return data || [];
      } catch (error) {
        setError(error.message || "Ошибка загрузки транзакций за период");
        return [];
      }
    },
    [token],
  );

  // Вспомогательные функции
  const getTransactionsByCategory = useCallback(
    (category) => {
      return transactions.filter(
        (transaction) => transaction.category === category,
      );
    },
    [transactions],
  );

  const getTotalAmount = useCallback(() => {
    return transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.sum) || 0),
      0,
    );
  }, [transactions]);

  const getCategoriesSummary = useCallback(() => {
    const summary = {};
    transactions.forEach((transaction) => {
      const category = transaction.category || "Без категории";
      const amount = parseFloat(transaction.sum) || 0;
      summary[category] = (summary[category] || 0) + amount;
    });
    return Object.entries(summary).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const contextValue = useMemo(
    () => ({
      transactions,
      isLoading,
      error,
      addNewTransaction,
      updateTransaction,
      removeTransaction,
      refetchTransactions: loadTransactions,
      getTransactionsByPeriod: getTransactionsByPeriodFromAPI, // Используем API метод
      getTransactionsByCategory,
      getTotalAmount,
      getCategoriesSummary,
      clearError,
    }),
    [
      transactions,
      isLoading,
      error,
      addNewTransaction,
      updateTransaction,
      removeTransaction,
      loadTransactions,
      getTransactionsByPeriodFromAPI,
      getTransactionsByCategory,
      getTotalAmount,
      getCategoriesSummary,
      clearError,
    ],
  );

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionProvider;
