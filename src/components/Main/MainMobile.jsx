import React, { useState, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TransactionsContext } from "../../context/TransactionContext";
import {
  SMainContainer,
  STableForm,
  STableWrapper,
  STable,
  SHeaderRow,
  SAddNewButton,
  SDeleteExpenseButton,
} from "./Main.styled.js";

const REVERSE_CATEGORY_MAPPING = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

const MainMobile = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    transactions,
    isLoading,
    error,
    removeTransaction,
    refetchTransactions,
  } = useContext(TransactionsContext);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Без даты";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return dateStr;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
  };

  const sortedTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    try {
      return [...transactions].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      });
    } catch (e) {
      return transactions;
    }
  }, [transactions]);

  const handleTransactionSelect = useCallback((transaction) => {
    setSelectedTransaction(transaction);
  }, []);

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedTransaction) {
      alert("Выберите транзакцию для удаления");
      return;
    }

    if (
      !window.confirm(`Удалить расход "${selectedTransaction.description}"?`)
    ) {
      return;
    }

    try {
      const success = await removeTransaction(selectedTransaction._id);
      if (success) {
        setSelectedTransaction(null);
        alert("Расход успешно удален!");
      } else {
        alert("Ошибка при удалении транзакции");
      }
    } catch (err) {
      alert(err.message || "Ошибка при удалении транзакции");
    }
  }, [selectedTransaction, removeTransaction]);

  const handleAddNewExpense = () => {
    navigate("/expenses/new");
  };

  return (
    <div className="page">
      <SMainContainer>
        {/* Кнопка +Новый расход */}
        <SHeaderRow>
          <h2>Мои расходы</h2>
          <SAddNewButton onClick={handleAddNewExpense}>
            <img src="/images/add-circle.svg" alt="Добавить" />
            Новый расход
          </SAddNewButton>
        </SHeaderRow>

        <STableForm>
          <STableWrapper>
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                Загрузка...
              </div>
            ) : error ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#ff4444",
                }}
              >
                {error}
              </div>
            ) : sortedTransactions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                Нет транзакций. Добавьте первую транзакцию!
              </div>
            ) : (
              <STable>
                <thead>
                  <tr>
                    <th>Описание</th>
                    <th>Категория</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      onClick={() => handleTransactionSelect(transaction)}
                      style={{
                        backgroundColor:
                          selectedTransaction?._id === transaction._id
                            ? "#f1ebfd"
                            : "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      <td>{transaction.description}</td>
                      <td>
                        {REVERSE_CATEGORY_MAPPING[transaction.category] ||
                          transaction.category}
                      </td>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{formatAmount(transaction.sum)}</td>
                    </tr>
                  ))}
                </tbody>
              </STable>
            )}
          </STableWrapper>

          {/* Кнопка Удалить расход */}
          <SDeleteExpenseButton onClick={handleDeleteSelected}>
            Удалить расход
          </SDeleteExpenseButton>
        </STableForm>
      </SMainContainer>
    </div>
  );
};

export default MainMobile;
