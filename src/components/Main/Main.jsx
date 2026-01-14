import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { TransactionsContext } from "../../context/TransactionContext";
import {
  SMainContainer,
  SPageTitle,
  SFormsContainer,
  SLeftColumn,
  SRightColumn,
  STableForm,
  STableTitle,
  STableWrapper,
  STable,
  SDeleteBtn,
  SDeleteIcon,
  SNewExpenseForm,
  SNewExpenseFormTitle,
  SFormGroup,
  SCategoryButtons,
  SCategoryBtn,
  SSubmitBtn,
  SFormInput,
  SFormLabel,
  SCategoryIcon,
  SCategoryContent,
  SCategoryRow,
} from "./Main.styled.js";

// Маппинг категорий для API
const CATEGORY_MAPPING = {
  Еда: "food",
  Транспорт: "transport",
  Жилье: "housing",
  Развлечения: "joy",
  Образование: "education",
  Другое: "others",
};

const REVERSE_CATEGORY_MAPPING = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

const Main = () => {
  const { token } = useAuth();
  const {
    transactions,
    isLoading,
    error,
    addNewTransaction,
    removeTransaction,
    refetchTransactions,
  } = useContext(TransactionsContext);

  // Состояния формы
  const [selectedCategory, setSelectedCategory] = useState("Еда");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { name: "Еда", icon: "/images/category-food.svg" },
    { name: "Транспорт", icon: "/images/category-transport.svg" },
    { name: "Жилье", icon: "/images/category-housing.svg" },
    { name: "Развлечения", icon: "/images/category-joy.svg" },
    { name: "Образование", icon: "/images/category-education.svg" },
    { name: "Другое", icon: "/images/category-other.svg" },
  ];

  // Устанавливаем сегодняшнюю дату по умолчанию при загрузке
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Сортировка транзакций
  const sortedTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    try {
      return [...transactions].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA; // новые сверху
      });
    } catch (e) {
      console.error("❌ Ошибка сортировки:", e);
      return transactions; // Возвращаем как есть в случае ошибки
    }
  }, [transactions]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!token) {
        alert("Вы не авторизованы");
        return;
      }

      // Валидация
      if (!description.trim() || description.trim().length < 4) {
        alert("Введите описание расхода (минимум 4 символа)");
        return;
      }

      if (!amount || parseFloat(amount) <= 0) {
        alert("Введите корректную сумму");
        return;
      }

      if (!date) {
        alert("Выберите дату");
        return;
      }

      setIsSubmitting(true);

      try {
        // Форматируем дату для API (MM-DD-YYYY)
        const [year, month, day] = date.split("-");
        const apiDate = `${parseInt(month)}-${parseInt(day)}-${year}`;

        // Формируем объект транзакции
        const transactionData = {
          description: description.trim(),
          sum: parseFloat(amount),
          category: CATEGORY_MAPPING[selectedCategory],
          date: apiDate,
        };

        console.log("📤 Main.jsx: Отправляю транзакцию:", transactionData);

        // Используем метод из контекста
        const success = await addNewTransaction(transactionData);

        if (success) {
          // Очистка формы
          setDescription("");
          setDate(new Date().toISOString().split("T")[0]);
          setAmount("");
          setSelectedCategory("Еда");
          alert("Расход успешно добавлен!");
        } else {
          alert("Ошибка при добавлении транзакции");
        }
      } catch (err) {
        console.error("❌ Ошибка:", err);
        alert(err.message || "Ошибка при добавлении транзакции");
      } finally {
        setIsSubmitting(false);
      }
    },
    [token, description, amount, date, selectedCategory, addNewTransaction]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Вы уверены, что хотите удалить эту транзакцию?")) {
        return;
      }

      try {
        const success = await removeTransaction(id);
        if (!success) {
          alert("Ошибка при удалении транзакции");
        }
      } catch (err) {
        console.error("❌ Main.jsx: Ошибка удаления:", err);
        alert(err.message || "Ошибка при удалении транзакции");
      }
    },
    [removeTransaction]
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "Без даты";

    try {
      // Просто создаем Date объект - он сам разберет ISO формат
      const date = new Date(dateStr);

      // Проверяем валидность
      if (isNaN(date.getTime())) {
        return dateStr;
      }

      // Форматируем в русский формат
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      // В случае ошибки возвращаем оригинальную строку
      return dateStr;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
  };

  // Разделяем категории на ряды по 2 кнопки
  const categoryRows = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryRows.push(categories.slice(i, i + 2));
  }

  return (
    <div className="page">
      <SMainContainer>
        <SPageTitle>Мои расходы</SPageTitle>

        {/* Отладочная информация */}
        <div
          style={{
            marginBottom: "10px",
            fontSize: "12px",
            color: "#666",
            padding: "8px",
            background: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          Транзакций: {transactions?.length || 0} | Загрузка:{" "}
          {isLoading ? "Да" : "Нет"} | Ошибка: {error || "Нет"}
        </div>

        <button
          onClick={() => refetchTransactions()}
          style={{
            padding: "8px 16px",
            background: "#7334ea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "20px",
          }}
        >
          Обновить
        </button>

        <SFormsContainer>
          <SLeftColumn>
            {/* Форма "Таблица расходов"  */}
            <STableForm>
              <STableTitle>Таблица расходов</STableTitle>
              <STableWrapper
                key={`table-${sortedTransactions.length}-${Date.now()}`}
              >
                <STable>
                  <thead>
                    <tr>
                      <th>Описание</th>
                      <th>Категория</th>
                      <th>Дата</th>
                      <th>Сумма</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          Загрузка...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "#ff4444",
                          }}
                        >
                          {error}
                        </td>
                      </tr>
                    ) : sortedTransactions.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          Нет транзакций. Добавьте первую транзакцию!
                        </td>
                      </tr>
                    ) : (
                      sortedTransactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{transaction.description}</td>
                          <td>
                            {REVERSE_CATEGORY_MAPPING[transaction.category] ||
                              transaction.category}
                          </td>
                          <td>{formatDate(transaction.date)}</td>
                          <td>{formatAmount(transaction.sum)}</td>
                          <td>
                            <SDeleteBtn
                              onClick={() => handleDelete(transaction._id)}
                            >
                              <SDeleteIcon
                                src="/images/bag.svg"
                                alt="Удалить"
                              />
                            </SDeleteBtn>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </STable>
              </STableWrapper>
            </STableForm>
          </SLeftColumn>

          <SRightColumn>
            {/* Форма "Новый расход" */}
            <SNewExpenseForm>
              <SNewExpenseFormTitle>Новый расход</SNewExpenseFormTitle>
              <form id="expense-form" onSubmit={handleSubmit}>
                <SFormGroup>
                  <SFormLabel htmlFor="description">Описание</SFormLabel>
                  <SFormInput
                    type="text"
                    id="description"
                    placeholder="Введите описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel>Категория</SFormLabel>
                  <SCategoryButtons>
                    {categoryRows.map((row, rowIndex) => (
                      <SCategoryRow key={rowIndex}>
                        {row.map((category) => (
                          <SCategoryBtn
                            key={category.name}
                            type="button"
                            className={
                              selectedCategory === category.name ? "active" : ""
                            }
                            onClick={() => setSelectedCategory(category.name)}
                            disabled={isSubmitting}
                          >
                            <SCategoryIcon
                              src={category.icon}
                              alt={category.name}
                            />
                            <SCategoryContent>{category.name}</SCategoryContent>
                          </SCategoryBtn>
                        ))}
                      </SCategoryRow>
                    ))}
                  </SCategoryButtons>
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel htmlFor="date">Дата</SFormLabel>
                  <SFormInput
                    type="date"
                    id="date"
                    placeholder="Введите дату"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </SFormGroup>

                <SFormGroup>
                  <SFormLabel htmlFor="amount">Сумма</SFormLabel>
                  <SFormInput
                    type="number"
                    id="amount"
                    placeholder="Введите сумму"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0.01"
                    step="0.01"
                    disabled={isSubmitting}
                  />
                </SFormGroup>

                <SSubmitBtn type="submit" disabled={isSubmitting || !token}>
                  {isSubmitting ? "Добавление..." : "Добавить новый расход"}
                </SSubmitBtn>

                {!token && (
                  <p
                    style={{
                      color: "#ff4444",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    Требуется авторизация
                  </p>
                )}
              </form>
            </SNewExpenseForm>
          </SRightColumn>
        </SFormsContainer>
      </SMainContainer>
    </div>
  );
};

export default Main;
