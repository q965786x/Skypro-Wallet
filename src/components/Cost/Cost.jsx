import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useAuth } from "../../context/AuthContext";
import { TransactionsContext } from "../../context/TransactionContext";
import { useMobile } from "../../hooks/useMobile.js";
import {
  SAnalysisContainer,
  SAnalysisTitle,
  SAnalysisContent,
  SAnalysisLeft,
  SAnalysisRight,
  SPeriodSection,
  SPeriodTitle,
  SCalendarContainer,
  SCalendarWrapper,
  SMonthHeader,
  SWeekdays,
  SWeekday,
  SCalendarContent,
  SDaysContainer,
  SDays,
  SDay,
  SDayNumber,
  SDayEmpty,
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

const Cost = () => {
  const { token } = useAuth();
  const {
    isLoading,
    refetchTransactions,
    transactions: allTransactions,
  } = useContext(TransactionsContext);

  // Состояние для выбранного дня (по умолчанию сегодня)
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [isWeeklyView, setIsWeeklyView] = useState(true);

  // Состояния для календаря
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarContentRef = useRef(null);

  const { isMobile, isTablet } = useMobile();

  // Отладочный вывод
  useEffect(() => {
    console.log(
      "📊 Cost.jsx: Все транзакций из контекста:",
      allTransactions?.length
    );
  }, [allTransactions]);

  const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Функция для парсинга даты транзакции
  const parseTransactionDate = useCallback((dateStr) => {
    if (!dateStr) return null;

    try {
      // API возвращает даты в формате "2025-12-29T00:00:00.000Z"
      return new Date(dateStr);
    } catch (error) {
      console.error("Ошибка парсинга даты:", dateStr);
      return null;
    }
  }, []);

  // Функция для получения недели
  const getWeekRange = useCallback((date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();

    const monday = new Date(currentDate);
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    monday.setDate(currentDate.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  }, []);

  // Функция для фильтрации транзакций по периоду
  const getTransactionsForPeriod = useCallback(
    (startDate, endDate) => {
      if (!allTransactions || allTransactions.length === 0) {
        return [];
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log("📅 Фильтрация транзакций:", {
        start: start.toISOString(),
        end: end.toISOString(),
        allTransactions: allTransactions.length,
      });

      const filtered = allTransactions.filter((transaction) => {
        try {
          const transactionDate = parseTransactionDate(transaction.date);
          if (!transactionDate) return false;

          return transactionDate >= start && transactionDate <= end;
        } catch (error) {
          console.error("Ошибка фильтрации транзакции:", transaction, error);
          return false;
        }
      });

      console.log("📅 Отфильтровано:", filtered.length, "транзакций");
      return filtered;
    },
    [allTransactions, parseTransactionDate]
  );

  // Получаем транзакции для выбранного периода
  const transactionsForSelectedPeriod = useMemo(() => {
    if (!selectedDay || !allTransactions || allTransactions.length === 0) {
      console.log("📅 Нет данных для фильтрации");
      return [];
    }

    let startDate, endDate;

    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDay);
      startDate = monday;
      endDate = sunday;
    } else {
      startDate = new Date(selectedDay);
      endDate = new Date(selectedDay);
      endDate.setHours(23, 59, 59, 999);
    }

    return getTransactionsForPeriod(startDate, endDate);
  }, [
    selectedDay,
    isWeeklyView,
    allTransactions,
    getWeekRange,
    getTransactionsForPeriod,
  ]);

  // Функция для расчета данных по категориям для диаграммы
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

    // Считаем сумму по категориям
    const categorySums = {};

    // API возвращает массив транзакций напрямую
    transactionsForPeriod.forEach((transaction) => {
      const russianCategory = categoryMap[transaction.category] || "Другое";
      categorySums[russianCategory] =
        (categorySums[russianCategory] || 0) + transaction.sum;
    });

    // Возвращаем все категории
    return Object.keys(categoryMap).map((key) => {
      const categoryName = categoryMap[key];
      return {
        name: categoryName,
        amount: categorySums[categoryName] || 0,
        color: colors[categoryName],
      };
    });
  }, []);

  // Генерация дней месяца
  const generateMonthDays = useCallback((year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, []);

  const isDaySelected = (year, month, day) => {
    const dayDate = new Date(year, month, day);

    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDay);
      return dayDate >= monday && dayDate <= sunday;
    } else {
      return (
        year === selectedDay.getFullYear() &&
        month === selectedDay.getMonth() &&
        day === selectedDay.getDate()
      );
    }
  };

  // Форматирование заголовка периода
  const getPeriodTitle = () => {
    if (isWeeklyView) {
      const { monday, sunday } = getWeekRange(selectedDay);
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
      const dayStr = selectedDay.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `Расходы за ${dayStr}`;
    }
  };

  // Обработчик клика по дню
  const handleDayClick = (day, month, year) => {
    if (day) {
      const newDate = new Date(year, month, day);
      console.log("📅 Выбрана дата:", newDate.toISOString());
      setSelectedDay(newDate);
      setIsWeeklyView(false);
    }
  };

  // Переключение месяцев
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Расчет данных для отображения
  const categories = calculateCategoryData(transactionsForSelectedPeriod);
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );
  const maxAmount = Math.max(...categories.map((c) => c.amount), 1);

  // Логирование для отладки
  useEffect(() => {
    console.log("📊 Диаграмма данные:", {
      selectedDay: selectedDay.toISOString(),
      isWeeklyView,
      allTransactionsCount: allTransactions?.length || 0,
      filteredCount: transactionsForSelectedPeriod.length,
      categories: categories.map((c) => `${c.name}: ${c.amount} ₽`),
      totalAmount,
    });
  }, [
    selectedDay,
    isWeeklyView,
    allTransactions,
    transactionsForSelectedPeriod,
    categories,
    totalAmount,
  ]);

  if (isLoading) {
    return (
      <div className="page">
        <SAnalysisContainer>
          <SAnalysisTitle>Анализ расходов</SAnalysisTitle>
          <div style={{ textAlign: "center", padding: "40px" }}>
            Загрузка данных...
          </div>
        </SAnalysisContainer>
      </div>
    );
  }

  // Генерируем дни для отображения
  const currentMonthDays = generateMonthDays(currentYear, currentMonth);

  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear = currentYear + 1;
  }
  const nextMonthDays = generateMonthDays(nextYear, nextMonth);

  return (
    <div className="page">
      <SAnalysisContainer>
        <SAnalysisTitle>Анализ расходов</SAnalysisTitle>

        {/* Отладочная информация */}
        <div
          style={{
            marginBottom: "10px",
            padding: "8px 12px",
            background: "#f5f5f5",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          Всего транзакций: <strong>{allTransactions?.length || 0}</strong> | За
          выбранный период:{" "}
          <strong>{transactionsForSelectedPeriod.length}</strong> | Сумма:{" "}
          <strong>{totalAmount.toLocaleString("ru-RU")} ₽</strong>
        </div>

        {/* Кнопки управления */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Кнопки переключения вида */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setIsWeeklyView(false)}
              style={{
                padding: "8px 16px",
                background: !isWeeklyView ? "#7334ea" : "#f4f5f6",
                color: !isWeeklyView ? "white" : "#666",
                border: "1px solid #e5e5e7",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                height: "38px",
                minHeight: "38px",
              }}
            >
              За день
            </button>
            <button
              onClick={() => setIsWeeklyView(true)}
              style={{
                padding: "8px 16px",
                background: isWeeklyView ? "#7334ea" : "#f4f5f6",
                color: isWeeklyView ? "white" : "#666",
                border: "1px solid #e5e5e7",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                height: "38px",
                minHeight: "38px",
              }}
            >
              За неделю
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
                height: "38px",
                minHeight: "38px",
              }}
            >
              Обновить данные
            </button>
            <button
              onClick={() => {
                console.log("🔄 Принудительно синхронизирую...");
                refetchTransactions();
              }}
              style={{
                padding: "8px 16px",
                background: "#34c759",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Синхронизировать
            </button>
          </div>
        </div>

        <SAnalysisContent>
          {/* Левая часть с календарем */}
          <SAnalysisLeft>
            <SPeriodSection>
              <SPeriodTitle>Период</SPeriodTitle>

              {/* Кнопки навигации по месяцам */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <button
                  onClick={handlePrevMonth}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#7334ea",
                    padding: "4px 8px",
                  }}
                >
                  ‹
                </button>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#000000",
                  }}
                >
                  {monthNames[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={handleNextMonth}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#7334ea",
                    padding: "4px 8px",
                  }}
                >
                  ›
                </button>
              </div>

              <SCalendarContainer>
                {/* Заголовки дней недели - фиксированные */}
                <SWeekdays>
                  {weekdays.map((day) => (
                    <SWeekday key={day}>{day}</SWeekday>
                  ))}
                </SWeekdays>

                <SCalendarContent ref={calendarContentRef}>
                  {/* Текущий месяц */}
                  <SCalendarWrapper>
                    <SDaysContainer>
                      <SDays>
                        {currentMonthDays.map((day, index) => {
                          if (day === null) {
                            return <SDayEmpty key={`empty-${index}`} />;
                          }

                          const isSelected = isDaySelected(
                            currentYear,
                            currentMonth,
                            day
                          );

                          return (
                            <SDay
                              key={`${currentYear}-${currentMonth}-${day}`}
                              $selected={isSelected} // ТОЛЬКО isSelected, убрать $active
                              onClick={() =>
                                handleDayClick(day, currentMonth, currentYear)
                              }
                              title={`${day}.${currentMonth + 1}.${currentYear}`}
                            >
                              <SDayNumber $selected={isSelected}>
                                {day}
                              </SDayNumber>
                            </SDay>
                          );
                        })}
                      </SDays>
                    </SDaysContainer>
                  </SCalendarWrapper>

                  {/* Разделитель между месяцами */}
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px 0",
                      color: "#999",
                      fontSize: "12px",
                    }}
                  >
                    ──────────
                  </div>

                  {/* Следующий месяц */}
                  <SCalendarWrapper>
                    <SMonthHeader
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#666",
                        marginBottom: "8px",
                      }}
                    >
                      {monthNames[nextMonth]} {nextYear}
                    </SMonthHeader>
                    <SDaysContainer>
                      <SDays>
                        {nextMonthDays.map((day, index) => {
                          if (day === null) {
                            return <SDayEmpty key={`next-empty-${index}`} />;
                          }

                          const isSelected = isDaySelected(
                            nextYear,
                            nextMonth,
                            day
                          );

                          return (
                            <SDay
                              key={`${nextYear}-${nextMonth}-${day}`}
                              $selected={isSelected} // ТОЛЬКО isSelected, убрать $active
                              onClick={() =>
                                handleDayClick(day, nextMonth, nextYear)
                              }
                              title={`${day}.${nextMonth + 1}.${nextYear}`}
                            >
                              <SDayNumber $selected={isSelected}>
                                {day}
                              </SDayNumber>
                            </SDay>
                          );
                        })}
                      </SDays>
                    </SDaysContainer>
                  </SCalendarWrapper>
                </SCalendarContent>
              </SCalendarContainer>
            </SPeriodSection>
          </SAnalysisLeft>

          {/* Правая часть с диаграммами */}
          <SAnalysisRight>
            <SDiagramSection>
              <STotalContainer>
                <STotalAmount>
                  {totalAmount > 0
                    ? totalAmount.toLocaleString("ru-RU") + " ₽"
                    : "0 ₽"}
                </STotalAmount>
                <STotalPeriod>{getPeriodTitle()}</STotalPeriod>
              </STotalContainer>

              {/* Шесть диаграмм в ряд */}
              <SChartsContainer>
                {categories.map((category) => (
                  <SChartWrapper key={category.name}>
                    <SChartAmount>
                      {category.amount > 0
                        ? category.amount.toLocaleString("ru-RU") + " ₽"
                        : "0 ₽"}
                    </SChartAmount>
                    <SChartDiagram>
                      <SChartColumn
                        $height={
                          maxAmount > 0
                            ? (category.amount / maxAmount) * 100
                            : 0
                        }
                        $color={category.color}
                      />
                    </SChartDiagram>
                    <SChartCategory>{category.name}</SChartCategory>
                  </SChartWrapper>
                ))}

                {/* Если транзакций нет, показываем сообщение */}
                {transactionsForSelectedPeriod.length === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        color: "#999",
                        fontSize: "16px",
                        width: "100%",
                      }}
                    >
                      Нет расходов за выбранный период
                    </div>
                  )}
              </SChartsContainer>
            </SDiagramSection>
          </SAnalysisRight>
        </SAnalysisContent>
      </SAnalysisContainer>
    </div>
  );
};

export default Cost;
