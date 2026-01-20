import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TransactionsContext } from "../../context/TransactionContext";
import {
  SMainContainer,
  SPageTitle,
  SNewExpenseForm,
  SFormGroup,
  SCategoryButtons,
  SCategoryBtn,
  SSubmitBtn,
  SFormInput,
  SFormLabel,
  SCategoryIcon,
  SCategoryContent,
  SCategoryRow,
  SHeaderWithBack,
  SBackIcon,
  SBackTitle,
} from "./Main.styled.js";

const CATEGORY_MAPPING = {
  Еда: "food",
  Транспорт: "transport",
  Жилье: "housing",
  Развлечения: "joy",
  Образование: "education",
  Другое: "others",
};

const NewExpenseMobile = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addNewTransaction } = useContext(TransactionsContext);

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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleBackClick = useCallback(() => {
    navigate("/expenses");
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!token) {
        alert("Вы не авторизованы");
        return;
      }

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
        const formatDateForAPI = (dateStr) => {
          const [year, month, day] = dateStr.split("-");
          return `${parseInt(month)}-${parseInt(day)}-${year}`;
        };

        const transactionData = {
          description: description.trim(),
          sum: parseFloat(amount),
          category: CATEGORY_MAPPING[selectedCategory],
          date: formatDateForAPI(date),
        };

        const success = await addNewTransaction(transactionData);

        if (success) {
          setDescription("");
          setDate(new Date().toISOString().split("T")[0]);
          setAmount("");
          setSelectedCategory("Еда");
          alert("Расход успешно добавлен!");

          navigate("/expenses");
        } else {
          alert("Ошибка при добавлении транзакции");
        }
      } catch (err) {
        alert(err.message || "Ошибка при добавлении транзакции");
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      token,
      description,
      amount,
      date,
      selectedCategory,
      addNewTransaction,
      navigate,
    ],
  );

  const categoryRows = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryRows.push(categories.slice(i, i + 2));
  }

  return (
    <div className="page">
      <SMainContainer>
        {/* Заголовок с кнопкой "Назад" */}
        <SHeaderWithBack onClick={handleBackClick}>
          <SBackIcon src="/images/arrow-left.svg" alt="Назад" />
          <SBackTitle>Мои расходы</SBackTitle>
        </SHeaderWithBack>

        <SPageTitle>Новый расход</SPageTitle>

        <SNewExpenseForm>
          <form onSubmit={handleSubmit}>
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
          </form>
        </SNewExpenseForm>
      </SMainContainer>
    </div>
  );
};

export default NewExpenseMobile;
