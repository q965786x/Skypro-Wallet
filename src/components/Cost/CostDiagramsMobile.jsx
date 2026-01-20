import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TransactionsContext } from "../../context/TransactionContext";
import {
  SAnalysisContainer,
  SAnalysisTitle,
  SDiagramSection,
  STotalContainer,
  STotalAmount,
  STotalPeriod,
  SChartsContainer,
  SChartWrapper,
  SChartAmount,
  SChartDiagram,
  SChartColumn,
  SChartCategory,
} from "./Cost.styled.js";

const CostDiagramsMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions: allTransactions } = useContext(TransactionsContext);

  const [selectedDate, setSelectedDate] = useState(() => {
    return location.state?.selectedDate || new Date();
  });
  const [isWeeklyView, setIsWeeklyView] = useState(() => {
    return location.state?.isWeeklyView || true;
  });

  const parseTransactionDate = useCallback((dateStr) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr);
    } catch (error) {
      return null;
    }
  }, []);

  const getWeekRange = useCallback((date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  }, []);

  const getTransactionsForPeriod = useCallback(
    (startDate, endDate) => {
      if (!allTransactions || allTransactions.length === 0) return [];

      const start = new Date(startDate);
      const end = new Date(endDate);

      return allTransactions.filter((transaction) => {
        try {
          const transactionDate = parseTransactionDate(transaction.date);
          if (!transactionDate) return false;
          return transactionDate >= start && transactionDate <= end;
        } catch (error) {
          return false;
        }
      });
    },
    [allTransactions, parseTransactionDate],
  );

  const transactionsForSelectedPeriod = useMemo(() => {
    if (!selectedDate || !allTransactions || allTransactions.length === 0)
      return [];

    let startDate, endDate;
    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDate);
      startDate = monday;
      endDate = sunday;
    } else {
      startDate = new Date(selectedDate);
      endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);
    }

    return getTransactionsForPeriod(startDate, endDate);
  }, [
    selectedDate,
    isWeeklyView,
    allTransactions,
    getWeekRange,
    getTransactionsForPeriod,
  ]);

  const calculateCategoryData = useCallback((transactionsForPeriod) => {
    const categoryMap = {
      food: "Еда",
      transport: "Транспорт",
      housing: "Жилье",
      joy: "Развлечения",
      education: "Образование",
      others: "Другое",
    };

    const colors = {
      Еда: "#D9B6FF",
      Транспорт: "#FFB53D",
      Жилье: "#6EE4FE",
      Развлечения: "#B0AEFF",
      Образование: "#BCEC30",
      Другое: "#FFB9B8",
    };

    const categorySums = {};
    transactionsForPeriod.forEach((transaction) => {
      const russianCategory = categoryMap[transaction.category] || "Другое";
      categorySums[russianCategory] =
        (categorySums[russianCategory] || 0) + transaction.sum;
    });

    return Object.keys(categoryMap).map((key) => {
      const categoryName = categoryMap[key];
      return {
        name: categoryName,
        amount: categorySums[categoryName] || 0,
        color: colors[categoryName],
      };
    });
  }, []);

  const getPeriodTitle = () => {
    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDate);
      const mondayStr = monday.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
      const sundayStr = sunday.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `Расходы за ${mondayStr} — ${sundayStr}`;
    } else {
      const dayStr = selectedDate.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `Расходы за ${dayStr}`;
    }
  };

  const categories = calculateCategoryData(transactionsForSelectedPeriod);
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0,
  );
  const maxAmount = Math.max(...categories.map((c) => c.amount), 1);

  // Функция для перехода к выбору периода
  const handleSelectDifferentPeriod = () => {
    navigate("/analysis", {
      state: {
        selectedDate,
        isWeeklyView,
      },
    });
  };

  // Функция для форматирования названия категории
  const formatCategoryName = (name) => {
    // Максимальная длина названия перед усечением
    const maxLength = 10;
    if (name.length <= maxLength) return name;

    // Усекаем название и добавляем троеточие
    return name.substring(0, maxLength - 1) + "…";
  };

  return (
    <div
      className="page"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <SAnalysisContainer
        style={{
          padding: "16px 12px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            marginBottom: "8px",
            flexShrink: 0,
          }}
        >
          <SAnalysisTitle
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "4px",
            }}
          >
            Анализ расходов
          </SAnalysisTitle>

          <STotalContainer
            style={{
              marginBottom: "12px",
            }}
          >
            <STotalAmount
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "2px",
              }}
            >
              {totalAmount > 0
                ? totalAmount.toLocaleString("ru-RU") + " ₽"
                : "0 ₽"}
            </STotalAmount>
            <STotalPeriod
              style={{
                fontSize: "12px",
                color: "#666666",
              }}
            >
              {getPeriodTitle()}
            </STotalPeriod>
          </STotalContainer>
        </div>

        {/* Основная область с диаграммами - без скролла */}
        <SDiagramSection
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: "8px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <SChartsContainer
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "4px", // Уменьшил gap
                flex: 1,
                overflow: "hidden",
                minHeight: "0",
              }}
            >
              {categories.map((category) => (
                <SChartWrapper
                  key={category.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                    padding: "0 2px",
                  }}
                >
                  <SChartAmount
                    style={{
                      fontSize: "9px", // Уменьшил шрифт
                      marginBottom: "4px", // Уменьшил отступ
                      textAlign: "center",
                      height: "20px", // Уменьшил высоту
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      wordBreak: "break-word",
                      overflow: "hidden",
                      fontWeight: "500",
                    }}
                  >
                    {category.amount > 0
                      ? category.amount.toLocaleString("ru-RU") + " ₽"
                      : "0 ₽"}
                  </SChartAmount>
                  <SChartDiagram
                    style={{
                      width: "100%",
                      height: "80px", // Уменьшил высоту диаграммы
                      marginBottom: "4px", // Уменьшил отступ
                      flex: 1,
                      minHeight: "80px",
                      position: "relative",
                    }}
                  >
                    <SChartColumn
                      $height={
                        maxAmount > 0 ? (category.amount / maxAmount) * 100 : 0
                      }
                      $color={category.color}
                      style={{
                        height: `${maxAmount > 0 ? (category.amount / maxAmount) * 100 : 0}%`,
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  </SChartDiagram>
                  <SChartCategory
                    style={{
                      fontSize: "9px", // Уменьшил шрифт
                      height: "24px", // Уменьшил высоту
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      textAlign: "center",
                      wordBreak: "break-word",
                      overflow: "hidden",
                      padding: "0 1px",
                      width: "100%",
                      lineHeight: "1.1",
                      fontWeight: "500",
                    }}
                    title={category.name}
                  >
                    {formatCategoryName(category.name)}
                  </SChartCategory>
                </SChartWrapper>
              ))}
            </SChartsContainer>
          </div>
        </SDiagramSection>

        {/* Кнопка "Выбрать другой период" */}
        <div
          style={{
            flexShrink: 0,
            paddingTop: "12px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={handleSelectDifferentPeriod}
            style={{
              width: "100%",
              padding: "12px",
              background: "#7334ea",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            Выбрать другой период
          </button>
        </div>
      </SAnalysisContainer>
    </div>
  );
};

export default CostDiagramsMobile;
